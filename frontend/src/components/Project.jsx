import React from 'react'

export default function Project(){
  return (
    <div id="project" className="widget">
      <h3>💎 TOKENOMICS</h3>

      <div style={{
        background: 'rgba(255,204,0,0.05)',
        padding: '14px',
        borderRadius: '3px',
        marginTop: '12px',
        fontSize: '11px',
        border: '1px solid var(--border)',
        lineHeight: '1.8'
      }}>
        <div style={{marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid var(--border)'}}>
          <div style={{color: 'var(--text-dim)', marginBottom: '4px', letterSpacing: '0.5px'}}>TOTAL SUPPLY</div>
          <div style={{fontSize: '14px', fontWeight: 'bold', color: 'var(--accent)'}}>850,000,000 DOJO</div>
        </div>

        <div style={{marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid var(--border)'}}>
          <div style={{color: 'var(--text-dim)', marginBottom: '6px'}}>ALLOCATION BREAKDOWN</div>
          <div style={{marginBottom: '4px'}}>📦 Airdrop: <strong style={{color: 'var(--success)'}}>60%</strong> (510M)</div>
          <div style={{marginBottom: '4px'}}>💰 Public Sale: <strong>40%</strong></div>
          <div>🎁 Referral Bonus: <strong>24%</strong> of allocation</div>
        </div>

        <div style={{marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid var(--border)'}}>
          <div style={{color: 'var(--text-dim)', marginBottom: '4px'}}>VALUATION</div>
          <div><strong>Target Price:</strong> $0.00001</div>
        </div>

        <div>
          <div style={{color: 'var(--text-dim)', marginBottom: '6px', fontSize: '10px'}}>🔐 Secure Contract</div>
          <div style={{
            fontSize: '9px',
            color: 'var(--text-dim)',
            fontStyle: 'italic'
          }}>
            ✓ Contract audited and deployed
          </div>
        </div>
      </div>

      <div style={{marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)'}}>
        <h4 style={{margin: '0 0 10px', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.5px'}}>✓ ELIGIBILITY RULES</h4>
        <div style={{fontSize: '11px', lineHeight: '1.8', color: 'var(--text-dim)'}}>
          <div style={{marginBottom: '8px'}}>🔹 Hold $100+ USD in verified tokens</div>
          <div style={{marginBottom: '8px'}}>🔹 Own Pudgy Penguins or verified NFTs</div>
          <div style={{marginBottom: '8px'}}>🔹 Stake 0.5+ SOL for 3+ days</div>
          <div>🔹 Participate in community events</div>
        </div>
      </div>

      <div style={{marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)'}}>
        <h4 style={{margin: '0 0 10px', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.5px'}}>🎁 STAKING REWARDS</h4>
        <div style={{fontSize: '11px', lineHeight: '1.8', color: 'var(--text-dim)'}}>
          <div style={{marginBottom: '8px'}}>💾 Minimum: <strong>0.5 SOL</strong></div>
          <div style={{marginBottom: '8px'}}>⏱️ Lock Period: <strong>3 Days</strong></div>
          <div style={{marginBottom: '8px'}}>🎨 Reward: <strong>Exclusive Dojo3 Pixel NFT</strong></div>
          <div>✨ Supply: Limited to 999</div>
        </div>
      </div>
    </div>
  )
}
