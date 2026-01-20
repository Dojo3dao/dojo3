# 🚀 Dojo3 Development Setup

Complete setup guide for running the Dojo3 airdrop platform locally.

## Prerequisites

- Python 3.8+
- Node.js 16+
- Solana CLI tools
- Rust 1.70+
- Anchor 0.29+
- Phantom or Solflare wallet browser extension

## Quick Start

### 1. Backend Setup

```bash
# Create and activate virtual environment
python3 -m venv backend/.venv
source backend/.venv/bin/activate  # On Windows: backend\.venv\Scripts\activate

# Install dependencies
pip install -r backend/requirements.txt

# Copy environment template
cp backend/.env.example backend/.env

# Edit .env with your configuration
# IMPORTANT: Set PROOF_SECRET and ADMIN_TOKEN to secure values
nano backend/.env

# Start backend server
PROOF_SECRET=dev-secret ADMIN_TOKEN=admin uvicorn backend.app:APP --reload --host 0.0.0.0 --port 8000
```

Backend will be available at `http://localhost:8000`

**API Endpoints:**
- `GET /api/eligibility?wallet=<pubkey>` - Check wallet eligibility
- `POST /api/claim` - Submit airdrop claim
- `GET /api/status` - Get distribution status
- `POST /api/admin/run` - Trigger orchestrator (admin only)
- `GET /health` - Health check

### 2. Frontend Setup

```bash
# Install dependencies
cd frontend
npm install

# Start development server
npm run dev
```

Frontend will be available at `http://localhost:5173`

**Features:**
- ✅ Multi-wallet support (Phantom, Solflare, Ledger)
- ✅ Eligibility checking
- ✅ One-click claiming with wallet signature
- ✅ Real-time status dashboard
- ✅ Admin orchestrator trigger

### 3. Smart Contracts (Optional)

```bash
# Build Anchor programs
cd anchor
anchor build

# Deploy to devnet (requires SOL)
anchor deploy --provider.cluster devnet

# Update program IDs in:
# - anchor/programs/airdrop/src/lib.rs (declare_id!)
# - anchor/programs/staking/src/lib.rs (declare_id!)
```

## Architecture

```
dojo3/
├── backend/              # FastAPI server
│   ├── app.py           # Main application
│   ├── requirements.txt  # Python dependencies
│   └── .env.example     # Configuration template
├── frontend/            # React + Vite
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/  # UI components
│   │   └── styles/      # Pixel art styling
│   └── package.json
├── anchor/              # Solana programs
│   └── programs/
│       ├── airdrop/     # Token distribution
│       └── staking/     # NFT rewards
├── outputs/             # Generated artifacts
│   ├── allocations_*.csv  # Token allocations
│   └── airdrop_orchestrator.py  # Distribution script
└── config/              # Configuration files
    ├── monitored_mints.json
    └── token_prices.json
```

## Key Features

### 🎲 Eligibility Checking
- CSV-based allocations
- On-chain token/NFT verification
- CoinGecko price integration ($100 USD threshold)

### 💰 Airdrop Claiming
- HMAC proof verification
- Wallet signature authentication
- Double-claim prevention
- Optional referral bonuses (24%)

### 🎪 NFT Staking
- Minimum 0.5 SOL stake
- 3-day lock period
- NFT reward on completion
- Withdraw after claiming reward

### ⚙️ Security Features
- Rate limiting (10 req/60s per IP)
- Input validation & sanitization
- CORS protection
- Admin token authentication
- Comprehensive error logging

## Configuration

### Environment Variables

```bash
# Security
PROOF_SECRET=your-secret-key  # Must be changed in production!
ADMIN_TOKEN=admin             # Admin authorization token

# Solana
SOLANA_RPC=https://api.devnet.solana.com
DOJO3_TOKEN_MINT=11111111111111111111111111111111  # Token mint address
TREASURY_TOKEN_ACCOUNT=1111111...               # Treasury ATA
STAKING_PROGRAM_ID=HMwy4JHwuLkMMR3q6B3atwZ4oUAGrc3yHtgC7MswWNY1

# API
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Config Files

**`config/monitored_mints.json`** - Tokens/NFTs for on-chain eligibility
```json
{
  "tokens": [
    {"mint": "SOL...", "coingecko_id": "solana"}
  ],
  "nfts": [
    {"mint": "NPT..."}
  ]
}
```

**`config/token_prices.json`** - Cached token prices
```json
{
  "SOL...": 25.50
}
```

## Development Workflow

### Adding to Allocations
```bash
# Edit outputs/recipients_sample.csv
# Format: wallet,weight,referrer
#   DGH... | 1.5 | REF...

# Compute allocations
python3 outputs/alloc_compute.py outputs/recipients_sample.csv
```

### Testing Locally

```bash
# Create test wallets
solana-keygen new --outfile test1.json
solana-keygen new --outfile test2.json

# Get test SOL (devnet)
solana airdrop 5 -k test1.json

# Check eligibility
curl http://localhost:8000/api/eligibility?wallet=<pubkey>
```

## Deployment

### Backend (Production)
```bash
# Use environment variables for secrets
export PROOF_SECRET=$(openssl rand -base64 32)
export ADMIN_TOKEN=$(openssl rand -base64 32)

# Use production-grade ASGI server
gunicorn backend.app:APP -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend (Production)
```bash
npm run build
# Deploy dist/ to CDN or static host
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `PROOF_SECRET not set` | Set env var: `export PROOF_SECRET=your-secret` |
| `ModuleNotFoundError: solana` | Run: `pip install solana>=0.27.0` |
| `CORS errors` | Update `CORS_ORIGINS` env var for your domain |
| `Wallet not detected` | Install Phantom: https://phantom.app |
| `Rate limit exceeded` | Default: 10 req/60s. Change in `backend/app.py` |

## Testing

### API Testing
```bash
# Check health
curl http://localhost:8000/health

# Check status
curl http://localhost:8000/api/status

# Test eligibility (replace PUBKEY)
curl "http://localhost:8000/api/eligibility?wallet=PUBKEY"

# Trigger orchestrator (admin only)
curl -X POST http://localhost:8000/api/admin/run \
  -H "Authorization: Bearer your-admin-token"
```

### Frontend Testing
- Open http://localhost:5173
- Connect wallet (Phantom/Solflare)
- Check eligibility
- Claim airdrop (if eligible)

## Performance Tips

1. **Caching**: Use `token_prices.json` to avoid repeated CoinGecko calls
2. **Batch Processing**: Use `airdrop_orchestrator.py` for bulk transfers
3. **Database**: Consider migrating from CSV/JSON to PostgreSQL for scale
4. **CDN**: Serve frontend from CDN for better performance

## Security Checklist

- [ ] Change `PROOF_SECRET` to unique, strong value
- [ ] Set `ADMIN_TOKEN` to secure random value
- [ ] Enable HTTPS on production
- [ ] Validate all input on backend
- [ ] Use environment variables for secrets (never commit)
- [ ] Rate limit API endpoints
- [ ] Monitor logs for suspicious activity
- [ ] Test wallet signature verification

## Support

- **Docs**: See `outputs/USAGE.md` for more details
- **Issues**: Check existing GitHub issues
- **Community**: Join our Discord

## License

MIT

---

**⚠️ Testnet Only**: This is for testing on Solana Devnet. Do NOT use with real funds or mainnet keys.
