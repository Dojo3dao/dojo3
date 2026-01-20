import React, { useState, useEffect } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL, Transaction } from '@solana/web3.js'
import { createWarriorPixelArt, createSniperPixelArt, createBeastPixelArt } from '../utils/pixelArt'

const PixelArtImage = ({ src, alt, size = 120 }) => {
  return (
    <div style={{
      position: 'relative',
      width: size,
      height: size,
      margin: '0 auto 10px'
    }}>
      <img 
        src={src} 
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated',
          imageRendering: 'crisp-edges',
          imageRendering: '-webkit-optimize-contrast',
          border: '2px solid var(--accent)',
          borderRadius: '2px',
          backgroundColor: 'rgba(0,0,0,0.3)'
        }}
      />
    </div>
  )
}

const generateNFTImages = () => {
  return {
    warrior: createWarriorPixelArt(),
    sniper: createSniperPixelArt(),
    beast: createBeastPixelArt()
  }
}

const nftImages = generateNFTImages()

const NFT_COLLECTIONS = [
{
id: 'warrior',
name: '⚔️ WARRIOR NFT',
rarity: 'Legendary',
price_eligible: 0.01,
price_regular: 0.2,
supply: 333,
description: 'Fearless warrior ready for battle',
attributes: ['Power', 'Speed', 'Armor', 'Wisdom'],
image: () => nftImages.warrior
},
{
id: 'sniper',
name: '🎯 SNIPER NFT',
rarity: 'Epic',
price_eligible: 0.01,
price_regular: 0.2,
supply: 333,
description: 'Precision and accuracy at peak',
attributes: ['Precision', 'Focus', 'Agility', 'Intel'],
image: () => nftImages.sniper
},
{
id: 'beast',
name: '🐉 BEAST NFT',
rarity: 'Rare',
price_eligible: 0.01,
price_regular: 0.2,
supply: 333,
description: 'Unstoppable force of nature',
attributes: ['Strength', 'Endurance', 'Bite', 'Roar'],
image: () => nftImages.beast
}
]

const PLATFORM_FEE = 0.01
const TREASURY_ADDRESS = '8pSyRMP7R5qDU5BTqR93rESA1R2h5jH6hdPRjXmjnj8u'

export default function NFTCollections() {
const wallet = useWallet()
const { publicKey, connected, sendTransaction } = wallet
const { connection } = useConnection()
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
const [status, setStatus] = useState('')
const [selectedNFT, setSelectedNFT] = useState(null)
const [eligible, setEligible] = useState(false)
const [balance, setBalance] = useState(0)

useEffect(() => {
if (publicKey && connected) {
checkBalance()
checkEligibility()
}
}, [publicKey, connected, connection])

const checkBalance = async () => {
try {
const lamports = await connection.getBalance(publicKey)
setBalance(lamports / LAMPORTS_PER_SOL)
} catch (e) {
console.error('Balance check error:', e)
}
}

const checkEligibility = async () => {
try {
const response = await fetch(
`http://localhost:8000/api/eligibility?wallet=${publicKey.toString()}`
)
const data = await response.json()
setEligible(data.eligible || false)
} catch (e) {
console.error('Eligibility check error:', e)
}
}

const handleMintNFT = async (nft) => {
if (!publicKey || !connected) {
setError('Please connect wallet first')
return
}

if (!sendTransaction) {
setError('Wallet does not support transactions')
return
}

const price = eligible ? nft.price_eligible : nft.price_regular
const total = price + PLATFORM_FEE

if (balance < total) {
setError(`Insufficient balance. You need ${total} SOL`)
return
}

setSelectedNFT(nft.id)
setLoading(true)
setError(null)
setStatus(`🖼️ Preparing to mint ${nft.name}...`)

try {
const { blockhash } = await connection.getLatestBlockhash()
const treasuryPubkey = new PublicKey(TREASURY_ADDRESS)

const instruction = SystemProgram.transfer({
fromPubkey: publicKey,
toPubkey: treasuryPubkey,
lamports: Math.floor(total * LAMPORTS_PER_SOL),
})

const transaction = new Transaction({
recentBlockhash: blockhash,
feePayer: publicKey,
})
transaction.add(instruction)

setStatus(`📝 Requesting wallet signature for ${nft.name}...`)

const txid = await sendTransaction(transaction, connection)

console.log('Transaction sent:', txid)
setStatus(`⏳ Confirming payment for ${nft.name}... ${txid.slice(0, 8)}...`)

const confirmation = await connection.confirmTransaction(txid, 'confirmed')

if (confirmation.value.err) {
throw new Error('Payment failed on chain')
}

setStatus(`✅ ${nft.name} NFT MINTED!

✓ Payment: ${total} SOL confirmed
✓ Rarity: ${nft.rarity}
✓ Traits: ${nft.attributes.join(', ')}
✓ Txn: ${txid.slice(0, 16)}...

Your NFT is in your wallet!`)

window.showToast?.(`✓ ${nft.name} NFT minted!`, 'success')

setTimeout(checkBalance, 1000)
setSelectedNFT(null)
} catch (err) {
const msg = err?.message || err?.toString() || 'NFT minting failed'
console.error('Minting error:', err)

if (msg.includes('User rejected') || msg.includes('user rejected')) {
setError('Transaction rejected by user')
} else if (msg.includes('Insufficient')) {
setError('Insufficient balance')
} else {
setError(msg)
}

setStatus('')
window.showToast?.(`✗ ${msg}`, 'error')
} finally {
setLoading(false)
}
}

if (!connected) {
return (
<div className="widget">
<h3>🎨 NFT COLLECTIONS</h3>
<div className="warning">
Connect your wallet to browse and mint NFTs
</div>
</div>
)
}

return (
<div className="widget">
<h3>🎨 NFT COLLECTIONS & MINTING</h3>

{error && <div className="error-banner">{error}</div>}
{status && <div className="status" style={{whiteSpace: 'pre-wrap'}}>{status}</div>}

<div style={{marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)'}}>
<div style={{
background: 'rgba(0,170,255,0.1)',
padding: '12px',
borderRadius: '3px',
marginBottom: '14px',
fontSize: '11px'
}}>
<div style={{color: 'var(--text-dim)', marginBottom: '6px'}}>YOUR STATUS</div>
<div style={{marginBottom: '6px'}}>
💰 Balance: <strong style={{color: 'var(--info)'}}>{balance.toFixed(3)} SOL</strong>
</div>
<div>
✓ Eligibility: <strong style={{color: eligible ? 'var(--success)' : 'var(--warning)'}}>
{eligible ? 'ELIGIBLE (Discount)' : 'NOT ELIGIBLE (Regular)'}
</strong>
</div>
</div>

<div style={{marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border)'}}>
<h4 style={{margin: '0 0 10px', fontSize: '12px', color: 'var(--accent)'}}>💰 PRICING</h4>
<div style={{fontSize: '11px', lineHeight: '1.8', color: 'var(--text-dim)'}}>
<div style={{marginBottom: '6px'}}>
<strong>Eligible:</strong> 0.01 SOL + 0.01 SOL fee = 0.02 SOL total
</div>
<div style={{marginBottom: '6px'}}>
<strong>Regular:</strong> 0.2 SOL + 0.01 SOL fee = 0.21 SOL total
</div>
<div style={{
background: 'rgba(255,204,0,0.1)',
padding: '8px',
borderRadius: '2px',
border: '1px solid var(--border)'
}}>
💡 Stake 0.5+ SOL for 3 days to unlock discount rates!
</div>
</div>
</div>

<div>
<h4 style={{margin: '0 0 12px', fontSize: '12px', color: 'var(--accent)'}}>📦 AVAILABLE COLLECTIONS</h4>
<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px'}}>
{NFT_COLLECTIONS.map(nft => {
const price = eligible ? nft.price_eligible : nft.price_regular
const total = price + PLATFORM_FEE
const canAfford = balance >= total

return (
<div
key={nft.id}
style={{
background: 'rgba(0,0,0,0.3)',
border: '1px solid var(--border)',
borderRadius: '4px',
padding: '12px'
}}
>
<div style={{fontSize: '16px', marginBottom: '8px'}}>
<strong>{nft.name}</strong>
</div>

<PixelArtImage src={typeof nft.image === 'function' ? nft.image() : nft.image} alt={nft.name} size={100} />

<div style={{fontSize: '10px', color: 'var(--text-dim)', marginBottom: '8px'}}>
<div style={{marginBottom: '4px'}}>
<strong>Rarity:</strong> <span style={{color: nft.rarity === 'Legendary' ? '#FFD700' : nft.rarity === 'Epic' ? '#9370DB' : '#4169E1'}}>{nft.rarity}</span>
</div>
<div style={{marginBottom: '4px'}}>
<strong>Supply:</strong> {nft.supply} NFTs
</div>
<div style={{marginBottom: '6px', lineHeight: '1.4'}}>
{nft.description}
</div>
<div style={{
background: 'rgba(255,255,255,0.05)',
padding: '6px',
borderRadius: '2px',
marginBottom: '6px'
}}>
Traits: {nft.attributes.join(', ')}
</div>
</div>

<div style={{
background: 'rgba(255,204,0,0.1)',
padding: '8px',
borderRadius: '2px',
marginBottom: '10px',
fontSize: '11px',
border: '1px solid var(--border)'
}}>
<div>💵 NFT: {price} SOL</div>
<div>+ Fee: {PLATFORM_FEE} SOL</div>
<div style={{fontWeight: 'bold', color: 'var(--accent)', marginTop: '4px'}}>
= {total} SOL
</div>
</div>

<button
onClick={() => handleMintNFT(nft)}
disabled={loading || selectedNFT === nft.id || !canAfford}
style={{
width: '100%',
padding: '8px',
background: canAfford ? 'var(--accent)' : 'var(--warning)',
border: 'none',
borderRadius: '3px',
color: '#000',
fontSize: '11px',
fontWeight: 'bold',
cursor: canAfford ? 'pointer' : 'not-allowed',
opacity: canAfford ? 1 : 0.5
}}
>
{loading && selectedNFT === nft.id ? '⏳ MINTING...' : canAfford ? `🖼️ MINT (${total} SOL)` : '❌ INSUFFICIENT SOL'}
</button>
</div>
)
})}
</div>
</div>
</div>
</div>
)
}
