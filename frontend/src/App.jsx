import React, { useMemo, useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter, SolflareWalletAdapter, LedgerWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import WalletConnect from './components/WalletConnect'
import Eligibility from './components/Eligibility'
import Project from './components/Project'
import Staking from './components/Staking'
import NFTCollections from './components/NFTCollections'
import SiteManager from './components/SiteManager'
import Toasts from './components/Toasts'
import './styles/pixel.css'

// Solana Mainnet endpoint
const endpoint = clusterApiUrl('mainnet-beta')

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

  // Animated hero features
  const features = ['Airdrop', 'Staking', 'NFTs', 'Referral Rewards']
  const [featIdx, setFeatIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setFeatIdx(i => (i + 1) % features.length), 2200)
    return () => clearInterval(t)
  }, [])

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
              <div className="brand">DOJO3</div>
              <div className="tag">AIRDROP • STAKING • NFTs • MAINNET</div>
            </header>

            <section className="hero">
              <div className="hero-inner">
                <h1 style={{marginBottom: 8}}>Welcome to Dojo3</h1>

                <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12}}>
                  <div style={{fontSize: 14, color: 'var(--text-dim)'}}>Solana ·</div>
                  <div className="hero-feature" key={featIdx} style={{fontSize: 14, fontWeight: 700, color: 'var(--accent)'}}>{features[featIdx]}</div>
                  <div style={{fontSize: 13, color: 'var(--text-dim)'}}>• Mainnet</div>
                </div>

                <p className="lead" style={{maxWidth: 720}}>
                  Dojo3 makes token distributions, staking and NFT drops simple and secure.
                </p>

                <div style={{display: 'flex', gap: 10, marginTop: 12, marginBottom: 8}}>
                  <div style={{background: 'rgba(255,255,255,0.04)', padding: '6px 10px', borderRadius: 6}}>Check eligibility</div>
                  <div style={{background: 'rgba(255,255,255,0.04)', padding: '6px 10px', borderRadius: 6}}>Claim tokens</div>
                  <div style={{background: 'rgba(255,255,255,0.04)', padding: '6px 10px', borderRadius: 6}}>Stake NFTs</div>
                  <div style={{background: 'rgba(255,255,255,0.04)', padding: '6px 10px', borderRadius: 6}}>Earn rewards</div>
                </div>

                <div className="cta-row" style={{marginTop: 14}}>
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

            </main>

            <Toasts />

            <footer className="pixel-footer" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                <span style={{fontSize: 16}}>🎪</span>
                <strong>Dojo3</strong>
              </div>

              <a href="https://x.com/Dojo3_" target="_blank" rel="noreferrer" style={{background: '#1DA1F2', color: '#fff', padding: '6px 10px', borderRadius: 6, textDecoration: 'none'}}>
                Follow @Dojo3_
              </a>
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

  const { publicKey, connected } = useWallet()
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
  // If the user has a connected wallet, prefer using their wallet as the referrer
  const refToShare = (connected && publicKey) ? publicKey.toString() : displayRef
  const shareUrl = `${window.location.origin}${window.location.pathname}?ref=${refToShare}`

  return (
    <div style={{background: 'linear-gradient(90deg,#072540,#0b3b5a)', color: '#fff', padding: '10px 14px', textAlign: 'center', fontSize: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <div style={{fontSize: 13, color: '#BEE3F8'}}>🎁 Referred by</div>
        <div style={{fontFamily: 'monospace', background: 'rgba(255,255,255,0.04)', padding: '6px 10px', borderRadius: 6}}>{short}</div>
      </div>

      <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
        <button onClick={() => copyText(refToShare)} style={{padding: '6px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', background: '#0ea5a3', color: '#012'}}>
          Copy Pubkey
        </button>

        <button onClick={() => copyText(shareUrl)} style={{padding: '6px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#fff', cursor: 'pointer'}}>
          Copy Share Link
        </button>

        {/* Social share buttons */}
        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Claim your Dojo3 airdrop")}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" style={{padding: '6px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#1DA1F2', textDecoration: 'none'}}>
          Twitter
        </a>

        <a href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent("Claim your Dojo3 airdrop")}`} target="_blank" rel="noreferrer" style={{padding: '6px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#26A5E4', textDecoration: 'none'}}>
          Telegram
        </a>

        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent("Claim your Dojo3 airdrop: ") + encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" style={{padding: '6px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#25D366', textDecoration: 'none'}}>
          WhatsApp
        </a>

        <div style={{minWidth: 80, textAlign: 'left', fontSize: 12, opacity: 0.95}}>
          {copied ? <span style={{color: '#d1fae5'}}>Copied ✓</span> : <span style={{color: '#cfefff'}}>Ready to share</span>}
        </div>
      </div>
    </div>
  )
}
