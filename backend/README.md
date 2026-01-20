Backend API

Run locally:

1. python3 -m venv .venv
2. source .venv/bin/activate
3. pip install -r backend/requirements.txt
4. PROOF_SECRET=your-secret ADMIN_TOKEN=admin uvicorn backend.app:APP --reload --host 0.0.0.0 --port 8000

Endpoints:
- GET /api/eligibility?wallet=<pubkey>  -> {eligible, amount, proof}
- POST /api/claim  -> {wallet, amount, proof}
- POST /api/admin/run  -> requires ADMIN_TOKEN header
