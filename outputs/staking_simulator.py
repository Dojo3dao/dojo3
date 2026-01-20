#!/usr/bin/env python3
"""
Simple staking simulator: simulate users staking amounts at times and determine NFT eligibility
"""
import time
from datetime import datetime, timedelta

MIN_STAKE_SOL = 0.5
MIN_STAKE_SECONDS = 3 * 24 * 60 * 60

sample_stakes = [
    {"wallet": "A1", "amount": 0.6, "start": datetime.utcnow() - timedelta(days=4)},
    {"wallet": "B2", "amount": 0.4, "start": datetime.utcnow() - timedelta(days=5)},
    {"wallet": "C3", "amount": 0.5, "start": datetime.utcnow() - timedelta(days=2)},
]

for s in sample_stakes:
    elapsed = (datetime.utcnow() - s["start"]).total_seconds()
    eligible_amount = s["amount"] >= MIN_STAKE_SOL and elapsed >= MIN_STAKE_SECONDS
    print(f"{s['wallet']}: staked {s['amount']} SOL at {s['start'].isoformat()} (elapsed {elapsed/86400:.2f} days) -> NFT eligible: {eligible_amount}")
