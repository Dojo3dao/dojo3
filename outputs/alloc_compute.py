#!/usr/bin/env python3
from decimal import Decimal
import csv
import sys

AIRDROP_POOL = int(850_000_000 * 60 / 100)

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


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: alloc_compute.py recipients.csv")
        sys.exit(1)
    rows = read_recipients(sys.argv[1])
    allocations = compute_allocations(rows)
    for a in allocations:
        print(a)
    total = sum(a['amount'] for a in allocations)
    print('Sum allocated:', total)
