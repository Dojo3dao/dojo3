#!/usr/bin/env python3
"""Run the airdrop allocations and transfers in-process using solana-py + spl.token

Usage: python3 scripts/run_inproc_orchestrator.py --mint MINT --treasury-ata ATA outputs/recipients_full_sample.csv --yes
"""
import os
import sys
import csv
import argparse
import json
from decimal import Decimal

from solana.rpc.api import Client
from solders.keypair import Keypair
from solders.pubkey import Pubkey
from spl.token.client import Token
from spl.token.instructions import get_associated_token_address
from spl.token.constants import TOKEN_PROGRAM_ID

TOTAL_SUPPLY = 850_000_000
AIRDROP_PERCENT = 60
AIRDROP_POOL = int(TOTAL_SUPPLY * AIRDROP_PERCENT / 100)
REFERRAL_BPS = 2400


def load_keypair(path: str) -> Keypair:
    with open(path, 'r') as f:
        data = f.read()
    # solders.Keypair provides from_json constructor
    try:
        return Keypair.from_json(data)
    except Exception:
        # fallback: JSON array of ints
        arr = json.loads(data)
        b = bytes(arr)
        if len(b) == 64:
            return Keypair.from_bytes(b)
        if len(b) == 32:
            from nacl.signing import SigningKey
            sk = SigningKey(b)
            secret = sk.encode() + sk.verify_key.encode()
            return Keypair.from_bytes(secret)
        raise ValueError('Unexpected key length: ' + str(len(b)))


def read_recipients(path):
    rows = []
    with open(path, 'r', newline='') as f:
        r = csv.DictReader(f)
        for row in r:
            wallet = row['wallet'].strip()
            weight = Decimal(row.get('weight', '1'))
            ref = row.get('referrer', '').strip() or None
            rows.append({'wallet': wallet, 'weight': weight, 'referrer': ref})
    return rows


def compute_allocations(rows):
    total_weight = sum(r['weight'] for r in rows)
    allocations = []
    for r in rows:
        share = (r['weight'] / total_weight) if total_weight > 0 else Decimal(0)
        amount = int(Decimal(AIRDROP_POOL) * share)
        allocations.append({'wallet': r['wallet'], 'amount': amount, 'referrer': r['referrer']})
    return allocations


def main():
    p = argparse.ArgumentParser()
    p.add_argument('recipients_csv')
    p.add_argument('--mint', required=True)
    p.add_argument('--treasury-ata', required=True)
    p.add_argument('--keypair', default='outputs/dev_treasury_keypair.json')
    p.add_argument('--rpc', default=os.environ.get('SOLANA_RPC', 'https://api.mainnet-beta.solana.com'))
    p.add_argument('--yes', action='store_true')
    args = p.parse_args()

    client = Client(args.rpc)
    kp = load_keypair(args.keypair)
    print('Using pubkey:', kp.pubkey())
    bal = client.get_balance(kp.pubkey())
    lam = bal['result']['value'] if isinstance(bal, dict) else getattr(bal, 'value', 0)
    print('Balance lamports:', lam)
    if lam <= 0:
        print('Treasury key has no SOL; aborting.')
        sys.exit(2)

    mint_pub = Pubkey.from_string(args.mint)
    token = Token(client, mint_pub, TOKEN_PROGRAM_ID, kp)

    rows = read_recipients(args.recipients_csv)
    allocs = compute_allocations(rows)

    out = []
    for a in allocs:
        wallet = a['wallet']
        gross = a['amount']
        ref = a['referrer']
        referral_amount = (gross * REFERRAL_BPS) // 10000 if ref else 0
        net = gross - referral_amount

        print(f'Wallet {wallet}: gross={gross} net={net} ref={ref} referral={referral_amount}')

        if net > 0:
            if not args.yes:
                resp = input(f'Send {net} to {wallet}? [y/N]: ')
                if resp.strip().lower() not in ('y', 'yes'):
                    print('Skipped by user')
                    continue
            # compute ATA and transfer
            try:
                recipient_ata = get_associated_token_address(Pubkey.from_string(wallet), Pubkey.from_string(args.mint))
            except Exception as e:
                print('Invalid recipient pubkey, skipping:', wallet, e)
                continue
            tx = token.transfer(args.treasury_ata, str(recipient_ata), kp, net)
            print('Sent net tx:', tx)

        if referral_amount > 0:
            try:
                ref_ata = get_associated_token_address(Pubkey.from_string(ref), Pubkey.from_string(args.mint))
            except Exception as e:
                print('Invalid ref pubkey, skipping referral for', wallet, ref, e)
                ref_ata = None
            if ref_ata:
                tx = token.transfer(args.treasury_ata, str(ref_ata), kp, referral_amount)
                print('Sent referral tx:', tx)
            print('Sent referral tx:', tx)

        out.append({'wallet': wallet, 'gross': gross, 'net': net, 'referrer': ref or '', 'referral_amount': referral_amount})

    out_file = 'outputs/allocations_live.csv'
    with open(out_file, 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=['wallet', 'gross', 'net', 'referrer', 'referral_amount'])
        w.writeheader()
        for r in out:
            w.writerow(r)

    print('Wrote allocations to', out_file)


if __name__ == '__main__':
    main()
