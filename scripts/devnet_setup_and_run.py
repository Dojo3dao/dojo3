#!/usr/bin/env python3
import os
import time
import json
from solders.keypair import Keypair
from solders.pubkey import Pubkey as PublicKey
from solana.rpc.api import Client
from spl.token.client import Token
from spl.token.constants import TOKEN_PROGRAM_ID

RPC = os.environ.get("SOLANA_RPC", "https://api.devnet.solana.com")
client = Client(RPC)

KEYPATH = os.path.join(os.getcwd(), "outputs", "dev_treasury_keypair.json")

def save_keypair(kp: Keypair, path: str):
    # solders.Keypair provides to_json() which returns a JSON array string
    with open(path, 'w') as f:
        f.write(kp.to_json())
    print("Saved keypair to", path)


def wait_for_confirm(sig):
    for _ in range(30):
        res = client.get_confirmed_transaction(sig)
        if res['result']:
            return True
        time.sleep(1)
    return False


def main():
    # generate treasury keypair
    kp = Keypair.from_seed([i for i in range(32)])
    # using deterministic seed for reproducibility in CI; replace with secure generation
    save_keypair(kp, KEYPATH)

    # fund with devnet airdrop
    lamports = 2_000_000_000  # 2 SOL
    print("Requesting airdrop of 2 SOL to", kp.pubkey())
    # retry airdrop a few times (devnet can be flaky)
    sig = None
    for attempt in range(6):
        try:
            resp = client.request_airdrop(kp.pubkey(), lamports)
            sig = resp['result']
            print("Airdrop tx sig:", sig)
            print("Waiting for confirmation...")
            if wait_for_confirm(sig):
                break
        except Exception as e:
            print("Airdrop attempt", attempt+1, "failed:", e)
        time.sleep(2)

    if not sig:
        print("Airdrop failed after retries, aborting")
        return
    print("Airdrop confirmed")

    # create mint
    decimals = 9
    # create mint using spl.token Token
    token = Token.create_mint(client, kp, kp.pubkey(), decimals, TOKEN_PROGRAM_ID)
    mint_pubkey = token.pubkey
    print("Created mint:", mint_pubkey)

    # create treasury ATA
    treasury_ata = token.create_account(kp.pubkey())
    print("Treasury ATA:", treasury_ata)

    # mint total supply to treasury
    total_supply = 850_000_000
    amount = total_supply * (10 ** decimals)
    print("Minting total supply (", amount, ") to treasury...")
    sig = token.mint_to(treasury_ata, kp, amount)
    print("Mint tx sig:", sig)

    # set env vars for orchestrator
    os.environ['ALLOW_LIVE'] = '1'
    os.environ['SOLANA_RPC'] = RPC
    os.environ['DOJO3_TOKEN_MINT'] = str(mint_pubkey)
    os.environ['TREASURY_TOKEN_ACCOUNT'] = str(treasury_ata)
    os.environ['TREASURY_KEYPAIR_PATH'] = KEYPATH

    print('\nEnvironment set for orchestrator:')
    print('DOJO3_TOKEN_MINT=', mint_pubkey)
    print('TREASURY_TOKEN_ACCOUNT=', treasury_ata)
    print('TREASURY_KEYPAIR_PATH=', KEYPATH)

    # run orchestrator in live mode for sample recipients
    print('\nRunning orchestrator (LIVE) against sample CSV...')
    os.system(f'python3 outputs/airdrop_orchestrator.py outputs/recipients_full_sample.csv --yes')

if __name__ == '__main__':
    main()
