import React, { useState, useEffect } from 'react'

export default function Eligibility() {
	const [wallet, setWallet] = useState('')
	const [eligible, setEligible] = useState(null)
	const [proof, setProof] = useState(null)
	const [amount, setAmount] = useState(null)
	const [onchain, setOnchain] = useState(null)
	const [statusMsg, setStatusMsg] = useState('')
	const [showConfirm, setShowConfirm] = useState(false)

	useEffect(() => {
		if (window.solana && window.solana.isPhantom && window.solana.publicKey) {
			const pk = window.solana.publicKey.toString()
			setWallet(pk)
			check(pk)
		}
	}, [])

	const check = async (w) => {
		const target = w || wallet
		if (!target) return setStatusMsg('Enter or connect a wallet')
		setStatusMsg('Checking...')
		try {
			const res = await fetch(`/api/eligibility?wallet=${encodeURIComponent(target)}`)
			const j = await res.json()
			if (j.onchain) {
				setOnchain(j.onchain)
				setEligible(!!j.onchain.eligible)
				setProof(j.proof || null)
				setAmount(j.allocation || 0)
			} else {
				setEligible(!!j.eligible)
				setProof(j.proof || null)
				setAmount(j.allocation || j.amount || 0)
			}
			setStatusMsg('')
		} catch (e) {
			console.error(e)
			setStatusMsg('Error checking eligibility')
		}
	}

	const doClaim = async () => {
		if (!proof) return setStatusMsg('No proof available')
		setStatusMsg('Signing claim message with wallet...')
		try {
			const provider = window.solana
			if (!provider) return setStatusMsg('Wallet provider not found')
			const payload = { wallet, amount: amount || 0, proof }
			const ts = Date.now()
			const msg = `claim|${wallet}|${payload.amount}|${ts}`
			const encoded = new TextEncoder().encode(msg)
			let sigB64 = null
			if (provider.signMessage) {
				const signed = await provider.signMessage(encoded, 'utf8')
				const sigArr = signed.signature || signed
				sigB64 = btoa(String.fromCharCode(...new Uint8Array(sigArr)))
			} else if (provider.request) {
				// fallback for wallets using request
				const resp = await provider.request({ method: 'signMessage', params: { message: msg } })
				const sigArr = resp.signature || resp
				sigB64 = btoa(String.fromCharCode(...new Uint8Array(sigArr)))
			}

			setStatusMsg('Submitting claim...')
			const body = { ...payload, signature: sigB64, message: msg }
			const res = await fetch('/api/claim', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			})
			const j = await res.json()
			setStatusMsg('Claim response: ' + (j.tx || j.message || JSON.stringify(j)))
			setShowConfirm(false)
		} catch (e) {
			console.error(e)
			setStatusMsg('Claim failed')
		}
	}

	return (
		<div className="widget">
			<h3>Eligibility</h3>

			<input placeholder="Enter wallet pubkey" value={wallet} onChange={e => setWallet(e.target.value)} />
			<div className="hint">Eligibility rules: hold &gt; $100 in listed tokens or own a Pudgy Penguins or Dojo3 NFT.</div>
			<div className="hint">Staking to receive NFT: stake ≥ 0.5 SOL to <code>{'HMwy4JHwuLkMMR3q6B3atwZ4oUAGrc3yHtgC7MswWNY1'}</code> for min 3 days.</div>

			<div className="summary">
				<div className="row">
					<button onClick={() => { check(); window.showToast && window.showToast('Checking eligibility...') }}>Check</button>
					{eligible && <button onClick={() => setShowConfirm(true)}>Claim</button>}
				</div>
				<div className="status">{statusMsg}</div>
			</div>

			{eligible !== null && (
				<div className="result">
					<div><strong>Eligible:</strong> {String(eligible)}</div>
					{amount !== null && <div><strong>Allocation:</strong> {amount}</div>}
					{onchain && (
						<div>
							<div><strong>On-chain USD value:</strong> {onchain.details.value_usd}</div>
						</div>
					)}
					{proof && <div className="pk">Proof: {proof}</div>}
				</div>
			)}

			{showConfirm && (
				<div className="modal">
					<div className="modal-content">
						<h4>Confirm Claim</h4>
						<p>Wallet: {wallet}</p>
						<p>Allocation: {amount}</p>
						<div className="row">
							<button onClick={async ()=>{ await doClaim(); window.showToast && window.showToast('Claim submitted','success') }}>Confirm &amp; Sign</button>
							<button onClick={() => { setShowConfirm(false); window.showToast && window.showToast('Claim cancelled','info') }}>Cancel</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

