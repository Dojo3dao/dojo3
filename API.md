# 📡 Dojo3 API Documentation

## Base URL

```
http://localhost:8000
```

---

## 🏥 Health Check

### GET /health

Check if the API is running and services are initialized.

**Response (200):**
```json
{
  "status": "ok",
  "airdrop_pool": 510000000,
  "staking_program": "HMwy4JHwuLkMMR3q6B3atwZ4oUAGrc3yHtgC7MswWNY1",
  "rpc_connected": true
}
```

---

## 🔍 Check Eligibility

### GET /api/eligibility

Check if a wallet is eligible for airdrop.

**Parameters:**
- `wallet` (string, required): Solana wallet public key (base58)

**Examples:**

Eligible wallet (CSV-based):
```bash
curl "http://localhost:8000/api/eligibility?wallet=DGH37t..."
```

Response (200):
```json
{
  "wallet": "DGH37t...",
  "eligible": true,
  "allocation": 1000000,
  "allocation_currency": "TOKEN",
  "amount_usd": null,
  "proof": "base64_encoded_proof...",
  "staking_program": "HMwy4JHwuLkMMR3q6B3atwZ4oUAGrc3yHtgC7MswWNY1"
}
```

Not eligible:
```json
{
  "wallet": "Invalid123...",
  "eligible": false
}
```

**Errors:**

400 - Invalid wallet format:
```json
{
  "detail": "Invalid wallet address format"
}
```

429 - Rate limit exceeded:
```json
{
  "detail": "Too many requests"
}
```

---

## 💰 Submit Airdrop Claim

### POST /api/claim

Submit a claim for airdrop tokens with wallet signature proof.

**Request Body:**
```json
{
  "wallet": "DGH37t...",
  "amount": 1000000,
  "proof": "base64_encoded_proof...",
  "message": "claim|DGH37t...|1000000|1705765200",
  "signature": "base64_encoded_signature..."
}
```

**Request Headers:**
```
Content-Type: application/json
```

**Response (200):**
```json
{
  "message": "Claim recorded (server-side).",
  "tx": null,
  "wallet": "DGH37t...",
  "amount": 1000000
}
```

**Errors:**

400 - Invalid proof:
```json
{
  "detail": "Invalid proof"
}
```

400 - Missing signature:
```json
{
  "detail": "Missing signed message or signature"
}
```

400 - Signature verification failed:
```json
{
  "detail": "Signature verification failed"
}
```

404 - Not eligible:
```json
{
  "detail": "Not eligible"
}
```

409 - Already claimed:
```json
{
  "detail": "Already claimed"
}
```

429 - Rate limit:
```json
{
  "detail": "Too many requests"
}
```

---

## 📊 Get Distribution Status

### GET /api/status

Get current airdrop distribution statistics.

**Response (200):**
```json
{
  "recipients": 1000,
  "total_allocated": 510000000,
  "claims": 150,
  "total_claimed": 75500000,
  "remaining": 434500000,
  "claimed_percent": 14.81,
  "staking_program": "HMwy4JHwuLkMMR3q6B3atwZ4oUAGrc3yHtgC7MswWNY1"
}
```

**Fields:**
- `recipients`: Number of eligible recipients
- `total_allocated`: Total tokens allocated
- `claims`: Number of successful claims
- `total_claimed`: Total tokens claimed
- `remaining`: Tokens still available
- `claimed_percent`: Claim completion percentage
- `staking_program`: Address of staking program

---

## ⚙️ Admin Operations

### POST /api/admin/run

Trigger the airdrop orchestrator (admin only).

**Headers:**
```
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json
```

OR use query parameter:
```
POST /api/admin/run?token=<ADMIN_TOKEN>
```

OR use custom header:
```
x-admin-token: <ADMIN_TOKEN>
```

**Response (200):**
```json
{
  "output": "Computed allocations for 1000 recipients...",
  "status": "success"
}
```

**Errors:**

403 - Unauthorized:
```json
{
  "detail": "Forbidden"
}
```

500 - Orchestrator failed:
```json
{
  "detail": "Run failed: error message"
}
```

---

## Error Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Claim recorded |
| 400 | Bad Request | Invalid wallet format |
| 404 | Not Found | Wallet not eligible |
| 409 | Conflict | Already claimed |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Solana RPC error |

---

## Rate Limiting

- **Limit**: 10 requests per 60 seconds per IP address
- **Response**: HTTP 429 with "Too many requests" message
- **Bypass**: None (built-in protection)

---

## Authentication

**Admin Endpoints:**
- Bearer token: `Authorization: Bearer <token>`
- Header: `x-admin-token: <token>`
- Query: `?token=<token>`

**Token Source:**
Set `ADMIN_TOKEN` environment variable

---

## Wallet Address Format

Solana wallet addresses must be:
- Base58 encoded
- 32-44 characters long
- Valid public key format

**Example:**
```
DGH37t6u6ZEMDnS3NUvSh1jvJ5pKwAz7aHVPcYBQYi5w
```

---

## Proof Generation

Proofs are generated using HMAC-SHA256:

```python
import hmac
import hashlib
import base64

message = f"{wallet}:{amount}"
proof = base64.b64encode(
    hmac.new(PROOF_SECRET.encode(), message.encode(), hashlib.sha256).digest()
).decode()
```

---

## Signature Verification

Wallets must sign a message in the format:

```
claim|{wallet}|{amount}|{timestamp}
```

The signature must be:
- Generated using the wallet's private key
- Encoded in base64
- Verifiable with the wallet's public key

---

## On-Chain Eligibility

If `monitored_mints.json` is configured, eligibility can be checked on-chain:

- **Tokens**: Balance > $100 USD (using CoinGecko prices)
- **NFTs**: Ownership of any monitored NFT

Response includes:
```json
{
  "eligible": true,
  "onchain": {
    "eligible": true,
    "details": {
      "wallet": "...",
      "tokens": [...],
      "nfts": [...],
      "value_usd": 250.50
    },
    "reason": ["token_value", "nft_owned"]
  }
}
```

---

## Referral Logic

If a wallet has a referrer:

1. **Gross Amount**: Full airdrop allocation
2. **Referral (24%)**: `gross * 2400 / 10000`
3. **Net Amount**: `gross - referral`

**Example:**
- Gross: 1,000,000 DOJO
- Referral: 240,000 DOJO (24%)
- Net: 760,000 DOJO

---

## Testing

### Using curl

```bash
# Check eligibility
curl "http://localhost:8000/api/eligibility?wallet=DGH37t..."

# Get status
curl "http://localhost:8000/api/status"

# Health check
curl "http://localhost:8000/health"

# Admin trigger (replace TOKEN)
curl -X POST http://localhost:8000/api/admin/run \
  -H "Authorization: Bearer admin-token"
```

### Using Python

```python
import requests

# Eligibility
response = requests.get(
    "http://localhost:8000/api/eligibility",
    params={"wallet": "DGH37t..."}
)
data = response.json()

# Status
status = requests.get("http://localhost:8000/api/status").json()

# Claim
claim_data = {
    "wallet": "DGH37t...",
    "amount": 1000000,
    "proof": "...",
    "message": "...",
    "signature": "..."
}
response = requests.post(
    "http://localhost:8000/api/claim",
    json=claim_data
)
```

### Using JavaScript

```javascript
// Eligibility
const response = await fetch(
  '/api/eligibility?wallet=DGH37t...'
);
const data = await response.json();

// Status
const status = await fetch('/api/status').then(r => r.json());

// Claim
const claimResponse = await fetch('/api/claim', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    wallet: 'DGH37t...',
    amount: 1000000,
    proof: '...',
    message: '...',
    signature: '...'
  })
});
```

---

## Environment Variables

Required for API to function:

```bash
# Security
PROOF_SECRET=your-secret-key
ADMIN_TOKEN=your-admin-token

# Solana
SOLANA_RPC=https://api.devnet.solana.com
STAKING_PROGRAM_ID=HMwy4JHwuLkMMR3q6B3atwZ4oUAGrc3yHtgC7MswWNY1

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

---

## Performance

- Average response time: < 200ms
- Rate limit recovery: Automatic after 60 seconds
- Concurrent connections: Limited by server resources
- Recommended load: < 100 RPS per server

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 500 RPC error | Check SOLANA_RPC env var |
| 403 Forbidden | Verify ADMIN_TOKEN env var |
| 429 Rate limit | Wait 60 seconds for reset |
| Invalid wallet | Check base58 format |
| Signature fails | Verify message format and encoding |

---

**API Version**: 1.0.0  
**Last Updated**: January 20, 2026
