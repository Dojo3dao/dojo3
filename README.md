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