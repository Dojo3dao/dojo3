import React from 'react'

export default function Project(){
  return (
    <div id="project" className="widget">
      <h3>Dojo3 — Project Overview</h3>
      <p className="lead">Dojo3 blends token distribution, NFT utility, staking mechanics and referral incentives into a single community-first launch.</p>

      <div className="cards">
        <div className="card">
          <h4>Tokenomics</h4>
          <ul>
            <li><strong>Total supply:</strong> 850,000,000 DOJO</li>
            <li><strong>Airdrop:</strong> 60% (510,000,000)</li>
            <li><strong>Public sale:</strong> 40%</li>
            <li><strong>Referral:</strong> 24% of recipient allocation</li>
            <li><strong>Target price:</strong> $0.00001</li>
          </ul>
        </div>

        <div className="card">
          <h4>Airdrop Eligibility</h4>
          <p>Applicants qualify by meeting one or more conditions. Eligibility is determined on‑chain or via our allocation CSV.</p>
          <ul>
            <li>Holders with > $100 USD in listed tokens</li>
            <li>Owners of qualifying NFT collections (e.g. Pudgy Penguins)</li>
            <li>Dojo3 NFT or staking rewards holders</li>
          </ul>
        </div>

        <div className="card">
          <h4>NFT & Staking</h4>
          <p>Pixel collection (999). Stake to earn allocation or mint discount.</p>
          <p><strong>Stake min:</strong> 0.5 SOL for minimum 3 days.</p>
          <p><strong>Staking contract:</strong> <code>HMwy4JHwuLkMMR3q6B3atwZ4oUAGrc3yHtgC7MswWNY1</code></p>
        </div>

        <div className="card">
          <h4>Fees & Services</h4>
          <ul>
            <li>NFT minting discount for eligible holders</li>
            <li>Platform/tx fees kept minimal for testnet</li>
            <li>Optional launch services (token, website, minting)</li>
          </ul>
        </div>
      </div>

      <h4>How It Works</h4>
      <ol>
        <li>Connect wallet and run an eligibility check.</li>
        <li>If eligible, request a proof and sign the claim with your wallet.</li>
        <li>Server records the claim and admin orchestrator distributes tokens (dry-run available).</li>
      </ol>

      <h4>Official</h4>
      <p>Follow updates: <a href="https://x.com/Dojo3_" target="_blank" rel="noreferrer">https://x.com/Dojo3_</a></p>
    </div>
  )
}
