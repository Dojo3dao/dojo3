"""
Live-capable Airdrop orchestrator
See outputs/airdrop_orchestrator.py for full documentation and usage examples.
"""
import os
import csv
import sys
from decimal import Decimal
# Defer solana imports until live mode to allow dry-run without packages

TOTAL_SUPPLY = 850_000_000
AIRDROP_PERCENT = 60
AIRDROP_POOL = int(TOTAL_SUPPLY * AIRDROP_PERCENT / 100)
REFERRAL_BPS = 2400  # 24%

RPC = os.environ.get("SOLANA_RPC", "https://api.devnet.solana.com")
DOJO3_TOKEN_MINT = os.environ.get("DOJO3_TOKEN_MINT")
TREASURY_TOKEN_ACCOUNT = os.environ.get("TREASURY_TOKEN_ACCOUNT")
TREASURY_KEYPAIR_PATH = os.environ.get("TREASURY_KEYPAIR_PATH")



def read_recipients(csv_path):
    rows = []
    with open(csv_path, "r", newline="") as f:
        r = csv.DictReader(f)
        for row in r:
            wallet = row["wallet"].strip()
            weight = Decimal(row.get("weight", "1"))
            ref = row.get("referrer", "").strip() or None
            rows.append({"wallet": wallet, "weight": weight, "referrer": ref})
    return rows


def compute_allocations(rows):
    total_weight = sum(r["weight"] for r in rows)
    allocations = []
    for r in rows:
        share = (r["weight"] / total_weight) if total_weight > 0 else Decimal(0)
        amount = int(Decimal(AIRDROP_POOL) * share)
        allocations.append({"wallet": r["wallet"], "amount": amount, "referrer": r["referrer"]})
    return allocations


def load_keypair(path: str):
    with open(path, 'r') as f:
        content = f.read()
        return content


def main():
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument("recipients_csv")
    p.add_argument("--dry-run", action="store_true", help="Do not send transactions")
    p.add_argument("--yes", action="store_true", help="Assume yes for confirmations")
    args = p.parse_args()

    rows = read_recipients(args.recipients_csv)
    allocations = compute_allocations(rows)

    print(f"Computed allocations for {len(allocations)} recipients; AIRDROP_POOL={AIRDROP_POOL}")

    live_allowed = os.environ.get("ALLOW_LIVE", "0") == "1"
    if not args.dry_run and not live_allowed:
        print("LIVE execution disabled — set ALLOW_LIVE=1 to enable real sends. Aborting.")
        sys.exit(2)

    token = None
    treasury_kp = None
    if not args.dry_run:
        # Import and initialize solana/spl components only in live mode
        try:
            from solana.rpc.api import Client
            from solders.keypair import Keypair
            from solders.pubkey import Pubkey as PublicKey
            from spl.token.client import Token
            from spl.token.constants import TOKEN_PROGRAM_ID
        except Exception as e:
            print("Failed to import solana runtime packages:", e)
            sys.exit(2)

        if not DOJO3_TOKEN_MINT or not TREASURY_TOKEN_ACCOUNT or not TREASURY_KEYPAIR_PATH:
            print("Environment variables DOJO3_TOKEN_MINT, TREASURY_TOKEN_ACCOUNT, TREASURY_KEYPAIR_PATH must be set for live mode")
            sys.exit(2)
        treasury_secret = load_keypair(TREASURY_KEYPAIR_PATH)
        # construct Keypair from JSON exported by solders.Keypair.to_json()
        treasury_kp = Keypair.from_json(treasury_secret)
        client = Client(RPC)
        token = Token(client, PublicKey(DOJO3_TOKEN_MINT), TOKEN_PROGRAM_ID, treasury_kp)

    out_rows = []
    for a in allocations:
        wallet = a['wallet']
        gross = a['amount']
        ref = a['referrer']
        referral_amount = (gross * REFERRAL_BPS) // 10000 if ref else 0
        net = gross - referral_amount

        print(f"Wallet {wallet}: gross={gross} net={net} ref={ref} referral={referral_amount}")

        if not args.dry_run:
            # compute recipient ATA using token client helper
            recipient_ata = Token.get_associated_token_address(PublicKey(wallet), PublicKey(DOJO3_TOKEN_MINT))
            if net > 0:
                if not args.yes:
                    resp = input(f"Send {net} to {wallet}? [y/N]: ")
                    if resp.strip().lower() not in ("y","yes"):
                        print("Skipped by user")
                        continue
                print("Sending net to recipient...")
                tx_sig = token.transfer(treasury_kp, TREASURY_TOKEN_ACCOUNT, str(recipient_ata), net)
                print("tx:", tx_sig)

            if referral_amount > 0:
                ref_ata = Token.get_associated_token_address(PublicKey(ref), PublicKey(DOJO3_TOKEN_MINT))
                print("Sending referral to referrer...")
                tx_sig = token.transfer(treasury_kp, TREASURY_TOKEN_ACCOUNT, str(ref_ata), referral_amount)
                print("tx:", tx_sig)

        out_rows.append({"wallet": wallet, "gross": gross, "net": net, "referrer": ref or "", "referral_amount": referral_amount})

    out_file = "outputs/allocations_live.csv"
    with open(out_file, 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=["wallet","gross","net","referrer","referral_amount"])
        w.writeheader()
        for r in out_rows:
            w.writerow(r)

    print(f"Wrote allocations to {out_file}")


if __name__ == '__main__':
    main()
