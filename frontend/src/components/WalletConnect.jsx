import React, { useState, useEffect } from 'react'

export default function WalletConnect() {
  const [provider, setProvider] = useState(null)
  const [publicKey, setPublicKey] = useState(null)

  useEffect(() => {
    if (window.solana && window.solana.isPhantom) setProvider(window.solana)
  }, [])

  const connect = async () => {
    if (!provider) return alert('Install Phantom wallet')
    try {
      const resp = await provider.connect()
      setPublicKey(resp.publicKey.toString())
      // expose to other components via window.solana (Phantom does this), and set isConnected
      try{ window.solana.isConnected = true }catch(e){}
    } catch (e) {
      console.error(e)
    }
  }

  const disconnect = async () => {
    if (!provider) return
    await provider.disconnect()
    setPublicKey(null)
    try{ window.solana.isConnected = false }catch(e){}
  }

  return (
    <div className="widget">
      <h3>Wallet</h3>
      {publicKey ? (
        <div>
          <div className="pk">{publicKey}</div>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <div>
          <button onClick={connect}>Connect Phantom</button>
        </div>
      )}
    </div>
  )
}
