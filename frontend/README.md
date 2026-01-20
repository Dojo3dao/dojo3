Dojo3 Frontend

Run locally:

1. cd frontend
2. npm install
3. npm run dev

App connects to a backend at `/api/eligibility`, `/api/claim` and `/api/status`. The backend provides eligibility proofs and an admin trigger to run the orchestrator.

Pages/components:
- Wallet: connect Phantom
- Eligibility: check if your wallet qualifies and submit claim
- Project: overview of tokenomics, airdrop rules, staking, fees
- Admin: status and admin-trigger to run the airdrop (admin token required)
