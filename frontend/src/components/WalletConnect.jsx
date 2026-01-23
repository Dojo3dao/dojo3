import React, { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton, useWalletModal } from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css'

export default function WalletConnect() {
  const { publicKey, connected, connect, connecting, disconnect, wallet } = useWallet()
  const { setVisible } = useWalletModal()
  const [lastError, setLastError] = useState(null)

  const handleConnectClick = async () => {
    try {
      const ua = (typeof navigator !== 'undefined' && navigator.userAgent) ? navigator.userAgent.toLowerCase() : ''
      const isMobile = /iphone|ipad|android|mobile/.test(ua)

      // If an inpage wallet is injected (Phantom, Backpack, Slope, Solflare), try to connect directly
      const inpage = typeof window !== 'undefined' ? window.solana || window.wallet : null
      if (inpage && (inpage.isPhantom || inpage.isBackpack || inpage.isSlope || inpage.isSolflare)) {
        try {
          await inpage.connect()
          return
        } catch (e) {
          console.debug('Inpage wallet connect failed, falling back to modal', e)
        }
      }

      // On mobile prefer opening the WalletConnect / modal UI which can deep-link
      setVisible(true)
    } catch (e) {
      console.error('Connect click error', e)
      setVisible(true)
    }
  }

  return (
    <div className="wallet-card">
      <div className="wallet-header">
        <span className="wallet-title">🔐 WALLET</span>
        {connected && <span className="wallet-status-badge">✓ CONNECTED</span>}
      </div>
      
      {connected && publicKey ? (
        <div className="wallet-connected">
          <div className="wallet-display">
            <div className="wallet-label">Active Wallet</div>
            <div className="wallet-pk" title={publicKey.toString()}>
              {publicKey.toString().slice(0, 10)}...{publicKey.toString().slice(-8)}
            </div>
          </div>
        </div>
      ) : (
        <div style={{padding: '8px 0'}}>
          <div style={{fontSize: '11px', color: 'var(--text-dim)', marginBottom: '10px', letterSpacing: '0.5px'}}>
            Click button to connect real wallet
          </div>
        </div>
      )}

      <div style={{marginTop: '10px'}}>
        <button onClick={handleConnectClick} style={{
          width: '100%',
          background: 'linear-gradient(135deg, var(--info) 0%, #0088cc 100%)',
          color: '#fff',
          fontWeight: '700',
          fontSize: '11px',
          borderRadius: '3px',
          padding: '10px',
          border: 'none',
          cursor: 'pointer',
          fontFamily: "'Courier New', monospace",
          letterSpacing: '0.5px'
        }}>
          {connected ? 'Connected' : (connecting ? 'Connecting…' : 'Connect Wallet')}
        </button>
        {/* Hidden WalletMultiButton kept for layout/modal compatibility if needed */}
        <div style={{display: 'none'}}>
          <WalletMultiButton />
        </div>
      </div>

      {/* Debug panel to help diagnose mobile adapter issues */}
      <div style={{marginTop: 10, fontSize: 12, color: 'var(--text-dim)'}}>
        <div>User agent: <span style={{color: '#fff'}}>{typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'}</span></div>
        <div style={{marginTop: 6}}>Injected wallet: <code style={{color: '#fff'}}>{typeof window !== 'undefined' && (window.solana ? JSON.stringify({isPhantom: !!window.solana.isPhantom, isSolflare: !!window.solana.isSolflare, isBackpack: !!window.solana.isBackpack, isSlope: !!window.solana.isSlope}) : 'none')}</code></div>
        <div style={{marginTop: 6}}>Selected adapter: <code style={{color: '#fff'}}>{wallet ? wallet.name || wallet.adapterName || 'unknown' : 'none'}</code></div>
        <div style={{marginTop: 6}}>Connected: <strong style={{color: connected ? '#9ee6b5' : '#fda4af'}}>{String(connected)}</strong> — Connecting: <strong style={{color: connecting ? '#ffd085' : '#9ee6b5'}}>{String(connecting)}</strong></div>
        <div style={{marginTop: 8, display: 'flex', gap: 8}}>
          <button onClick={async () => { try { setLastError(null); await connect(); } catch (e) { setLastError(e?.message || String(e)) } }} style={{padding: '6px 8px', borderRadius: 6}}>Force Connect</button>
          <button onClick={async () => { try { await disconnect(); setLastError(null) } catch (e) { setLastError(e?.message || String(e)) } }} style={{padding: '6px 8px', borderRadius: 6}}>Disconnect</button>
          <button onClick={() => setVisible(true)} style={{padding: '6px 8px', borderRadius: 6}}>Open Modal</button>
        </div>
        {lastError && <div style={{marginTop: 8, color: '#ffb4b4'}}>Last error: {String(lastError)}</div>}
      </div>
    </div>
  )
}
