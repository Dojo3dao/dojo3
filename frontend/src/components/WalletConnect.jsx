import React from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css'

export default function WalletConnect() {
  const { publicKey, connected } = useWallet()

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
        <WalletMultiButton style={{
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
        }} />
      </div>
    </div>
  )
}
