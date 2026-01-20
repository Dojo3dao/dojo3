Usage notes — Dojo3 developer quick start

1) Anchor programs (Airdrop & Staking)
- Edit `outputs/solana_airdrop_anchor.txt` and `outputs/staking_nft_anchor.txt` to set real program IDs.
- Convert templates into Anchor projects: create `Cargo.toml`, `lib.rs` etc., then `anchor build` and `anchor deploy`.
- Set `Anchor.toml` provider wallet and cluster.

2) Airdrop orchestration
- Prepare `recipients.csv` with columns: wallet,weight,referrer
- Set environment variables: `DOJO3_TOKEN_MINT`, `TREASURY_TOKEN_ACCOUNT`, `TREASURY_KEYPAIR_PATH`, `SOLANA_RPC`.
- Run: `python3 outputs/airdrop_orchestrator.py recipients.csv --dry-run` to preview.

3) Staking & NFT
- Deploy staking program and integrate Metaplex for minting unique NFTs.
- Use escrow PDAs for lamport custody and ensure claim checks on-chain.

Live execution notes (orchestrator):
- Ensure `requirements.txt` installed (`pip install -r requirements.txt`).
- Set environment variables for live mode:

```bash
export ALLOW_LIVE=1
export SOLANA_RPC=https://api.devnet.solana.com
export DOJO3_TOKEN_MINT=<mint>
export TREASURY_TOKEN_ACCOUNT=<treasury_ata>
export TREASURY_KEYPAIR_PATH=/path/to/keypair.json
```

- Dry-run example:

```bash
python3 outputs/airdrop_orchestrator.py outputs/recipients_full_sample.csv --dry-run
```

- Live run example (careful):

```bash
ALLOW_LIVE=1 python3 outputs/airdrop_orchestrator.py outputs/recipients_full_sample.csv --yes
```

4) Security & testing
- Test on `devnet` or local validator before mainnet deployment.
- Use small test airdrop pools and unit tests for on-chain logic.

5) Manual steps the operator must perform
- Create token mint for Dojo3 and fund treasury.
- Run off-chain eligibility scans (chain indexer) and generate proofs (Merkle or signed attestations).
- Review referral accounting: ensure referral payments are handled from correct pool and do not double-pay.

If you want, I can now:
- Convert the airdrop template into a full Anchor project scaffold and add build files.
- Generate a sample `recipients.csv` from the listed eligibility rules.
Which should I do next?