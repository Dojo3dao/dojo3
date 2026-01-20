import React, { useState, useEffect } from 'react'

export default function Admin() {
  const [status, setStatus] = useState(null)
  const [running, setRunning] = useState(false)

  async function fetchStatus() {
    try {
      const res = await fetch('/api/status')
      const j = await res.json()
      setStatus(j)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchStatus()
    const t = setInterval(fetchStatus, 5000)
    return () => clearInterval(t)
  }, [])

  async function trigger() {
    setRunning(true)
    try {
      const token = prompt('Enter ADMIN_TOKEN (for local test)')
      const headers = {}
      if (token) headers['Authorization'] = `Bearer ${token}`
      const res = await fetch('/api/admin/run', { method: 'POST', headers })
      const j = await res.json()
      if (window.showToast) window.showToast('Admin run completed','success')
      alert('Admin run output:\n' + (j.output || JSON.stringify(j)))
      await fetchStatus()
    } catch (e) {
      if (window.showToast) window.showToast('Admin run failed','error')
      alert('Run failed')
    }
    setRunning(false)
  }

  return (
    <div className="widget">
      <h3>Admin</h3>
      {status ? (
        <div>
          <div>Recipients: {status.recipients}</div>
          <div>Total allocated: {status.total_allocated}</div>
          <div>Claims: {status.claims}</div>
          <div>Total claimed: {status.total_claimed}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div className="row">
        <button onClick={trigger} disabled={running}>{running ? 'Running...' : 'Trigger Airdrop (admin)'}</button>
      </div>
    </div>
  )
}
