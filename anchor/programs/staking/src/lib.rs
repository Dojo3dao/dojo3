use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

// ⚠️ IMPORTANT: Replace with actual deployed program ID
declare_id!("HMwy4JHwuLkMMR3q6B3atwZ4oUAGrc3yHtgC7MswWNY1");

const MIN_STAKE_LAMPORTS: u64 = 500_000_000; // 0.5 SOL
const MIN_STAKE_SECONDS: i64 = 3 * 24 * 60 * 60; // 3 days
const ESCROW_SEED: &[u8] = b"stake_escrow";

#[program]
pub mod staking {
    use super::*;

    /// Stake SOL to earn NFT rewards
    pub fn stake(ctx: Context<Stake>, amount: u64) -> Result<()> {
        // Validate stake amount
        require!(amount >= MIN_STAKE_LAMPORTS, StakingError::InsufficientStake);
        
        let stake_acc = &mut ctx.accounts.stake_account;
        stake_acc.owner = *ctx.accounts.user.key;
        stake_acc.start_ts = Clock::get()?.unix_timestamp;
        stake_acc.amount = amount;
        stake_acc.claimed = false;
        stake_acc.escrow_bump = *ctx.bumps.get("escrow_account")
            .ok_or(StakingError::BumpNotFound)?;

        // Transfer lamports from user to escrow PDA
        let cpi_context = anchor_lang::context::CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            anchor_lang::solana_program::system_instruction::Transfer {
                from_pubkey: *ctx.accounts.user.key,
                to_pubkey: ctx.accounts.escrow_account.key(),
                lamports: amount,
            },
        );
        
        anchor_lang::solana_program::program::invoke_signed(
            &anchor_lang::solana_program::system_instruction::transfer(
                ctx.accounts.user.key,
                ctx.accounts.escrow_account.key(),
                amount,
            ),
            &[
                ctx.accounts.user.to_account_info(),
                ctx.accounts.escrow_account.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
            &[],
        )?;

        msg!(
            "Staked {} lamports from {}",
            amount,
            ctx.accounts.user.key()
        );

        Ok(())
    }

    /// Claim NFT reward after staking period (3 days minimum)
    pub fn claim_nft(ctx: Context<ClaimNFT>) -> Result<()> {
        let stake_acc = &mut ctx.accounts.stake_account;
        let now = Clock::get()?.unix_timestamp;

        // Check staking duration
        require!(
            now >= stake_acc.start_ts.checked_add(MIN_STAKE_SECONDS)
                .ok_or(StakingError::ArithmeticError)?,
            StakingError::StakeTooShort
        );

        // Check minimum stake amount
        require!(
            stake_acc.amount >= MIN_STAKE_LAMPORTS,
            StakingError::InsufficientStake
        );

        // Check not already claimed
        require!(!stake_acc.claimed, StakingError::AlreadyClaimed);

        // Mark as claimed (prevents double-claiming)
        stake_acc.claimed = true;

        msg!(
            "NFT reward claimed for {} (staked {} lamports for {} seconds)",
            stake_acc.owner,
            stake_acc.amount,
            now - stake_acc.start_ts
        );

        // ⚠️ TODO: Integrate with Metaplex token-metadata via CPI to mint an NFT
        // This would involve:
        // 1. Creating a mint account
        // 2. Minting 1 NFT to the user's token account
        // 3. Setting metadata (name, symbol, URI pointing to IPFS)
        // 4. Making metadata immutable

        Ok(())
    }

    /// Withdraw staked SOL (only owner, after claiming NFT)
    pub fn withdraw(ctx: Context<Withdraw>) -> Result<()> {
        let stake_acc = &mut ctx.accounts.stake_account;

        // Require NFT already claimed
        require!(stake_acc.claimed, StakingError::NFTNotClaimed);

        // Only owner can withdraw
        require_eq!(
            stake_acc.owner,
            ctx.accounts.user.key(),
            StakingError::Unauthorized
        );

        let amount = stake_acc.amount;

        // Transfer from escrow back to user
        **ctx.accounts.escrow_account.lamports.borrow_mut() -= amount;
        **ctx.accounts.user.lamports.borrow_mut() += amount;

        msg!(
            "Withdrawn {} lamports to {}",
            amount,
            ctx.accounts.user.key()
        );

        Ok(())
    }
}

// ===== ACCOUNT STRUCTURES =====

#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct Stake<'info> {
    #[account(
        init_if_needed,
        payer = user,
        space = 8 + 64,
        seeds = [b"stake", user.key().as_ref()],
        bump
    )]
    pub stake_account: Account<'info, StakeAccount>,

    /// Escrow account to hold staked SOL
    #[account(
        mut,
        seeds = [ESCROW_SEED, user.key().as_ref()],
        bump
    )]
    pub escrow_account: UncheckedAccount<'info>,

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

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut, seeds = [b"stake", user.key().as_ref()], bump)]
    pub stake_account: Account<'info, StakeAccount>,

    #[account(
        mut,
        seeds = [ESCROW_SEED, user.key().as_ref()],
        bump = stake_account.escrow_bump
    )]
    pub escrow_account: UncheckedAccount<'info>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

// ===== STATE ACCOUNTS =====

#[account]
pub struct StakeAccount {
    pub owner: Pubkey,           // 32 bytes
    pub start_ts: i64,            // 8 bytes
    pub amount: u64,              // 8 bytes
    pub claimed: bool,            // 1 byte
    pub escrow_bump: u8,          // 1 byte
}

// ===== ERRORS =====

#[error_code]
pub enum StakingError {
    #[msg("Staking period not yet completed (minimum 3 days)")]
    StakeTooShort,
    
    #[msg("Insufficient stake amount (minimum 0.5 SOL)")]
    InsufficientStake,
    
    #[msg("NFT reward already claimed")]
    AlreadyClaimed,
    
    #[msg("NFT reward not yet claimed")]
    NFTNotClaimed,
    
    #[msg("Unauthorized: only stake owner can withdraw")]
    Unauthorized,
    
    #[msg("Arithmetic overflow or underflow")]
    ArithmeticError,
    
    #[msg("Bump not found")]
    BumpNotFound,
}
