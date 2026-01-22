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

  const [copied, setCopied] = useState(false)

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch (e) {
      console.error('Copy failed', e)
    }
  }

  if (!displayRef) return null

  const short = displayRef.length > 24 ? `${displayRef.slice(0, 12)}…${displayRef.slice(-8)}` : displayRef
  const shareUrl = `${window.location.origin}${window.location.pathname}?ref=${displayRef}`

  return (
    <div style={{background: 'linear-gradient(90deg,#072540,#0b3b5a)', color: '#fff', padding: '10px 14px', textAlign: 'center', fontSize: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <div style={{fontSize: 13, color: '#BEE3F8'}}>🎁 Referred by</div>
        <div style={{fontFamily: 'monospace', background: 'rgba(255,255,255,0.04)', padding: '6px 10px', borderRadius: 6}}>{short}</div>
      </div>

      <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
        <button onClick={() => copyText(displayRef)} style={{padding: '6px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', background: '#0ea5a3', color: '#012'}}>
          Copy Pubkey
        </button>

        <button onClick={() => copyText(shareUrl)} style={{padding: '6px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#fff', cursor: 'pointer'}}>
          Copy Share Link
        </button>

        <div style={{minWidth: 80, textAlign: 'left', fontSize: 12, opacity: 0.95}}>
          {copied ? <span style={{color: '#d1fae5'}}>Copied ✓</span> : <span style={{color: '#cfefff'}}>Ready to share</span>}
        </div>
      </div>
    </div>
  )
}
