#!/usr/bin/env python3
from decimal import Decimal
import csv
import sys

AIRDROP_POOL = int(850_000_000 * 60 / 100)
REFERRAL_BPS = 2400  # 24%


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


def apply_referrals(allocations):
    # New behavior: referral is taken as a percentage of the recipient's allocation
    # and the recipient receives the net (gross - referral). All payments are covered
    # by the initial AIRDROP_POOL (no double-deduction).
    total_referrals = 0
    allocations_out = []
    pool = AIRDROP_POOL
    for a in allocations:
        wallet = a["wallet"]
        gross_amount = a["amount"]
        ref = a["referrer"]
        referral_amount = 0
        if ref:
            referral_amount = (gross_amount * REFERRAL_BPS) // 10000
            total_referrals += referral_amount

        recipient_net = gross_amount - referral_amount
        # Deduct the gross allocation once (this covers recipient_net + referral)
        pool -= gross_amount

        allocations_out.append({
            "wallet": wallet,
            "recipient_gross": gross_amount,
            "recipient_net": recipient_net,
            "referrer": ref or "",
            "referral_amount": referral_amount,
        })

    return allocations_out, total_referrals, pool


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: apply_referrals.py recipients.csv")
        sys.exit(1)
    rows = read_recipients(sys.argv[1])
    allocations = compute_allocations(rows)
    allocs, tot_refs, remaining = apply_referrals(allocations)

    out_file = "outputs/allocations_with_referrals.csv"
    with open(out_file, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["wallet", "recipient_gross", "recipient_net", "referrer", "referral_amount"])
        w.writeheader()
        for a in allocs:
            w.writerow(a)

    total_gross = sum(a["recipient_gross"] for a in allocs)
    total_net = sum(a["recipient_net"] for a in allocs)
    print(f"Airdrop pool (initial): {AIRDROP_POOL}")
    print(f"Total gross allocated (sum of gross shares): {total_gross}")
    print(f"Total net to recipients (after referral deduction): {total_net}")
    print(f"Total referral payouts: {tot_refs}")
    print(f"Remaining pool after allocations (should be 0): {remaining}")
    print(f"Allocations written to: {out_file}")
