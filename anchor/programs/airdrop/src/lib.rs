use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, TokenAccount, Token, Transfer};

// Program ID deployed on Mainnet
declare_id!("HMwy4JHwuLkMMR3q6B3atwZ4oUAGrc3yHtgC7MswWNY1");

const TOTAL_SUPPLY: u64 = 850_000_000;
const AIRDROP_PERCENT: u64 = 60;
const REFERRAL_BPS: u64 = 2400; // 24%

#[program]
pub mod dojo3_airdrop {
    use super::*;

    /// Initialize airdrop configuration
    pub fn initialize(ctx: Context<Initialize>, token_decimals: u8) -> Result<()> {
        require!(token_decimals <= 9, AirdropError::InvalidDecimals);
        
        let cfg = &mut ctx.accounts.config;
        cfg.admin = *ctx.accounts.admin.key;
        cfg.mint = *ctx.accounts.mint.to_account_info().key;
        cfg.token_decimals = token_decimals;
        cfg.total_supply = TOTAL_SUPPLY;
        
        let airdrop_pool = TOTAL_SUPPLY
            .checked_mul(AIRDROP_PERCENT)
            .ok_or(AirdropError::ArithmeticError)?
            .checked_div(100)
            .ok_or(AirdropError::ArithmeticError)?;
        
        cfg.airdrop_pool = airdrop_pool;
        cfg.treasury_bump = *ctx.bumps.get("treasury_authority")
            .ok_or(AirdropError::BumpNotFound)?;
        
        msg!("Airdrop initialized with pool: {}", airdrop_pool);
        Ok(())
    }

    /// Claim airdrop tokens with optional referral bonus
    pub fn claim_airdrop(
        ctx: Context<ClaimAirdrop>,
        recipient_amount: u64,
        _proof: Vec<u8>,
        referrer_present: bool,
    ) -> Result<()> {
        // Validate amounts
        require!(recipient_amount > 0, AirdropError::ZeroAmount);
        
        let cfg = &mut ctx.accounts.config;
        
        // Calculate total required amount (recipient + referral if present)
        let referral_amount = if referrer_present {
            recipient_amount
                .checked_mul(REFERRAL_BPS)
                .ok_or(AirdropError::ArithmeticError)?
                .checked_div(10000)
                .ok_or(AirdropError::ArithmeticError)?
        } else {
            0
        };
        
        let total_required = recipient_amount
            .checked_add(referral_amount)
            .ok_or(AirdropError::ArithmeticError)?;
        
        // Check pool has sufficient balance
        require!(cfg.airdrop_pool >= total_required, AirdropError::InsufficientPool);
        
        // Deduct from pool
        cfg.airdrop_pool = cfg.airdrop_pool
            .checked_sub(total_required)
            .ok_or(AirdropError::ArithmeticError)?;

        // Create PDA signer
        let seeds = &[
            b"treasury".as_ref(),
            ctx.program_id.as_ref(),
            &[cfg.treasury_bump],
        ];
        let signer = &[&seeds[..]];

        // Transfer to recipient
        {
            let cpi_accounts = Transfer {
                from: ctx.accounts.treasury_token_account.to_account_info(),
                to: ctx.accounts.recipient_token_account.to_account_info(),
                authority: ctx.accounts.treasury_authority.to_account_info(),
            };
            let cpi_program = ctx.accounts.token_program.to_account_info();
            token::transfer(
                CpiContext::new_with_signer(cpi_program, cpi_accounts, signer),
                recipient_amount,
            )?;
        }

        msg!("Transferred {} tokens to recipient", recipient_amount);

        // Transfer referral bonus if applicable
        if referrer_present && referral_amount > 0 {
            let cpi_accounts_ref = Transfer {
                from: ctx.accounts.treasury_token_account.to_account_info(),
                to: ctx.accounts.referrer_token_account.to_account_info(),
                authority: ctx.accounts.treasury_authority.to_account_info(),
            };
            let cpi_program = ctx.accounts.token_program.to_account_info();
            token::transfer(
                CpiContext::new_with_signer(cpi_program, cpi_accounts_ref, signer),
                referral_amount,
            )?;
            
            msg!("Transferred {} tokens to referrer", referral_amount);
        }

        Ok(())
    }
}

// ===== ACCOUNT STRUCTURES =====

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = admin, space = 8 + 128)]
    pub config: Account<'info, Config>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub mint: Account<'info, Mint>,
    
    /// Treasury authority PDA (derived from seeds)
    #[account(
        init_if_needed,
        payer = admin,
        seeds = [b"treasury", crate::id().as_ref()],
        bump,
        space = 0
    )]
    pub treasury_authority: UncheckedAccount<'info>,
    
    #[account(mut)]
    pub treasury_token_account: Account<'info, TokenAccount>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ClaimAirdrop<'info> {
    #[account(mut, has_one = mint)]
    pub config: Account<'info, Config>,
    
    /// Treasury authority PDA (checked via seeds)
    #[account(
        seeds = [b"treasury", crate::id().as_ref()],
        bump = config.treasury_bump
    )]
    pub treasury_authority: UncheckedAccount<'info>,
    
    #[account(mut)]
    pub treasury_token_account: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub recipient_token_account: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub referrer_token_account: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
}

// ===== STATE ACCOUNTS =====

#[account]
pub struct Config {
    pub admin: Pubkey,
    pub mint: Pubkey,
    pub token_decimals: u8,
    pub total_supply: u64,
    pub airdrop_pool: u64,
    pub treasury_bump: u8,
}

// ===== ERRORS =====

#[error_code]
pub enum AirdropError {
    #[msg("Airdrop pool depleted or insufficient funds")]
    InsufficientPool,
    #[msg("Zero amount not allowed")]
    ZeroAmount,
    #[msg("Arithmetic overflow or underflow")]
    ArithmeticError,
    #[msg("Invalid token decimals")]
    InvalidDecimals,
    #[msg("Bump not found")]
    BumpNotFound,
}
