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
          {/* Referrer handling moved into banner component for reliable mount order */}
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
  const [storedRef, setStoredRef] = useState(null)
  const [queryRef, setQueryRef] = useState(null)

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const qref = params.get('ref') || params.get('r')
      if (qref) {
        localStorage.setItem('dojo3_referrer', qref)
        setQueryRef(qref)
        setStoredRef(qref)
        return
      }

      const stored = localStorage.getItem('dojo3_referrer')
      if (stored) setStoredRef(stored)
    } catch (e) {
      // ignore
    }
  }, [])

  const displayRef = queryRef || storedRef
  const short = displayRef ? (displayRef.length > 16 ? `${displayRef.slice(0, 8)}...${displayRef.slice(-8)}` : displayRef) : null

  // Debug banner: always render minimal info so we can see why nothing appears
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
      <div style={{background: displayRef ? 'linear-gradient(90deg,#072540,#0b3b5a)' : '#333', color: '#fff', padding: '8px 12px', textAlign: 'center', fontSize: '13px'}}>
        {displayRef ? (
          <>👉 You were referred by: <strong style={{fontFamily: 'monospace'}}>{short}</strong></>
        ) : (
          <>No referral detected — open with <code>?ref=PUBKEY</code></>
        )}
      </div>
      <div style={{position: 'fixed', right: 12, bottom: 12, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '8px', borderRadius: 6, fontSize: 11}}>
        <div style={{opacity: 0.85}}>Query: {queryRef || '—'}</div>
        <div style={{opacity: 0.85}}>Stored: {storedRef || '—'}</div>
      </div>
    </div>
  )
}
