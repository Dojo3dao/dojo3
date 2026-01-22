import os
import csv
import json
import hmac
import hashlib
import base64
import logging
import time
from decimal import Decimal
from typing import Optional
from functools import wraps
from pathlib import Path
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import requests
from solana.rpc.api import Client
from solana.rpc.core import RPCException
from pydantic import BaseModel, validator

# For signature verification
import base58
from nacl.signing import VerifyKey
from nacl.exceptions import BadSignatureError

# Import site generator
from site_generator import SiteGenerator

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="Dojo3 Airdrop API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get('CORS_ORIGINS', 'http://localhost:3000,http://localhost:5173').split(','),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_PATH = Path(BASE_DIR).parent
RECIPIENTS_CSV = os.path.join(BASE_DIR, '..', 'outputs', 'recipients_full_sample.csv')
ALLOC_FILE = os.path.join(BASE_DIR, '..', 'outputs', 'allocations_live.csv')
CLAIMS_FILE = os.path.join(BASE_DIR, '..', 'outputs', 'claims.json')

# Sites configuration
SITES_DIR = BASE_PATH / 'public' / 'sites'
SITES_DB_FILE = BASE_PATH / 'config' / 'sites_db.json'
SITES_DIR.mkdir(parents=True, exist_ok=True)
SITES_DB_FILE.parent.mkdir(parents=True, exist_ok=True)

# Initialize site generator
site_generator = SiteGenerator(sites_dir=SITES_DIR)

# Proof secret (HMAC). Set via env PROOF_SECRET. Falls back to ADMIN_TOKEN if present.
PROOF_SECRET = os.environ.get('PROOF_SECRET') or os.environ.get('ADMIN_TOKEN')
if not PROOF_SECRET:
    logger.warning("PROOF_SECRET not set; using insecure default. Set PROOF_SECRET in production!")
    PROOF_SECRET = 'dev-secret-insecure'

# On-chain monitoring config (optional files)
MONITORED_FILE = os.path.join(BASE_DIR, '..', 'config', 'monitored_mints.json')
PRICE_FILE = os.path.join(BASE_DIR, '..', 'config', 'token_prices.json')

# Staking contract address (configurable via ENV or use default)
STAKING_PROGRAM_ID = os.environ.get('STAKING_PROGRAM_ID', 'HMwy4JHwuLkMMR3q6B3atwZ4oUAGrc3yHtgC7MswWNY1')

# RPC configuration
RPC = os.environ.get('SOLANA_RPC', 'https://api.devnet.solana.com')
try:
    client = Client(RPC)
    logger.info(f"Connected to Solana RPC: {RPC}")
except Exception as e:
    logger.error(f"Failed to connect to Solana RPC: {e}")
    client = None

# Tokenomics
TOTAL_SUPPLY = 850_000_000
AIRDROP_PERCENT = 60
AIRDROP_POOL = int(TOTAL_SUPPLY * AIRDROP_PERCENT / 100)
REFERRAL_BPS = 2400

# Rate limiting
REQUEST_COUNTS = {}
RATE_LIMIT_WINDOW = 60  # seconds
RATE_LIMIT_REQUESTS = 10  # requests per window


def rate_limit(max_requests: int = RATE_LIMIT_REQUESTS, window: int = RATE_LIMIT_WINDOW):
    """Rate limiting decorator for endpoints"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Get client IP from request
            request = None
            for arg in args:
                if isinstance(arg, Request):
                    request = arg
                    break
            
            if not request:
                return func(*args, **kwargs)
            
            client_ip = request.client.host
            now = time.time()
            
            if client_ip not in REQUEST_COUNTS:
                REQUEST_COUNTS[client_ip] = []
            
            # Clean old requests outside the window
            REQUEST_COUNTS[client_ip] = [
                ts for ts in REQUEST_COUNTS[client_ip]
                if now - ts < window
            ]
            
            if len(REQUEST_COUNTS[client_ip]) >= max_requests:
                logger.warning(f"Rate limit exceeded for {client_ip}")
                raise HTTPException(status_code=429, detail="Too many requests")
            
            REQUEST_COUNTS[client_ip].append(now)
            return func(*args, **kwargs)
        return wrapper
    return decorator


def load_recipients(path):
    """Load recipients from CSV with error handling"""
    rows = []
    if not os.path.exists(path):
        logger.warning(f"Recipients CSV not found: {path}")
        return rows
    try:
        with open(path, 'r', newline='') as f:
            r = csv.DictReader(f)
            for row in r:
                wallet = row.get('wallet', '').strip()
                if not wallet:
                    logger.debug("Skipping row with empty wallet")
                    continue
                try:
                    weight = Decimal(row.get('weight', '1'))
                except (ValueError, TypeError):
                    logger.warning(f"Invalid weight for {wallet}, using default 1")
                    weight = Decimal(1)
                ref = row.get('referrer', '').strip() or None
                rows.append({'wallet': wallet, 'weight': weight, 'referrer': ref})
        logger.info(f"Loaded {len(rows)} recipients from {path}")
    except Exception as e:
        logger.error(f"Error loading recipients CSV: {e}")
    return rows


def compute_allocations(rows):
    """Compute token allocations from weighted rows"""
    if not rows:
        logger.warning("No rows to compute allocations from")
        return {}
    
    total_weight = sum(r['weight'] for r in rows)
    if total_weight <= 0:
        logger.error("Total weight is zero or negative")
        return {}
    
    allocations = {}
    for r in rows:
        wallet = r['wallet']
        try:
            share = r['weight'] / total_weight
            amount = int(Decimal(AIRDROP_POOL) * share)
            allocations[wallet] = amount
        except Exception as e:
            logger.error(f"Error computing allocation for {wallet}: {e}")
    
    logger.info(f"Computed allocations for {len(allocations)} recipients")
    return allocations


def load_or_compute_allocations():
    """Load precomputed allocations or compute from recipients"""
    try:
        # Prefer precomputed allocations file
        if os.path.exists(ALLOC_FILE):
            allocs = {}
            with open(ALLOC_FILE, 'r') as f:
                r = csv.DictReader(f)
                for row in r:
                    wallet = row['wallet'].strip()
                    try:
                        amount = int(row.get('net', row.get('gross', 0)))
                        allocs[wallet] = amount
                    except (ValueError, TypeError):
                        logger.warning(f"Invalid allocation for {wallet}")
            logger.info(f"Loaded {len(allocs)} precomputed allocations")
            return allocs
        
        # Fall back to computing from recipients
        rows = load_recipients(RECIPIENTS_CSV)
        return compute_allocations(rows)
    except Exception as e:
        logger.error(f"Error in load_or_compute_allocations: {e}")
        return {}


def load_monitored():
    """Load monitored tokens/NFTs config with error handling"""
    if not os.path.exists(MONITORED_FILE):
        logger.debug(f"Monitored file not found: {MONITORED_FILE}")
        return {'tokens': [], 'nfts': []}
    
    try:
        with open(MONITORED_FILE, 'r') as f:
            data = json.load(f)
        logger.info(f"Loaded monitored config: {len(data.get('tokens', []))} tokens, {len(data.get('nfts', []))} NFTs")
        return data
    except Exception as e:
        logger.error(f"Error loading monitored config: {e}")
        return {'tokens': [], 'nfts': []}


def load_price_map():
    """Load token price map with error handling"""
    if not os.path.exists(PRICE_FILE):
        logger.debug(f"Price file not found: {PRICE_FILE}")
        return {}
    
    try:
        with open(PRICE_FILE, 'r') as f:
            prices = json.load(f)
        logger.debug(f"Loaded prices for {len(prices)} tokens")
        return prices
    except Exception as e:
        logger.error(f"Error loading price map: {e}")
        return {}


def validate_wallet_address(wallet: str) -> bool:
    """Validate Solana wallet address format"""
    if not wallet or not isinstance(wallet, str):
        return False
    if len(wallet) < 32 or len(wallet) > 44:
        return False
    try:
        base58.b58decode(wallet)
        return True
    except Exception:
        return False


def get_token_balance(wallet: str, mint: str) -> Decimal:
    """Get token balance with comprehensive error handling"""
    if not client:
        logger.error("Solana client not initialized")
        return Decimal(0)
    
    if not validate_wallet_address(wallet):
        logger.warning(f"Invalid wallet address: {wallet}")
        return Decimal(0)
    
    try:
        res = client.get_token_accounts_by_owner(wallet, encoding='jsonParsed')
    except RPCException as e:
        logger.warning(f"RPC error fetching token accounts for {wallet}: {e}")
        return Decimal(0)
    except Exception as e:
        logger.error(f"Error fetching token balance for {wallet}: {e}")
        return Decimal(0)
    
    total = Decimal(0)
    try:
        for acc in res.get('result', {}).get('value', []):
            info = acc.get('account', {}).get('data', {}).get('parsed', {}).get('info', {})
            if info.get('mint') != mint:
                continue
            ta = info.get('tokenAmount', {})
            amount = Decimal(ta.get('amount', '0'))
            decimals = int(ta.get('decimals', 0))
            total += amount / (Decimal(10) ** decimals)
    except Exception as e:
        logger.error(f"Error parsing token balance response: {e}")
    
    return total


def check_onchain_eligibility(wallet: str):
    """Check eligibility based on on-chain token/NFT holdings"""
    if not validate_wallet_address(wallet):
        logger.warning(f"Invalid wallet for on-chain check: {wallet}")
        return {'eligible': False, 'details': {}, 'reason': []}
    
    monitored = load_monitored()
    price_map = load_price_map()
    tokens = monitored.get('tokens', [])
    nfts = monitored.get('nfts', [])
    details = {'wallet': wallet, 'tokens': [], 'nfts': [], 'value_usd': 0}
    total_value = Decimal(0)

    # Check tokens
    for t in tokens:
        mint = t.get('mint')
        if not mint:
            logger.warning("Token entry missing mint")
            continue
        
        cg = t.get('coingecko_id')
        bal = get_token_balance(wallet, mint)
        price = None
        
        # Try cached price first
        if price_map.get(mint) is not None:
            try:
                price = Decimal(str(price_map[mint]))
            except (ValueError, TypeError):
                logger.warning(f"Invalid cached price for {mint}")
                price = None
        
        # Try CoinGecko if no cached price
        elif cg:
            try:
                r = requests.get(
                    f'https://api.coingecko.com/api/v3/simple/price?ids={cg}&vs_currencies=usd',
                    timeout=5
                )
                r.raise_for_status()
                j = r.json()
                price = Decimal(str(j.get(cg, {}).get('usd', 0)))
            except requests.RequestException as e:
                logger.warning(f"Error fetching price from CoinGecko for {cg}: {e}")
                price = None
            except Exception as e:
                logger.error(f"Unexpected error in price fetch: {e}")
                price = None
        
        val = (price * bal) if price is not None else None
        if val is not None:
            total_value += val
        
        details['tokens'].append({
            'mint': mint,
            'balance': str(bal),
            'price': str(price) if price is not None else None,
            'value': str(val) if val is not None else None
        })

    # Check NFTs
    for m in nfts:
        try:
            bal = get_token_balance(wallet, m)
            owns = bal >= 1
            details['nfts'].append({'mint': m, 'owns': owns})
        except Exception as e:
            logger.error(f"Error checking NFT ownership for {m}: {e}")
            details['nfts'].append({'mint': m, 'owns': False})

    details['value_usd'] = float(total_value)
    
    # Determine eligibility
    eligible = False
    reason = []
    if total_value >= 100:
        eligible = True
        reason.append('token_value')
    
    # any owned monitored NFT qualifies
    for n in details['nfts']:
        if n.get('owns'):
            eligible = True
            reason.append('nft_owned')
    
    logger.info(f"On-chain eligibility check for {wallet}: eligible={eligible}, reasons={reason}")
    return {'eligible': eligible, 'details': details, 'reason': reason}


def sign_proof(wallet: str, amount: int) -> str:
    """Generate HMAC proof for airdrop claim"""
    try:
        m = f"{wallet}:{amount}".encode()
        sig = hmac.new(PROOF_SECRET.encode(), m, hashlib.sha256).digest()
        return base64.b64encode(sig).decode()
    except Exception as e:
        logger.error(f"Error signing proof: {e}")
        raise


def verify_proof(wallet: str, amount: int, sig_b64: str) -> bool:
    """Verify HMAC proof for airdrop claim"""
    try:
        expected = sign_proof(wallet, amount)
        return hmac.compare_digest(expected, sig_b64)
    except Exception as e:
        logger.error(f"Error verifying proof: {e}")
        return False


class ClaimIn(BaseModel):
    """Input model for airdrop claim"""
    wallet: str
    amount: int
    proof: str
    message: Optional[str] = None
    signature: Optional[str] = None
    referrer: Optional[str] = None
    
    @validator('wallet')
    def validate_wallet(cls, v):
        if not validate_wallet_address(v):
            raise ValueError('Invalid Solana wallet address')
        return v
    
    @validator('amount')
    def validate_amount(cls, v):
        if v <= 0:
            raise ValueError('Amount must be positive')
        if v > AIRDROP_POOL:
            raise ValueError('Amount exceeds airdrop pool')
        return v


@app.get('/health')
def health():
    """Health check endpoint"""
    return {
        'status': 'ok',
        'airdrop_pool': AIRDROP_POOL,
        'staking_program': STAKING_PROGRAM_ID,
        'rpc_connected': client is not None
    }


@app.get('/api/eligibility')
@rate_limit(max_requests=30)
def eligibility(wallet: str, request: Request):
    """Check airdrop eligibility for a wallet"""
    logger.info(f"Eligibility check for {wallet[:10]}...")
    
    # Validate wallet address
    if not validate_wallet_address(wallet):
        logger.warning(f"Invalid wallet format: {wallet}")
        raise HTTPException(status_code=400, detail='Invalid wallet address format')
    
    try:
        # Try on-chain eligibility first
        monitored = load_monitored()
        if monitored.get('tokens') or monitored.get('nfts'):
            onchain = check_onchain_eligibility(wallet)
            if onchain.get('eligible'):
                # For on-chain qualified claims
                proof = sign_proof(wallet, 0)
                return {
                    'wallet': wallet,
                    'eligible': True,
                    'allocation': 0,
                    'allocation_currency': 'TOKEN',
                    'amount_usd': onchain.get('details', {}).get('value_usd', 0),
                    'reasons': onchain.get('reason', []),
                    'proof': proof,
                    'onchain': onchain,
                    'staking_program': STAKING_PROGRAM_ID,
                }

        # Fall back to CSV-based allocations
        allocs = load_or_compute_allocations()
        amount = allocs.get(wallet)
        if not amount:
            logger.info(f"Wallet {wallet[:10]}... not in allocations")
            return {'wallet': wallet, 'eligible': False}
        
        proof = sign_proof(wallet, amount)
        logger.info(f"Wallet {wallet[:10]}... eligible for {amount} tokens")
        return {
            'wallet': wallet,
            'eligible': True,
            'allocation': amount,
            'allocation_currency': 'TOKEN',
            'amount_usd': None,
            'proof': proof,
            'staking_program': STAKING_PROGRAM_ID,
        }
    except Exception as e:
        logger.error(f"Error in eligibility check: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail='Internal server error')


@app.post('/api/claim')
@rate_limit(max_requests=5)
def claim(inp: ClaimIn, request: Request):
    """Submit airdrop claim with wallet signature verification"""
    logger.info(f"Claim submission from {inp.wallet[:10]}...")
    
    try:
        # Verify server-side proof first
        if not verify_proof(inp.wallet, inp.amount, inp.proof):
            logger.warning(f"Invalid proof for {inp.wallet[:10]}...")
            raise HTTPException(status_code=400, detail='Invalid proof')

        # Verify client signature to prove wallet ownership
        if not inp.message or not inp.signature:
            logger.warning(f"Missing signature data for {inp.wallet[:10]}...")
            raise HTTPException(status_code=400, detail='Missing signed message or signature')

        # Decode and verify wallet address
        try:
            pubkey_bytes = base58.b58decode(inp.wallet)
        except Exception as e:
            logger.warning(f"Invalid wallet base58 for {inp.wallet}: {e}")
            raise HTTPException(status_code=400, detail='Invalid wallet base58')

        # Verify signature encoding
        try:
            sig_bytes = base64.b64decode(inp.signature)
        except Exception as e:
            logger.warning(f"Invalid signature encoding: {e}")
            raise HTTPException(status_code=400, detail='Invalid signature encoding')

        # Verify cryptographic signature
        try:
            vk = VerifyKey(pubkey_bytes)
            vk.verify(inp.message.encode(), sig_bytes)
        except BadSignatureError:
            logger.warning(f"Signature verification failed for {inp.wallet[:10]}...")
            raise HTTPException(status_code=400, detail='Signature verification failed')
        except Exception as e:
            logger.error(f"Signature verification error: {e}")
            raise HTTPException(status_code=400, detail='Signature verification error')

        # Check allocation and idempotency
        allocs = load_or_compute_allocations()
        expected = allocs.get(inp.wallet)
        if expected is None:
            logger.warning(f"Wallet {inp.wallet[:10]}... not eligible")
            raise HTTPException(status_code=404, detail='Not eligible')
        
        if expected != inp.amount:
            logger.warning(f"Amount mismatch for {inp.wallet[:10]}...: expected {expected}, got {inp.amount}")
            raise HTTPException(status_code=400, detail='Amount mismatch')

        # Load existing claims and prevent double-claim
        claims = []
        if os.path.exists(CLAIMS_FILE):
            try:
                with open(CLAIMS_FILE, 'r') as f:
                    claims = json.load(f)
            except Exception as e:
                logger.error(f"Error loading claims file: {e}")
                claims = []
        
        # Check if already claimed
        for c in claims:
            if c.get('wallet') == inp.wallet:
                logger.warning(f"Double-claim attempt for {inp.wallet[:10]}...")
                raise HTTPException(status_code=409, detail='Already claimed')

        # Record the claim
        entry = {
            'wallet': inp.wallet,
            'amount': inp.amount,
            'ts': int(time.time()),
            'message': inp.message,
            'signature': inp.signature,
            'referrer': inp.referrer or ''
        }
        claims.append(entry)
        
        try:
            with open(CLAIMS_FILE, 'w') as f:
                json.dump(claims, f, indent=2)
            logger.info(f"Claim recorded for {inp.wallet[:10]}... amount={inp.amount}")
        except Exception as e:
            logger.error(f"Error writing claim to file: {e}")
            raise HTTPException(status_code=500, detail='Error recording claim')

        return {
            'message': 'Claim recorded (server-side).',
            'tx': None,
            'wallet': inp.wallet[:10] + '...',
            'amount': inp.amount
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in claim: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail='Internal server error')


@app.post('/api/admin/run')
def admin_run(request: Request):
    """Trigger airdrop distribution (admin only)"""
    logger.info("Admin run requested")
    
    try:
        # Accept Bearer token in Authorization header or query param
        auth = request.headers.get('authorization', '') or ''
        token = None
        if auth.lower().startswith('bearer '):
            token = auth.split(None, 1)[1].strip()
        
        token = token or request.headers.get('x-admin-token') or request.query_params.get('token')
        
        # Verify admin token
        admin_token = os.environ.get('ADMIN_TOKEN')
        if not admin_token or token != admin_token:
            logger.warning("Unauthorized admin run attempt")
            raise HTTPException(status_code=403, detail='Forbidden')
        
        # Prepare command
        import subprocess
        cmd = [
            'python3',
            'scripts/run_inproc_orchestrator.py',
            'outputs/recipients_full_sample.csv',
            '--mint', os.environ.get('DOJO3_TOKEN_MINT', ''),
            '--treasury-ata', os.environ.get('TREASURY_TOKEN_ACCOUNT', ''),
            '--yes'
        ]
        
        logger.info(f"Executing orchestrator command: {' '.join(cmd)}")
        
        try:
            p = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                timeout=300
            )
            out, _ = p.communicate()
            
            if p.returncode != 0:
                logger.error(f"Orchestrator returned error code {p.returncode}")
                raise HTTPException(status_code=500, detail=f'Orchestrator failed with code {p.returncode}')
            
            logger.info("Admin run completed successfully")
            return {'output': out, 'status': 'success'}
        except subprocess.TimeoutExpired:
            logger.error("Orchestrator timeout")
            p.kill()
            raise HTTPException(status_code=500, detail='Orchestrator timeout')
        except Exception as e:
            logger.error(f"Orchestrator error: {e}")
            raise HTTPException(status_code=500, detail=f'Run failed: {str(e)}')
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in admin_run: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail='Internal server error')


@app.get('/api/status')
@rate_limit(max_requests=20)
def status(request: Request):
    """Get airdrop distribution status"""
    try:
        allocs = load_or_compute_allocations()
        claims = []
        
        if os.path.exists(CLAIMS_FILE):
            try:
                with open(CLAIMS_FILE, 'r') as f:
                    claims = json.load(f)
            except Exception as e:
                logger.error(f"Error loading claims: {e}")
        
        total_allocated = sum(allocs.values())
        total_claimed = sum(c.get('amount', 0) for c in claims)
        remaining = total_allocated - total_claimed
        claimed_percent = (total_claimed / total_allocated * 100) if total_allocated > 0 else 0
        
        logger.debug(f"Status: {len(claims)} claims, {total_claimed} tokens claimed")
        
        return {
            'recipients': len(allocs),
            'total_allocated': total_allocated,
            'claims': len(claims),
            'total_claimed': total_claimed,
            'remaining': remaining,
            'claimed_percent': round(claimed_percent, 2),
            'staking_program': STAKING_PROGRAM_ID,
        }
    except Exception as e:
        logger.error(f"Error in status endpoint: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail='Internal server error')

# ============= SITE MANAGER APIs =============
SITES_FILE = os.path.join(BASE_DIR, '..', 'outputs', 'sites.json')

def load_sites():
    """Load sites database"""
    try:
        if os.path.exists(SITES_FILE):
            with open(SITES_FILE, 'r') as f:
                return json.load(f)
    except Exception as e:
        logger.error(f"Error loading sites: {e}")
    return {}

def save_sites(sites_data):
    """Save sites database"""
    try:
        os.makedirs(os.path.dirname(SITES_FILE), exist_ok=True)
        with open(SITES_FILE, 'w') as f:
            json.dump(sites_data, f, indent=2)
    except Exception as e:
        logger.error(f"Error saving sites: {e}")

def generate_site_id():
    """Generate unique site ID"""
    import uuid
    return str(uuid.uuid4())[:8]

@app.get('/api/sites')
@rate_limit(max_requests=20)
def get_user_sites(wallet: str, request: Request):
    """Get all sites for a wallet"""
    logger.info(f"Fetching sites for {wallet[:10]}...")
    
    if not validate_wallet_address(wallet):
        raise HTTPException(status_code=400, detail='Invalid wallet address')
    
    try:
        sites_db = load_sites()
        user_sites = [s for s in sites_db.values() if s.get('wallet') == wallet]
        
        return {'sites': user_sites, 'count': len(user_sites)}
    except Exception as e:
        logger.error(f"Error fetching sites: {e}")
        raise HTTPException(status_code=500, detail='Failed to fetch sites')

@app.post('/api/sites/create')
@rate_limit(max_requests=10)
def create_site(request_data: dict, request: Request):
    """Create new site"""
    logger.info(f"Creating site for {request_data.get('wallet', 'unknown')[:10]}...")
    
    try:
        wallet = request_data.get('wallet')
        if not validate_wallet_address(wallet):
            raise HTTPException(status_code=400, detail='Invalid wallet address')
        
        site_id = generate_site_id()
        sites_db = load_sites()
        
        site_data = {
            'id': site_id,
            'wallet': wallet,
            'name': request_data.get('name', 'New Site'),
            'description': request_data.get('description', ''),
            'template': request_data.get('template', 'classic'),
            'color': request_data.get('color', '#4ECDC4'),
            'created_at': request_data.get('timestamp'),
            'last_renewal': request_data.get('timestamp'),
            'txid': request_data.get('txid'),
            'active': True
        }
        
        sites_db[site_id] = site_data
        save_sites(sites_db)
        
        logger.info(f"Site {site_id} created successfully")
        return {'site_id': site_id, 'site': site_data}
    
    except Exception as e:
        logger.error(f"Error creating site: {e}")
        raise HTTPException(status_code=500, detail='Failed to create site')

@app.post('/api/sites/renew')
@rate_limit(max_requests=10)
def renew_site(request_data: dict, request: Request):
    """Renew site subscription"""
    logger.info(f"Renewing site {request_data.get('site_id')}...")
    
    try:
        site_id = request_data.get('site_id')
        wallet = request_data.get('wallet')
        
        sites_db = load_sites()
        
        if site_id not in sites_db:
            raise HTTPException(status_code=404, detail='Site not found')
        
        site = sites_db[site_id]
        if site.get('wallet') != wallet:
            raise HTTPException(status_code=403, detail='Unauthorized')
        
        site['last_renewal'] = request_data.get('timestamp')
        site['renewal_txid'] = request_data.get('txid')
        site['active'] = True
        
        sites_db[site_id] = site
        save_sites(sites_db)
        
        logger.info(f"Site {site_id} renewed successfully")
        return {'success': True, 'site': site}
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error renewing site: {e}")
        raise HTTPException(status_code=500, detail='Failed to renew site')

@app.post('/api/sites/delete')
@rate_limit(max_requests=10)
def delete_site(request_data: dict, request: Request):
    """Delete a site"""
    logger.info(f"Deleting site {request_data.get('site_id')}...")
    
    try:
        site_id = request_data.get('site_id')
        wallet = request_data.get('wallet')
        
        sites_db = load_sites()
        
        if site_id not in sites_db:
            raise HTTPException(status_code=404, detail='Site not found')
        
        site = sites_db[site_id]
        if site.get('wallet') != wallet:
            raise HTTPException(status_code=403, detail='Unauthorized')
        
        del sites_db[site_id]
        save_sites(sites_db)
        
        logger.info(f"Site {site_id} deleted successfully")
        return {'success': True}
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting site: {e}")
        raise HTTPException(status_code=500, detail='Failed to delete site')

@app.get('/api/sites/{site_id}')
@rate_limit(max_requests=30)
def get_site(site_id: str, request: Request):
    """Get a specific site by ID"""
    logger.info(f"Fetching site {site_id}...")
    
    try:
        sites_db = load_sites()
        
        if site_id not in sites_db:
            raise HTTPException(status_code=404, detail='Site not found')
        
        site = sites_db[site_id]
        
        if not site.get('active'):
            raise HTTPException(status_code=410, detail='Site is inactive')
        
        return {'site': site}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching site: {e}")
        raise HTTPException(status_code=500, detail='Failed to fetch site')

# ============================================
# USER SITES ENDPOINTS (subdomain: username.dojo3)
# ============================================

def load_sites_db():
    """Load sites database"""
    if SITES_DB_FILE.exists():
        return json.loads(SITES_DB_FILE.read_text())
    return {}

def save_sites_db(sites: dict):
    """Save sites database"""
    SITES_DB_FILE.write_text(json.dumps(sites, indent=2))

class CreateSiteRequest(BaseModel):
    """Request to create a user site"""
    name: str
    description: str = ""
    template: str = "classic"
    color: str = "#4ECDC4"
    wallet: str
    txid: str
    timestamp: str

@app.post('/api/sites/create')
@rate_limit(max_requests=5)
def create_user_site(payload: CreateSiteRequest, request: Request):
    """Create a new user site
    
    Subdomain format: {username}.dojo3
    Generates static HTML from template
    """
    logger.info(f"Creating site for wallet {payload.wallet}...")
    
    try:
        # Validate template
        valid_templates = ['classic', 'modern', 'minimal', 'gaming']
        if payload.template not in valid_templates:
            raise HTTPException(status_code=400, detail=f'Invalid template. Must be one of: {", ".join(valid_templates)}')
        
        # Use wallet address as username (first 8 chars)
        username = payload.wallet[:8].lower()
        
        # Check if site already exists
        sites_db = load_sites_db()
        if username in sites_db and sites_db[username].get('active'):
            raise HTTPException(status_code=409, detail='Site already exists for this wallet')
        
        # Generate site HTML
        site_data = {
            'name': payload.name,
            'description': payload.description,
            'template': payload.template,
            'color': payload.color
        }
        
        html_path = site_generator.generate(username, site_data)
        logger.info(f"Generated site at: {html_path}")
        
        # Save to sites database
        sites_db[username] = {
            'username': username,
            'wallet': payload.wallet,
            'name': payload.name,
            'description': payload.description,
            'template': payload.template,
            'color': payload.color,
            'txid': payload.txid,
            'created_at': payload.timestamp,
            'active': True,
            'url': f'https://{username}.dojo3'
        }
        save_sites_db(sites_db)
        
        return {
            'status': 'success',
            'site_id': username,
            'url': f'http://{username}.dojo3',
            'message': f'Site created successfully at {username}.dojo3'
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating site: {e}")
        raise HTTPException(status_code=500, detail=f'Failed to create site: {str(e)}')

@app.post('/api/sites/delete')
@rate_limit(max_requests=10)
def delete_user_site(payload: dict, request: Request):
    """Delete a user site
    
    Requires wallet address that created the site
    """
    logger.info(f"Deleting site for wallet {payload.get('wallet')}...")
    
    try:
        wallet = payload.get('wallet')
        if not wallet:
            raise HTTPException(status_code=400, detail='Wallet address required')
        
        username = wallet[:8].lower()
        
        # Check if site exists
        sites_db = load_sites_db()
        if username not in sites_db:
            raise HTTPException(status_code=404, detail='Site not found')
        
        # Delete site files
        success = site_generator.delete_site(username)
        
        # Mark as inactive in database
        sites_db[username]['active'] = False
        save_sites_db(sites_db)
        
        logger.info(f"Site {username} deleted")
        
        return {
            'status': 'success',
            'message': f'Site {username}.dojo3 deleted'
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting site: {e}")
        raise HTTPException(status_code=500, detail=f'Failed to delete site: {str(e)}')

@app.get('/api/sites/{username}')
@rate_limit(max_requests=30)
def get_user_site_info(username: str, request: Request):
    """Get site information"""
    logger.info(f"Fetching site info for {username}...")
    
    try:
        sites_db = load_sites_db()
        
        if username not in sites_db:
            raise HTTPException(status_code=404, detail='Site not found')
        
        site = sites_db[username]
        
        if not site.get('active'):
            raise HTTPException(status_code=410, detail='Site is inactive')
        
        return {
            'status': 'success',
            'site': site,
            'url': f'http://{username}.dojo3'
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching site: {e}")
        raise HTTPException(status_code=500, detail='Failed to fetch site')

@app.get('/api/sites')
@rate_limit(max_requests=20)
def list_all_sites(request: Request):
    """List all active sites"""
    logger.info("Listing all sites...")
    
    try:
        sites_db = load_sites_db()
        active_sites = {k: v for k, v in sites_db.items() if v.get('active')}
        
        return {
            'status': 'success',
            'count': len(active_sites),
            'sites': active_sites
        }
    
    except Exception as e:
        logger.error(f"Error listing sites: {e}")
        raise HTTPException(status_code=500, detail='Failed to list sites')

# Mount static files for serving user sites
public_dir = BASE_PATH / 'public'
if public_dir.exists():
    try:
        app.mount('/sites', StaticFiles(directory=str(public_dir / 'sites')), name='sites')
        logger.info(f"Mounted static files directory: {public_dir / 'sites'}")
    except Exception as e:
        logger.warning(f"Could not mount static files: {e}")