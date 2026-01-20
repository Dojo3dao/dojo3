import React from 'react'
import WalletConnect from './components/WalletConnect'
import Eligibility from './components/Eligibility'
import Admin from './components/Admin'
import Project from './components/Project'
import Toasts from './components/Toasts'

export default function App() {
  return (
    <div className="pixel-app">
      <header className="pixel-header">
        <div className="brand">Dojo3</div>
        <div className="tag">Airdrop · NFTs · Staking · Referrals</div>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <h1>Welcome to Dojo3</h1>
          <p className="lead">Claim your airdrop, check eligibility, and explore the NFT staking program. Testnet only — no real funds.</p>
          <div className="cta-row">
            <WalletConnect />
            <a className="btn btn-secondary" href="#project">Learn more</a>
          </div>
        </div>
      </section>

      <main className="container">
        <div className="grid">
          <div className="col">
            <Eligibility />
          </div>
          <div className="col">
            <Project />
          </div>
        </div>

        <div className="admin-row">
          <Admin />
        </div>
      </main>

      <Toasts />

      <footer className="pixel-footer">Pixel art style UI • Testnet only — do not use mainnet keys</footer>
    </div>
  )
}
