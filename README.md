Dojo3

Dojo3 is a compact toolkit to build site content and manage token airdrop and staking workflows.

- Frontend: Vite + React application for site and admin UI.
- Backend: Python scripts for site generation and lightweight services.
- Solana: Anchor program templates and orchestration scripts under `anchor/` and `scripts/`.
- Outputs: generated CSV/JSON artifacts and build files are placed in `outputs/` (treat as generated data).

Purpose: provide the minimal code and tools required to generate project sites, compute allocations, and run local development. Keep secrets out of the repository and use environment variables or a secrets manager for keys.

# Mainnet notice

This repository can target Solana Mainnet. BEFORE using Mainnet:

- Remove any dev keypairs from the repository and rotate keys.
- Set `SOLANA_RPC` to a trusted RPC provider or leave blank to use the default.
- Set `PROOF_SECRET` (HMAC) in environment or secrets manager; do NOT use the insecure default.

Use `backend/requirements.txt` and `frontend/package.json` to install dependencies.

This README intentionally replaces other documentation to keep the repository focused and minimal.
# dojo3

## Development quickstart

- Generated artifacts and templates are in the `outputs/` folder.
- Anchor airdrop scaffold: `anchor/programs/airdrop/` (edit `lib.rs`, set program id in `Anchor.toml`).
- To compute airdrop allocations from a sample CSV:

```bash
python3 outputs/alloc_compute.py outputs/recipients_sample.csv
```

- To run the airdrop orchestrator (needs `solana` python package and operator key):

```bash
pip install solana
python3 outputs/airdrop_orchestrator.py recipients.csv --dry-run
```

See `outputs/USAGE.md` for more details.

Warning: deploying to Mainnet requires funded keypairs and careful auditing. Do not run automated airdrops on Mainnet without testing and key rotation.