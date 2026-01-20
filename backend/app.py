import os
import csv
import json
import hmac
import hashlib
import base64
from decimal import Decimal
from typing import Optional
from fastapi import FastAPI, HTTPException, Request
import requests
from solana.rpc.api import Client
from pydantic import BaseModel

# For signature verification
import base58
from nacl.signing import VerifyKey
from nacl.exceptions import BadSignatureError

APP = FastAPI()

RECIPIENTS_CSV = os.path.join(os.getcwd(), 'outputs', 'recipients_full_sample.csv')
ALLOC_FILE = os.path.join(os.getcwd(), 'outputs', 'allocations_live.csv')
CLAIMS_FILE = os.path.join(os.getcwd(), 'outputs', 'claims.json')

# Proof secret (HMAC). Set via env PROOF_SECRET. Falls back to ADMIN_TOKEN if present.
PROOF_SECRET = os.environ.get('PROOF_SECRET') or os.environ.get('ADMIN_TOKEN') or 'dev-secret'

# On-chain monitoring config (optional files)
MONITORED_FILE = os.path.join(os.getcwd(), 'config', 'monitored_mints.json')
PRICE_FILE = os.path.join(os.getcwd(), 'config', 'token_prices.json')
# default RPC
RPC = os.environ.get('SOLANA_RPC', 'https://api.devnet.solana.com')
client = Client(RPC)

TOTAL_SUPPLY = 850_000_000
AIRDROP_PERCENT = 60
AIRDROP_POOL = int(TOTAL_SUPPLY * AIRDROP_PERCENT / 100)
REFERRAL_BPS = 2400


def load_recipients(path):
    rows = []
    if not os.path.exists(path):
        return rows
    with open(path, 'r', newline='') as f:
        r = csv.DictReader(f)
        for row in r:
            wallet = row.get('wallet','').strip()
            weight = Decimal(row.get('weight','1'))
            ref = row.get('referrer','').strip() or None
            rows.append({'wallet': wallet, 'weight': weight, 'referrer': ref})
    return rows


def compute_allocations(rows):
    total_weight = sum(r['weight'] for r in rows)
    allocations = {}
    for r in rows:
        share = (r['weight'] / total_weight) if total_weight > 0 else Decimal(0)
        amount = int(Decimal(AIRDROP_POOL) * share)
        allocations[r['wallet']] = amount
    return allocations


def load_or_compute_allocations():
    # Prefer precomputed allocations file
    allocs = {}
    if os.path.exists(ALLOC_FILE):
        with open(ALLOC_FILE, 'r') as f:
            r = csv.DictReader(f)
            for row in r:
                allocs[row['wallet'].strip()] = int(row.get('net', row.get('gross', 0)))
        return allocs
    rows = load_recipients(RECIPIENTS_CSV)
    return compute_allocations(rows)


def load_monitored():
    if os.path.exists(MONITORED_FILE):
        try:
            return json.load(open(MONITORED_FILE))
        except Exception:
            return {}
    # default placeholders (empty)
    return {}


def load_price_map():
    if os.path.exists(PRICE_FILE):
        try:
            return json.load(open(PRICE_FILE))
        except Exception:
            return {}
    return {}


def get_token_balance(wallet: str, mint: str) -> Decimal:
    # returns human-readable token amount (using decimals from parsed response)
    try:
        res = client.get_token_accounts_by_owner(wallet, encoding='jsonParsed')
    except Exception:
        return Decimal(0)
    total = Decimal(0)
    for acc in res.get('result', {}).get('value', []):
        info = acc.get('account', {}).get('data', {}).get('parsed', {}).get('info', {})
        if info.get('mint') != mint:
            continue
        ta = info.get('tokenAmount', {})
        amount = Decimal(ta.get('amount', '0'))
        decimals = int(ta.get('decimals', 0))
        total += amount / (Decimal(10) ** decimals)
    return total


def check_onchain_eligibility(wallet: str):
    monitored = load_monitored()
    price_map = load_price_map()
    tokens = monitored.get('tokens', [])
    nfts = monitored.get('nfts', [])
    details = {'wallet': wallet, 'tokens': [], 'nfts': [], 'value_usd': 0}
    total_value = Decimal(0)

    for t in tokens:
        mint = t.get('mint')
        cg = t.get('coingecko_id')
        bal = get_token_balance(wallet, mint)
        price = None
        if price_map.get(mint) is not None:
            price = Decimal(str(price_map[mint]))
        elif cg:
            # try coingecko
            try:
                r = requests.get(f'https://api.coingecko.com/api/v3/simple/price?ids={cg}&vs_currencies=usd')
                j = r.json()
                price = Decimal(str(j.get(cg, {}).get('usd', 0)))
            except Exception:
                price = None
        val = (price * bal) if price is not None else None
        if val is not None:
            total_value += val
        details['tokens'].append({'mint': mint, 'balance': str(bal), 'price': str(price) if price is not None else None, 'value': str(val) if val is not None else None})

    for m in nfts:
        bal = get_token_balance(wallet, m)
        owns = bal >= 1
        if owns:
            details['nfts'].append({'mint': m, 'owns': True})
        else:
            details['nfts'].append({'mint': m, 'owns': False})

    details['value_usd'] = float(total_value)
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
    return {'eligible': eligible, 'details': details, 'reason': reason}


def sign_proof(wallet: str, amount: int) -> str:
    m = f"{wallet}:{amount}".encode()
    sig = hmac.new(PROOF_SECRET.encode(), m, hashlib.sha256).digest()
    return base64.b64encode(sig).decode()


def verify_proof(wallet: str, amount: int, sig_b64: str) -> bool:
    expected = sign_proof(wallet, amount)
    return hmac.compare_digest(expected, sig_b64)


class ClaimIn(BaseModel):
    wallet: str
    amount: int
    proof: str
    # Signed message produced by client (string) and base64 signature
    message: Optional[str] = None
    signature: Optional[str] = None


@APP.get('/api/eligibility')
def eligibility(wallet: str):
    # structured response: try on-chain first
    monitored = load_monitored()
    if monitored.get('tokens') or monitored.get('nfts'):
        onchain = check_onchain_eligibility(wallet)
        if onchain.get('eligible'):
            # amount may be computed elsewhere; for now return 0 placeholder
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
            }

    # fallback to CSV-based allocations
    allocs = load_or_compute_allocations()
    amount = allocs.get(wallet)
    if not amount:
        return {'wallet': wallet, 'eligible': False}
    proof = sign_proof(wallet, amount)
    return {'wallet': wallet, 'eligible': True, 'allocation': amount, 'allocation_currency': 'TOKEN', 'amount_usd': None, 'proof': proof}


@APP.post('/api/claim')
def claim(inp: ClaimIn):
    # Verify server-side proof first
    if not verify_proof(inp.wallet, inp.amount, inp.proof):
        raise HTTPException(status_code=400, detail='Invalid proof')

    # Verify client signature to prove wallet ownership (if provided)
    if not inp.message or not inp.signature:
        raise HTTPException(status_code=400, detail='Missing signed message or signature')

    try:
        pubkey_bytes = base58.b58decode(inp.wallet)
    except Exception:
        raise HTTPException(status_code=400, detail='Invalid wallet base58')

    sig_bytes = None
    try:
        sig_bytes = base64.b64decode(inp.signature)
    except Exception:
        raise HTTPException(status_code=400, detail='Invalid signature encoding')

    try:
        vk = VerifyKey(pubkey_bytes)
        vk.verify(inp.message.encode(), sig_bytes)
    except BadSignatureError:
        raise HTTPException(status_code=400, detail='Signature verification failed')
    except Exception:
        raise HTTPException(status_code=400, detail='Signature verification error')

    # Check allocation and idempotency
    allocs = load_or_compute_allocations()
    expected = allocs.get(inp.wallet)
    if expected is None:
        # allow onchain-qualified claims where allocation may be 0
        raise HTTPException(status_code=404, detail='Not eligible')
    if expected != inp.amount:
        raise HTTPException(status_code=400, detail='Amount mismatch')

    # load existing claims and prevent double-claim
    claims = []
    if os.path.exists(CLAIMS_FILE):
        try:
            claims = json.load(open(CLAIMS_FILE))
        except Exception:
            claims = []
    for c in claims:
        if c.get('wallet') == inp.wallet:
            raise HTTPException(status_code=409, detail='Already claimed')

    entry = {'wallet': inp.wallet, 'amount': inp.amount, 'ts': int(__import__('time').time()), 'message': inp.message, 'signature': inp.signature}
    claims.append(entry)
    with open(CLAIMS_FILE, 'w') as f:
        json.dump(claims, f)

    return {'message': 'Claim recorded (server-side).', 'tx': None}


@APP.post('/api/admin/run')
def admin_run(request: Request):
    # Accept Bearer token in Authorization header or query param
    auth = request.headers.get('authorization') or ''
    token = None
    if auth.lower().startswith('bearer '):
        token = auth.split(None, 1)[1].strip()
    token = token or request.headers.get('x-admin-token') or request.query_params.get('token')
    if token != os.environ.get('ADMIN_TOKEN'):
        raise HTTPException(status_code=403, detail='Forbidden')
    # Trigger in-process orchestrator script (best-effort)
    import subprocess
    cmd = ['python3', 'scripts/run_inproc_orchestrator.py', 'outputs/recipients_full_sample.csv', '--mint', os.environ.get('DOJO3_TOKEN_MINT',''), '--treasury-ata', os.environ.get('TREASURY_TOKEN_ACCOUNT',''), '--yes']
    try:
        p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        out, _ = p.communicate(timeout=300)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Run failed: {e}')
    return {'output': out}


@APP.get('/api/status')
def status():
    allocs = load_or_compute_allocations()
    claims = []
    if os.path.exists(CLAIMS_FILE):
        try:
            claims = json.load(open(CLAIMS_FILE))
        except Exception:
            claims = []
    total_allocated = sum(allocs.values())
    total_claimed = sum(c.get('amount', 0) for c in claims)
    return {'recipients': len(allocs), 'total_allocated': total_allocated, 'claims': len(claims), 'total_claimed': total_claimed}
