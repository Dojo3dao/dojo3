import React, { useMemo, useState, useEffect } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter, SolflareWalletAdapter, LedgerWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import WalletConnect from './components/WalletConnect'
import Eligibility from './components/Eligibility'
import Admin from './components/Admin'
import Project from './components/Project'
import Staking from './components/Staking'
import NFTCollections from './components/NFTCollections'
import SiteManager from './components/SiteManager'
import Toasts from './components/Toasts'
import './styles/pixel.css'

// Solana Devnet endpoint
const endpoint = clusterApiUrl('devnet')

export default function App() {
  // Real wallet adapters - no simulation
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/* Parse referral query param once and store for later (claiming) */}
          {typeof window !== 'undefined' && (() => {
            try {
              const params = new URLSearchParams(window.location.search)
              const ref = params.get('ref') || params.get('r')
              if (ref) {
                localStorage.setItem('dojo3_referrer', ref)
              }
            } catch (e) {
              // ignore
            }
            return null
          })()}
          <div className="pixel-app">
            {/* Referrer banner (shows if a referral id is present in localStorage) */}
            {/** Inline small component to avoid creating new files */}
            <ReferrerBannerInline />
            <header className="pixel-header">
              <div className="brand">🎪 DOJO3</div>
              <div className="tag">AIRDROP • STAKING • NFTs • TESTNET</div>
            </header>

            <section className="hero">
              <div className="hero-inner">
                <h1>Welcome to Dojo3</h1>
                <p className="lead">
                  Solana's Premier Airdrop Platform
                  <br/>
                  Check eligibility • Claim tokens • Stake NFTs • Earn rewards
                </p>
                <div className="cta-row">
                  <WalletConnect />
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
                <Staking />
              </div>

              <div className="admin-row">
                <NFTCollections />
              </div>

              <div className="admin-row">
                <SiteManager />
              </div>

              <div className="admin-row">
                <Admin />
              </div>
            </main>

            <Toasts />

            <footer className="pixel-footer">
              🧪 Testnet Only • Do Not Use Mainnet Keys • Devnet SOL Required
            </footer>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

function ReferrerBannerInline() {
  const [ref, setRef] = useState(null)

  useEffect(() => {
    try {
      const r = localStorage.getItem('dojo3_referrer')
      if (r) setRef(r)
    } catch (e) {
      // ignore
    }
  }, [])

  if (!ref) return null

  const short = ref.length > 16 ? `${ref.slice(0, 8)}...${ref.slice(-8)}` : ref

  return (
    <div style={{background: 'linear-gradient(90deg,#072540,#0b3b5a)', color: '#fff', padding: '8px 12px', textAlign: 'center', fontSize: '13px'}}>
      👉 You were referred by: <strong style={{fontFamily: 'monospace'}}>{short}</strong>
    </div>
  )
}
