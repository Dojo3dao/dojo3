#!/usr/bin/env python3
"""
Airdrop Orchestrator - Distribute tokens to eligible recipients

This script handles the distribution of DOJO tokens based on allocations.
Supports both dry-run and live modes for safety.

Usage:
    python3 airdrop_orchestrator.py recipients.csv --dry-run
    ALLOW_LIVE=1 python3 airdrop_orchestrator.py recipients.csv --yes
"""
import os
import csv
import sys
import logging
import json
from decimal import Decimal
from typing import List, Dict, Optional

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

TOTAL_SUPPLY = 850_000_000
AIRDROP_PERCENT = 60
AIRDROP_POOL = int(TOTAL_SUPPLY * AIRDROP_PERCENT / 100)
REFERRAL_BPS = 2400  # 24%

RPC = os.environ.get("SOLANA_RPC", "https://api.devnet.solana.com")
DOJO3_TOKEN_MINT = os.environ.get("DOJO3_TOKEN_MINT")
TREASURY_TOKEN_ACCOUNT = os.environ.get("TREASURY_TOKEN_ACCOUNT")
TREASURY_KEYPAIR_PATH = os.environ.get("TREASURY_KEYPAIR_PATH")


def read_recipients(csv_path: str) -> List[Dict]:
    """Read and parse recipients CSV file"""
    rows = []
    
    if not os.path.exists(csv_path):
        logger.error(f"Recipients file not found: {csv_path}")
        raise FileNotFoundError(f"Recipients CSV not found: {csv_path}")
    
    try:
        with open(csv_path, "r", newline="") as f:
            r = csv.DictReader(f)
            for idx, row in enumerate(r, 1):
                try:
                    wallet = row.get("wallet", "").strip()
                    if not wallet:
                        logger.warning(f"Row {idx}: Empty wallet, skipping")
                        continue
                    
                    weight_str = row.get("weight", "1")
                    weight = Decimal(weight_str)
                    ref = row.get("referrer", "").strip() or None
                    
                    rows.append({
                        "wallet": wallet,
                        "weight": weight,
                        "referrer": ref
                    })
                except (ValueError, TypeError) as e:
                    logger.warning(f"Row {idx}: Invalid weight value '{weight_str}', using default 1")
                    rows.append({
                        "wallet": wallet,
                        "weight": Decimal(1),
                        "referrer": ref
                    })
        
        logger.info(f"Loaded {len(rows)} recipients from {csv_path}")
        return rows
    except Exception as e:
        logger.error(f"Error reading recipients CSV: {e}")
        raise


def compute_allocations(rows: List[Dict]) -> List[Dict]:
    """Compute token allocations based on weights"""
    if not rows:
        logger.error("No recipients to compute allocations for")
        return []
    
    total_weight = sum(r["weight"] for r in rows)
    
    if total_weight <= 0:
        logger.error("Total weight is zero or negative")
        return []
    
    allocations = []
    for r in rows:
        try:
            share = r["weight"] / total_weight
            amount = int(Decimal(AIRDROP_POOL) * share)
            allocations.append({
                "wallet": r["wallet"],
                "amount": amount,
                "referrer": r["referrer"]
            })
        except Exception as e:
            logger.error(f"Error computing allocation for {r['wallet']}: {e}")
    
    logger.info(f"Computed allocations for {len(allocations)} recipients")
    return allocations


def load_keypair(path: str) -> Dict:
    """Load keypair from JSON file"""
    if not os.path.exists(path):
        logger.error(f"Keypair file not found: {path}")
        raise FileNotFoundError(f"Keypair not found: {path}")
    
    try:
        with open(path, 'r') as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON in keypair file: {e}")
        raise
    except Exception as e:
        logger.error(f"Error loading keypair: {e}")
        raise


def main():
    import argparse
    p = argparse.ArgumentParser(
        description="Distribute DOJO tokens to eligible recipients",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Dry run (no transactions)
  python3 airdrop_orchestrator.py recipients.csv --dry-run
  
  # Live mode with confirmations (interactive)
  ALLOW_LIVE=1 python3 airdrop_orchestrator.py recipients.csv
  
  # Live mode without confirmations (batch)
  ALLOW_LIVE=1 python3 airdrop_orchestrator.py recipients.csv --yes
        """
    )
    p.add_argument("recipients_csv", help="Path to recipients CSV file")
    p.add_argument("--dry-run", action="store_true", help="Do not send transactions (test mode)")
    p.add_argument("--yes", action="store_true", help="Skip confirmation prompts (batch mode)")
    p.add_argument("--output", default="outputs/allocations_live.csv", help="Output CSV file")
    
    args = p.parse_args()

    logger.info("=" * 60)
    logger.info("Dojo3 Airdrop Orchestrator")
    logger.info("=" * 60)

    # Read and compute allocations
    try:
        rows = read_recipients(args.recipients_csv)
        allocations = compute_allocations(rows)
        
        if not allocations:
            logger.error("No allocations computed, aborting")
            sys.exit(1)
        
        logger.info(f"Total DOJO to distribute: {sum(a['amount'] for a in allocations):,}")
    except Exception as e:
        logger.error(f"Failed to prepare allocations: {e}")
        sys.exit(1)

    # Check dry-run vs live mode
    if not args.dry_run:
        live_allowed = os.environ.get("ALLOW_LIVE", "0") == "1"
        if not live_allowed:
            logger.error("LIVE execution disabled")
            logger.error("To enable live transactions, set: ALLOW_LIVE=1")
            sys.exit(2)
        
        logger.warning("⚠️  LIVE MODE ENABLED - Transactions will be sent!")
        logger.warning("This cannot be undone. Verify parameters carefully.")
    else:
        logger.info("DRY RUN MODE - No transactions will be sent")

    # Initialize Solana in live mode
    token = None
    treasury_kp = None
    
    if not args.dry_run:
        try:
            from solana.rpc.api import Client
            from solana.rpc.core import RPCException
            from solders.keypair import Keypair
            from solders.pubkey import Pubkey as PublicKey
            from spl.token.client import Token
            from spl.token.constants import TOKEN_PROGRAM_ID
            logger.info("Solana libraries imported successfully")
        except ImportError as e:
            logger.error(f"Failed to import Solana libraries: {e}")
            logger.error("Install with: pip install solana solders spl-token")
            sys.exit(2)

        # Validate environment
        if not DOJO3_TOKEN_MINT or not TREASURY_TOKEN_ACCOUNT or not TREASURY_KEYPAIR_PATH:
            logger.error("Missing required environment variables:")
            if not DOJO3_TOKEN_MINT:
                logger.error("  - DOJO3_TOKEN_MINT")
            if not TREASURY_TOKEN_ACCOUNT:
                logger.error("  - TREASURY_TOKEN_ACCOUNT")
            if not TREASURY_KEYPAIR_PATH:
                logger.error("  - TREASURY_KEYPAIR_PATH")
            sys.exit(2)

        try:
            logger.info(f"Connecting to RPC: {RPC}")
            client = Client(RPC)
            
            logger.info(f"Loading treasury keypair: {TREASURY_KEYPAIR_PATH}")
            treasury_secret = load_keypair(TREASURY_KEYPAIR_PATH)
            treasury_kp = Keypair.from_json(treasury_secret)
            
            token = Token(
                client,
                PublicKey(DOJO3_TOKEN_MINT),
                TOKEN_PROGRAM_ID,
                treasury_kp
            )
            logger.info("Solana client initialized")
        except Exception as e:
            logger.error(f"Failed to initialize Solana: {e}")
            sys.exit(2)

    # Process allocations
    out_rows = []
    success_count = 0
    error_count = 0
    skipped_count = 0

    logger.info("=" * 60)
    logger.info("Processing allocations...")
    logger.info("=" * 60)

    for idx, a in enumerate(allocations, 1):
        wallet = a['wallet']
        gross = a['amount']
        ref = a['referrer']
        referral_amount = (gross * REFERRAL_BPS) // 10000 if ref else 0
        net = gross - referral_amount

        logger.info(f"[{idx}/{len(allocations)}] {wallet[:8]}... gross={gross:,} net={net:,} ref={ref or 'None'} referral={referral_amount:,}")

        if not args.dry_run:
            try:
                from solders.pubkey import Pubkey as PublicKey
                from spl.token.instructions import get_associated_token_address
                
                # Compute recipient ATA
                recipient_ata = get_associated_token_address(
                    PublicKey(wallet),
                    PublicKey(DOJO3_TOKEN_MINT)
                )
                
                # Send to recipient
                if net > 0:
                    if not args.yes:
                        resp = input(f"  Send {net:,} to {wallet}? [y/N/q]: ").strip().lower()
                        if resp == 'q':
                            logger.info("Quit requested by user")
                            break
                        if resp not in ("y", "yes"):
                            logger.info(f"  Skipped by user")
                            skipped_count += 1
                            out_rows.append({
                                "wallet": wallet,
                                "gross": gross,
                                "net": net,
                                "referrer": ref or "",
                                "referral_amount": referral_amount,
                                "status": "skipped"
                            })
                            continue
                    
                    try:
                        logger.info(f"  Transferring {net:,} to recipient...")
                        tx_sig = token.transfer(
                            treasury_kp,
                            TREASURY_TOKEN_ACCOUNT,
                            str(recipient_ata),
                            net
                        )
                        logger.info(f"  ✓ TX: {tx_sig}")
                        success_count += 1
                    except Exception as e:
                        logger.error(f"  ✗ Transfer failed: {e}")
                        error_count += 1
                        out_rows.append({
                            "wallet": wallet,
                            "gross": gross,
                            "net": net,
                            "referrer": ref or "",
                            "referral_amount": referral_amount,
                            "status": f"error: {str(e)[:50]}"
                        })
                        continue

                # Send referral bonus
                if referral_amount > 0 and ref:
                    ref_ata = get_associated_token_address(
                        PublicKey(ref),
                        PublicKey(DOJO3_TOKEN_MINT)
                    )
                    try:
                        logger.info(f"  Transferring {referral_amount:,} to referrer...")
                        tx_sig = token.transfer(
                            treasury_kp,
                            TREASURY_TOKEN_ACCOUNT,
                            str(ref_ata),
                            referral_amount
                        )
                        logger.info(f"  ✓ TX: {tx_sig}")
                    except Exception as e:
                        logger.error(f"  ✗ Referral transfer failed: {e}")
                        error_count += 1

            except Exception as e:
                logger.error(f"  ✗ Processing error: {e}")
                error_count += 1
        else:
            success_count += 1

        out_rows.append({
            "wallet": wallet,
            "gross": gross,
            "net": net,
            "referrer": ref or "",
            "referral_amount": referral_amount,
            "status": "processed"
        })

    # Write output
    try:
        output_dir = os.path.dirname(args.output)
        if output_dir and not os.path.exists(output_dir):
            os.makedirs(output_dir)
        
        with open(args.output, 'w', newline='') as f:
            w = csv.DictWriter(
                f,
                fieldnames=["wallet", "gross", "net", "referrer", "referral_amount", "status"]
            )
            w.writeheader()
            for r in out_rows:
                w.writerow(r)
        
        logger.info(f"✓ Wrote results to {args.output}")
    except Exception as e:
        logger.error(f"Failed to write output file: {e}")

    # Summary
    logger.info("=" * 60)
    logger.info("SUMMARY")
    logger.info("=" * 60)
    logger.info(f"Total allocations: {len(allocations)}")
    logger.info(f"Successful: {success_count}")
    logger.info(f"Errors: {error_count}")
    logger.info(f"Skipped: {skipped_count}")
    logger.info(f"Total DOJO distributed: {sum(a['amount'] for a in allocations):,}")
    logger.info("=" * 60)

    if error_count > 0:
        sys.exit(1)


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        logger.info("\nInterrupted by user")
        sys.exit(130)
    except Exception as e:
        logger.error(f"Unexpected error: {e}", exc_info=True)
        sys.exit(1)
