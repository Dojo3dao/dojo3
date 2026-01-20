import React, { useState, useEffect } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL, Transaction } from '@solana/web3.js'

const SITE_CREATION_FEE = 0.5 // SOL
const SITE_MAINTENANCE_FEE = 0.1 // SOL monthly
const TREASURY_ADDRESS = '8pSyRMP7R5qDU5BTqR93rESA1R2h5jH6hdPRjXmjnj8u'

export default function SiteManager() {
	const wallet = useWallet()
	const { publicKey, connected, sendTransaction } = wallet
	const { connection } = useConnection()

	const [sites, setSites] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [status, setStatus] = useState('')
	const [balance, setBalance] = useState(0)
	const [showCreateForm, setShowCreateForm] = useState(false)
	const [newSiteData, setNewSiteData] = useState({
		name: '',
		description: '',
		template: 'classic',
		color: '#4ECDC4'
	})
	const [selectedSite, setSelectedSite] = useState(null)
	const [creatingPayment, setCreatingPayment] = useState(false)

	// Load balance and sites
	useEffect(() => {
		if (publicKey && connected) {
			loadBalance()
			loadUserSites()
		}
	}, [publicKey, connected])

	const loadBalance = async () => {
		try {
			const lamports = await connection.getBalance(publicKey)
			setBalance((lamports / LAMPORTS_PER_SOL).toFixed(3))
		} catch (e) {
			console.error('Balance load error:', e)
		}
	}

	const loadUserSites = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/sites?wallet=${publicKey.toString()}`
			)
			if (response.ok) {
				const data = await response.json()
				setSites(data.sites || [])
			}
		} catch (e) {
			console.error('Sites load error:', e)
		}
	}

	const handleCreateSite = async (e) => {
		e.preventDefault()

		if (!newSiteData.name.trim()) {
			setError('Site name is required')
			return
		}

		if (balance < SITE_CREATION_FEE) {
			setError(`Insufficient balance required: ${SITE_CREATION_FEE} SOL`)
			return
		}

		setCreatingPayment(true)
		setError(null)
		setStatus('🔐 Processing payment...')

		try {
			const { blockhash } = await connection.getLatestBlockhash()
			const treasuryPubkey = new PublicKey(TREASURY_ADDRESS)

			const instruction = SystemProgram.transfer({
				fromPubkey: publicKey,
				toPubkey: treasuryPubkey,
				lamports: Math.floor(SITE_CREATION_FEE * LAMPORTS_PER_SOL),
			})

			const transaction = new Transaction({
				recentBlockhash: blockhash,
				feePayer: publicKey,
			})
			transaction.add(instruction)

			setStatus('✍️ Requesting wallet signature...')
			const txid = await sendTransaction(transaction, connection)

			setStatus('⏳ Confirming transaction...')
			const confirmation = await connection.confirmTransaction(txid, 'confirmed')

			if (confirmation.value.err) {
				throw new Error('Payment confirmation failed on-chain')
			}

			// Save site to backend
			const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
			const siteResponse = await fetch(`${apiUrl}/api/sites/create`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					wallet: publicKey.toString(),
					name: newSiteData.name,
					description: newSiteData.description,
					template: newSiteData.template,
					color: newSiteData.color,
					txid: txid,
					timestamp: new Date().toISOString()
				})
			})

			if (!siteResponse.ok) {
				throw new Error('Failed to save site')
			}

			const siteData = await siteResponse.json()
			const username = publicKey.toString().slice(0, 8).toLowerCase()
			const siteUrl = `http://${username}.dojo3`

			setStatus(`✅ Site created successfully!\n🌐 Link: ${siteUrl}`)
			setNewSiteData({ name: '', description: '', template: 'classic', color: '#4ECDC4' })
			setShowCreateForm(false)

			window.showToast?.('✓ Site created successfully!', 'success')

			setTimeout(() => {
				loadBalance()
				loadUserSites()
				setStatus('')
			}, 2000)

		} catch (err) {
			const msg = err?.message || 'Failed to create site'
			setError(msg)
			setStatus('')
			window.showToast?.(`✗ ${msg}`, 'error')
		} finally {
			setCreatingPayment(false)
		}
	}

	const handleRenewSite = async (siteId) => {
		if (balance < SITE_MAINTENANCE_FEE) {
			setError(`Insufficient balance required: ${SITE_MAINTENANCE_FEE} SOL`)
			return
		}

		setCreatingPayment(true)
		setError(null)
		setStatus('🔄 Renewing site...')

		try {
			const { blockhash } = await connection.getLatestBlockhash()
			const treasuryPubkey = new PublicKey(TREASURY_ADDRESS)

			const instruction = SystemProgram.transfer({
				fromPubkey: publicKey,
				toPubkey: treasuryPubkey,
				lamports: Math.floor(SITE_MAINTENANCE_FEE * LAMPORTS_PER_SOL),
			})

			const transaction = new Transaction({
				recentBlockhash: blockhash,
				feePayer: publicKey,
			})
			transaction.add(instruction)

			const txid = await sendTransaction(transaction, connection)
			const confirmation = await connection.confirmTransaction(txid, 'confirmed')

			if (confirmation.value.err) {
				throw new Error('Failed to renew site')
			}

			// Update site renewal on backend
			const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
			await fetch(`${apiUrl}/api/sites/renew`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					site_id: siteId,
					wallet: publicKey.toString(),
					txid: txid,
					timestamp: new Date().toISOString()
				})
			})

			setStatus(`✅ Site renewed successfully!`)
			window.showToast?.('✓ Site renewed!', 'success')

			setTimeout(() => {
				loadBalance()
				loadUserSites()
				setStatus('')
			}, 2000)

		} catch (err) {
			const msg = err?.message || 'Renewal failed'
			setError(msg)
			setStatus('')
			window.showToast?.(`✗ ${msg}`, 'error')
		} finally {
			setCreatingPayment(false)
		}
	}

	const handleDeleteSite = async (siteId) => {
		if (!confirm('Are you sure you want to permanently delete this site?')) return

		try {
			const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
			const response = await fetch(`${apiUrl}/api/sites/delete`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					site_id: siteId,
					wallet: publicKey.toString()
				})
			})

			if (!response.ok) {
				throw new Error('Failed to delete site')
			}

			window.showToast?.('✓ Site deleted', 'success')
			loadUserSites()

		} catch (err) {
			window.showToast?.(`✗ ${err.message}`, 'error')
		}
	}

	if (!connected) {
		return (
			<div className="widget">
				<h3>🌐 SITE MANAGER</h3>
				<div className="warning">
					Connect your wallet to create and manage your personal site
				</div>
			</div>
		)
	}

	return (
		<div className="widget">
			<h3>🌐 SITE MANAGER</h3>

			{error && <div className="error-banner">{error}</div>}
			{status && <div className="status" style={{whiteSpace: 'pre-wrap'}}>{status}</div>}

			{/* Balance Info */}
			<div style={{
				background: 'rgba(0,170,255,0.1)',
				padding: '12px',
				borderRadius: '3px',
				marginBottom: '16px',
				fontSize: '11px'
			}}>
				<div style={{color: 'var(--text-dim)', marginBottom: '6px'}}>💰 BALANCE</div>
				<div style={{fontSize: '14px', fontWeight: 'bold', color: 'var(--info)', marginBottom: '6px'}}>
					{balance} SOL
				</div>
				<div style={{fontSize: '9px', color: 'var(--text-dim)', lineHeight: '1.5'}}>
					<div>💳 Create Site: {SITE_CREATION_FEE} SOL</div>
					<div>📅 Monthly Renewal: {SITE_MAINTENANCE_FEE} SOL</div>
				</div>
			</div>

			{/* Create Form */}
			{showCreateForm ? (
				<form onSubmit={handleCreateSite} style={{marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border)'}}>
				<h4 style={{margin: '0 0 10px', fontSize: '12px', color: 'var(--accent)'}}>📝 CREATE NEW SITE</h4>

				<input
					type="text"
					placeholder="Site Name"
						value={newSiteData.name}
						onChange={(e) => setNewSiteData({...newSiteData, name: e.target.value})}
						style={{
							width: '100%',
							padding: '8px',
							marginBottom: '10px',
							border: '1px solid var(--border)',
							borderRadius: '3px',
							background: 'rgba(0,0,0,0.2)',
							color: 'inherit',
							fontSize: '11px'
						}}
					/>

					<textarea
					placeholder="Site Description"
						value={newSiteData.description}
						onChange={(e) => setNewSiteData({...newSiteData, description: e.target.value})}
						style={{
							width: '100%',
							padding: '8px',
							marginBottom: '10px',
							border: '1px solid var(--border)',
							borderRadius: '3px',
							background: 'rgba(0,0,0,0.2)',
							color: 'inherit',
							fontSize: '11px',
							resize: 'vertical',
							minHeight: '60px'
						}}
					/>

					<select
						value={newSiteData.template}
						onChange={(e) => setNewSiteData({...newSiteData, template: e.target.value})}
						style={{
							width: '100%',
							padding: '8px',
							marginBottom: '10px',
							border: '1px solid var(--border)',
							borderRadius: '3px',
							background: 'rgba(0,0,0,0.2)',
							color: 'inherit',
							fontSize: '11px'
						}}
					>
					<option value="classic">⚡ Classic Template</option>
					<option value="modern">🎨 Modern Template</option>
					<option value="minimal">📱 Minimal Template</option>
					<option value="gaming">🎮 Gaming Template</option>
					</select>

					<div style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
						<input
							type="color"
							value={newSiteData.color}
							onChange={(e) => setNewSiteData({...newSiteData, color: e.target.value})}
							style={{width: '50px', height: '36px', border: 'none', borderRadius: '3px', cursor: 'pointer'}}
						/>
						<div style={{flex: 1, padding: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '3px', fontSize: '11px'}}>
							Primary Color: {newSiteData.color}
						</div>
					</div>

					<div style={{
						background: 'rgba(255,204,0,0.1)',
						padding: '10px',
						borderRadius: '3px',
						marginBottom: '10px',
						fontSize: '10px',
						border: '1px solid var(--border)'
					}}>
					<strong>💰 Fee:</strong>
					<div>{SITE_CREATION_FEE} SOL will be transferred to treasury</div>
					</div>

					<div style={{display: 'flex', gap: '10px'}}>
						<button
							type="submit"
							disabled={creatingPayment}
							style={{
								flex: 1,
								padding: '8px',
								background: 'var(--accent)',
								border: 'none',
								borderRadius: '3px',
								color: '#000',
								fontWeight: 'bold',
								fontSize: '11px',
								cursor: creatingPayment ? 'not-allowed' : 'pointer',
								opacity: creatingPayment ? 0.5 : 1
							}}
						>
							{creatingPayment ? '⏳ Processing...' : '✨ CREATE SITE'}
						</button>
						<button
							type="button"
							onClick={() => setShowCreateForm(false)}
							style={{
								flex: 1,
								padding: '8px',
								background: 'rgba(255,255,255,0.1)',
								border: '1px solid var(--border)',
								borderRadius: '3px',
								color: 'inherit',
								fontSize: '11px',
								cursor: 'pointer'
							}}
						>
							CANCEL
						</button>
					</div>
				</form>
			) : (
				<button
					onClick={() => setShowCreateForm(true)}
					style={{
						width: '100%',
						padding: '10px',
						background: 'var(--accent)',
						border: 'none',
						borderRadius: '3px',
						color: '#000',
						fontWeight: 'bold',
						fontSize: '12px',
						cursor: 'pointer',
						marginBottom: '16px'
					}}
				>
					➕ CREATE NEW SITE
				</button>
			)}

			{/* Sites List */}
			{sites.length > 0 ? (
				<div>
					<h4 style={{margin: '0 0 10px', fontSize: '12px', color: 'var(--accent)'}}>📋 YOUR SITES</h4>
					{sites.map((site) => (
						<div
							key={site.id}
							style={{
								background: 'rgba(0,0,0,0.3)',
								padding: '12px',
								borderRadius: '3px',
								marginBottom: '10px',
								border: `2px solid ${site.color}`
							}}
						>
							<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px'}}>
								<div>
									<div style={{fontSize: '13px', fontWeight: 'bold', color: site.color}}>
										{site.name}
									</div>
									<div style={{fontSize: '9px', color: 'var(--text-dim)', marginTop: '4px'}}>
										{site.description}
									</div>
								</div>
								<div style={{fontSize: '11px', color: 'var(--text-dim)', textAlign: 'right'}}>
									📅 {site.template}
								</div>
							</div>

							<div style={{
								background: 'rgba(255,255,255,0.05)',
								padding: '8px',
								borderRadius: '2px',
								marginBottom: '10px',
								fontSize: '9px',
								fontFamily: 'monospace',
								wordBreak: 'break-all'
							}}>
								🔗 {window.location.origin}/sites/{site.id}
							</div>

							<div style={{display: 'flex', gap: '8px'}}>
								<button
									onClick={() => window.open(`/sites/${site.id}`, '_blank')}
									style={{
										flex: 1,
										padding: '6px',
										background: 'rgba(76,205,196,0.2)',
										border: '1px solid var(--border)',
										borderRadius: '2px',
										color: 'inherit',
										fontSize: '10px',
										cursor: 'pointer'
									}}
								>
									👁️ VIEW
								</button>
								<button
									onClick={() => handleRenewSite(site.id)}
									style={{
										flex: 1,
										padding: '6px',
										background: 'rgba(255,204,0,0.2)',
										border: '1px solid var(--border)',
										borderRadius: '2px',
										color: 'inherit',
										fontSize: '10px',
										cursor: 'pointer'
									}}
								>
									🔄 RENEW
								</button>
								<button
									onClick={() => handleDeleteSite(site.id)}
									style={{
										flex: 1,
										padding: '6px',
										background: 'rgba(255,0,0,0.2)',
										border: '1px solid var(--border)',
										borderRadius: '2px',
										color: 'inherit',
										fontSize: '10px',
										cursor: 'pointer'
									}}
								>
									🗑️ DELETE
								</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<div style={{
					background: 'rgba(100,100,100,0.1)',
					padding: '16px',
					borderRadius: '3px',
					textAlign: 'center',
					fontSize: '11px',
					color: 'var(--text-dim)'
				}}>
					No sites created yet
					<br/>
					Start now and create your first site! 🚀
				</div>
			)}
		</div>
	)
}
