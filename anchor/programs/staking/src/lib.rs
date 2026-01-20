use anchor_lang::prelude::*;

declare_id!("REPLACE_WITH_PROGRAM_ID_STAKING");

const MIN_STAKE_LAMPORTS: u64 = 500_000_000; // 0.5 SOL
const MIN_STAKE_SECONDS: i64 = 3 * 24 * 60 * 60; // 3 days

#[program]
pub mod staking {
    use super::*;

    pub fn stake(ctx: Context<Stake>, amount: u64) -> Result<()> {
        let stake_acc = &mut ctx.accounts.stake_account;
        stake_acc.owner = *ctx.accounts.user.key;
        stake_acc.start_ts = Clock::get()?.unix_timestamp;
        stake_acc.amount = amount;
        // In practice: transfer lamports from user to escrow PDA here using SystemProgram::transfer
        Ok(())
    }

    pub fn claim_nft(ctx: Context<ClaimNFT>) -> Result<()> {
        let stake_acc = &mut ctx.accounts.stake_account;
        let now = Clock::get()?.unix_timestamp;
        require!(now >= stake_acc.start_ts + MIN_STAKE_SECONDS, StakingError::StakeTooShort);
        require!(stake_acc.amount >= MIN_STAKE_LAMPORTS, StakingError::InsufficientStake);
        require!(!stake_acc.claimed, StakingError::AlreadyClaimed);

        // Integrate with Metaplex token-metadata via CPI to mint an NFT here.
        stake_acc.claimed = true;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct Stake<'info> {
    #[account(init_if_needed, payer = user, space = 8 + 64, seeds = [b"stake", user.key().as_ref()], bump)]
    pub stake_account: Account<'info, StakeAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ClaimNFT<'info> {
    #[account(mut, seeds = [b"stake", user.key().as_ref()], bump)]
    pub stake_account: Account<'info, StakeAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[account]
pub struct StakeAccount {
    pub owner: Pubkey,
    pub start_ts: i64,
    pub amount: u64,
    pub claimed: bool,
}

#[error_code]
pub enum StakingError {
    #[msg("Stake period not completed")]
    StakeTooShort,
    #[msg("Insufficient stake amount")]
    InsufficientStake,
    #[msg("Already claimed")]
    AlreadyClaimed,
}

/* Notes:
- To implement fully: on `stake`, transfer lamports from user to an escrow PDA and record the escrow pubkey.
- On `claim_nft`, mint NFT via Metaplex CPI and set metadata (name, uri) referencing IPFS.
- Use multisig/admin controls for emergency withdrawal.
*/
