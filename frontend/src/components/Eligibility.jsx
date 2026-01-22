import React, { useState, useEffect } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'

export default function Eligibility() {
	const { publicKey, signMessage, connected } = useWallet()
	const { connection } = useConnection()
	const [eligible, setEligible] = useState(null)
	const [amount, setAmount] = useState(null)
	const [statusMsg, setStatusMsg] = useState('')
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [claiming, setClaiming] = useState(false)
	const [success, setSuccess] = useState(null)
	const [details, setDetails] = useState(null)
	const [proof, setProof] = useState(null)
	const [onchainData, setOnchainData] = useState(null)
	const [balance, setBalance] = useState(null)

	// Auto-check when wallet connects
	useEffect(() => {
		if (publicKey && connected) {
			checkBalance()
			checkEligibility(publicKey.toString())
		}
	}, [publicKey, connected])

	const checkBalance = async () => {
		try {
			const lamports = await connection.getBalance(publicKey)
			setBalance((lamports / 1e9).toFixed(2))
		} catch (e) {
			console.error('Balance check error:', e)
		}
	}

	const checkEligibility = async (wallet) => {
		if (!wallet) {
			setError('Please connect wallet')
			return
		}

		setLoading(true)
		setError(null)
		setStatusMsg('🔍 Checking on-chain eligibility...')
		setSuccess(null)
		setDetails(null)
		setOnchainData(null)

		try {
			// Call real backend API
			const response = await fetch(
				`http://localhost:8000/api/eligibility?wallet=${encodeURIComponent(wallet)}`,
				{ method: 'GET' }
			)

			if (!response.ok) {
				throw new Error(`Server error: ${response.status}`)
			}

			const data = await response.json()

			if (data.eligible) {
				setEligible(true)
				setAmount(data.allocation || 0)
				setDetails(data)
				if (data.proof) setProof(data.proof)
				
				// Store on-chain details if available
				if (data.onchain) {
					setOnchainData(data.onchain)
				}

				const reason = data.onchain?.reason?.[0] === 'nft_owned' ? 'NFT Holdings' : 
							   data.onchain?.reason?.[0] === 'token_value' ? 'Token Value' : 
							   'Allocation List'
				
				setStatusMsg(`✓ ELIGIBLE!\n📊 Reason: ${reason}\n💰 Value: $${data.onchain?.details?.value_usd?.toFixed(2) || 'N/A'}`)
				window.showToast?.(`✓ Wallet is eligible!`, 'success')
			} else {
				setEligible(false)
				setAmount(0)
				setStatusMsg('✗ Not eligible for this airdrop')
				window.showToast?.('Not eligible', 'info')
			}
		} catch (err) {
			const msg = err.message || 'Failed to check eligibility'
			setError(msg)
			setStatusMsg('')
			console.error('Eligibility check error:', err)
			window.showToast?.(`✗ ${msg}`, 'error')
		} finally {
			setLoading(false)
		}
	}

	const handleCheck = (e) => {
		e.preventDefault()
		if (publicKey) {
			checkBalance()
			checkEligibility(publicKey.toString())
		}
	}

	const handleClaim = async () => {
		if (!publicKey || !signMessage || !eligible || amount === null) {
			setError('Missing required data or wallet')
			return
		}

		setClaiming(true)
		setError(null)
		setStatusMsg('📝 Requesting wallet signature...')

		try {
			const message = `claim|${publicKey.toString()}|${amount}|${Date.now()}`
			const messageBytes = new TextEncoder().encode(message)

			const signature = await signMessage(messageBytes)
			const signatureB64 = Buffer.from(signature).toString('base64')

			setStatusMsg('⏳ Submitting claim to blockchain...')

			const referrer = localStorage.getItem('dojo3_referrer') || null
			const response = await fetch('http://localhost:8000/api/claim', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					wallet: publicKey.toString(),
					amount,
					proof: proof,
					signature: signatureB64,
					message,
					referrer: referrer,
				}),
			})

			if (!response.ok) {
				const err = await response.json()
				throw new Error(err.detail || 'Claim failed')
			}

			setSuccess(`✓ Claimed ${amount} DOJO tokens!`)
			setStatusMsg('')
			setEligible(false)
			window.showToast?.(`✓ Claimed ${amount} tokens!`, 'success')
		} catch (err) {
			const msg = err.message || 'Claim failed'
			setError(msg)
			setStatusMsg('')
			console.error('Claim error:', err)
			window.showToast?.(`✗ ${msg}`, 'error')
		} finally {
			setClaiming(false)
		}
	}

	if (!connected) {
		return (
			<div className="widget">
				<h3>📋 CHECK ELIGIBILITY</h3>
				<div className="warning">
					Connect your wallet to check eligibility for the airdrop
				</div>
			</div>
		)
	}

	return (
		<div className="widget">
			<h3>📋 CHECK ELIGIBILITY</h3>

			{error && <div className="error-banner">{error}</div>}
			{success && <div className="success-msg">{success}</div>}

			{/* Wallet Info */}
			<div style={{
				background: 'rgba(0,170,255,0.1)',
				padding: '10px',
				borderRadius: '3px',
				marginBottom: '12px',
				fontSize: '10px'
			}}>
				<div style={{color: 'var(--text-dim)', marginBottom: '4px'}}>WALLET ADDRESS</div>
				<div style={{fontSize: '9px', fontFamily: 'monospace', wordBreak: 'break-all', marginBottom: '6px', color: 'var(--info)'}}>
					{publicKey?.toString().slice(0, 16)}...{publicKey?.toString().slice(-10)}
				</div>
				{balance && (
					<div style={{color: 'var(--success)'}}>
						💰 SOL Balance: {balance} SOL
					</div>
				)}
			</div>

			<form onSubmit={handleCheck}>
				<button
					type="submit"
					className={`btn btn-primary ${loading ? 'btn-loading' : ''}`}
					disabled={!publicKey || loading || claiming}
					style={{width: '100%', marginBottom: '0'}}
				>
					{loading ? '⏳ CHECKING...' : '🔍 CHECK ELIGIBILITY'}
				</button>
			</form>

			{statusMsg && (
				<div className="status" style={{whiteSpace: 'pre-wrap'}}>
					{statusMsg}
				</div>
			)}

			{/* On-Chain Details */}
			{eligible && onchainData && (
				<div style={{marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)'}}>
					<h4 style={{margin: '0 0 10px', fontSize: '11px', color: 'var(--accent)'}}>📊 ON-CHAIN DETAILS</h4>
					
					{/* Tokens */}
					{onchainData.details?.tokens?.length > 0 && (
						<div style={{marginBottom: '12px', fontSize: '10px'}}>
							<div style={{color: 'var(--text-dim)', marginBottom: '6px'}}>🪙 TOKENS HELD:</div>
							{onchainData.details.tokens.map((t, i) => (
								<div key={i} style={{
									background: 'rgba(0,0,0,0.2)',
									padding: '6px',
									borderRadius: '2px',
									marginBottom: '4px',
									fontSize: '9px'
								}}>
									<div style={{fontFamily: 'monospace', color: 'var(--info)'}}>
										{t.mint.slice(0, 8)}...
									</div>
									<div>Balance: {parseFloat(t.balance).toFixed(2)}</div>
									{t.price && <div>Price: ${t.price}</div>}
									{t.value && <div style={{color: 'var(--success)', fontWeight: 'bold'}}>Value: ${parseFloat(t.value).toFixed(2)}</div>}
								</div>
							))}
						</div>
					)}
					
					{/* NFTs */}
					{onchainData.details?.nfts?.length > 0 && (
						<div style={{marginBottom: '12px', fontSize: '10px'}}>
							<div style={{color: 'var(--text-dim)', marginBottom: '6px'}}>🖼️ NFTs HELD:</div>
							{onchainData.details.nfts.map((n, i) => (
								<div key={i} style={{
									background: n.owns ? 'rgba(0,221,136,0.1)' : 'rgba(255,0,0,0.1)',
									padding: '6px',
									borderRadius: '2px',
									marginBottom: '4px',
									fontSize: '9px',
									borderLeft: `2px solid ${n.owns ? 'var(--success)' : 'var(--warning)'}`
								}}>
									<div style={{fontFamily: 'monospace', color: 'var(--info)'}}>
										{n.mint.slice(0, 8)}...
									</div>
									<div style={{color: n.owns ? 'var(--success)' : 'var(--warning)'}}>
										{n.owns ? '✓ OWNED' : '✗ NOT OWNED'}
									</div>
								</div>
							))}
						</div>
					)}
					
					{/* Total Value */}
					<div style={{
						background: 'rgba(255,204,0,0.1)',
						padding: '8px',
						borderRadius: '2px',
						borderLeft: '2px solid var(--accent)',
						fontSize: '10px'
					}}>
						<div style={{color: 'var(--text-dim)', marginBottom: '4px'}}>TOTAL VALUE</div>
						<div style={{fontSize: '14px', fontWeight: 'bold', color: 'var(--accent)'}}>
							${(onchainData.details?.value_usd || 0).toFixed(2)} USD
						</div>
					</div>
				</div>
			)}

			{eligible && !success && (
				<div style={{marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)'}}>
					<div style={{
						background: 'rgba(0,221,136,0.1)',
						padding: '12px',
						borderRadius: '3px',
						marginBottom: '12px',
						fontSize: '11px'
					}}>
						<div style={{color: 'var(--text-dim)', marginBottom: '6px', letterSpacing: '0.5px'}}>✓ ELIGIBLE - AIRDROP ALLOCATION</div>
						<div style={{fontSize: '18px', fontWeight: 'bold', color: 'var(--success)'}}>
							{amount} DOJO
						</div>
					</div>

					<button
						onClick={handleClaim}
						className={`btn btn-primary ${claiming ? 'btn-loading' : ''}`}
						disabled={claiming}
						style={{width: '100%', marginBottom: '0'}}
					>
						{claiming ? '⏳ CLAIMING...' : '🎁 CLAIM TOKENS'}
					</button>
				</div>
			)}

			{eligible === false && (
				<div style={{marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)'}}>
					<div className="warning">
						<strong>✗ Not Eligible</strong>
						<br/>
						This wallet doesn't qualify yet. To become eligible:
						<ul style={{margin: '8px 0 0 20px', fontSize: '10px', lineHeight: '1.6'}}>
							<li>Hold monitored tokens worth $100+ USD</li>
							<li>Hold eligible NFT collections</li>
							<li>Stake 0.5+ SOL for 3+ days</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	)
}
