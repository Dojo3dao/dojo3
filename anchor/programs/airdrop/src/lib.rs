use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, TokenAccount, Token, Transfer};

declare_id!("REPLACE_WITH_PROGRAM_ID");

const TOTAL_SUPPLY: u64 = 850_000_000;
const AIRDROP_PERCENT: u64 = 60;
const REFERRAL_BPS: u64 = 2400; // 24%

#[program]
pub mod dojo3_airdrop {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, token_decimals: u8) -> Result<()> {
        let cfg = &mut ctx.accounts.config;
        cfg.admin = *ctx.accounts.admin.key;
        cfg.mint = *ctx.accounts.mint.to_account_info().key;
        cfg.token_decimals = token_decimals;
        cfg.total_supply = TOTAL_SUPPLY;
        cfg.airdrop_pool = (TOTAL_SUPPLY.checked_mul(AIRDROP_PERCENT).unwrap()) / 100;
        Ok(())
    }

    pub fn claim_airdrop(ctx: Context<ClaimAirdrop>, recipient_amount: u64, _proof: Vec<u8>, referrer_present: bool) -> Result<()> {
        let cfg = &mut ctx.accounts.config;
        require!(recipient_amount > 0, AirdropError::ZeroAmount);
        require!(cfg.airdrop_pool >= recipient_amount, AirdropError::InsufficientPool);
        cfg.airdrop_pool = cfg.airdrop_pool.checked_sub(recipient_amount).unwrap();

        let seeds = &[b"treasury".as_ref(), ctx.program_id.as_ref(), &[cfg.treasury_bump]];
        let signer = &[&seeds[..]];

        let cpi_accounts = Transfer {
            from: ctx.accounts.treasury_token_account.to_account_info(),
            to: ctx.accounts.recipient_token_account.to_account_info(),
            authority: ctx.accounts.treasury_authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        token::transfer(CpiContext::new_with_signer(cpi_program, cpi_accounts, signer), recipient_amount)?;

        if referrer_present {
            let referral_amount = recipient_amount.checked_mul(REFERRAL_BPS).unwrap() / 10000u64;
            if referral_amount > 0 {
                let cpi_accounts_ref = Transfer {
                    from: ctx.accounts.treasury_token_account.to_account_info(),
                    to: ctx.accounts.referrer_token_account.to_account_info(),
                    authority: ctx.accounts.treasury_authority.to_account_info(),
                };
                token::transfer(CpiContext::new_with_signer(cpi_program, cpi_accounts_ref, signer), referral_amount)?;
                cfg.airdrop_pool = cfg.airdrop_pool.checked_sub(referral_amount).unwrap();
            }
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = admin, space = 8 + 128)]
    pub config: Account<'info, Config>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub mint: Account<'info, Mint>,
    /// CHECK: Treasury authority PDA
    pub treasury_authority: UncheckedAccount<'info>,
    #[account(mut)]
    pub treasury_token_account: Account<'info, TokenAccount>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ClaimAirdrop<'info> {
    #[account(mut, has_one = mint)]
    pub config: Account<'info, Config>,
    /// CHECK: treasury authority PDA
    pub treasury_authority: UncheckedAccount<'info>,
    #[account(mut)]
    pub treasury_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub recipient_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub referrer_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct Config {
    pub admin: Pubkey,
    pub mint: Pubkey,
    pub token_decimals: u8,
    pub total_supply: u64,
    pub airdrop_pool: u64,
    pub treasury_bump: u8,
}

#[error_code]
pub enum AirdropError {
    #[msg("Airdrop pool depleted or insufficient funds")]
    InsufficientPool,
    #[msg("Zero amount not allowed")]
    ZeroAmount,
}
