import React, { useState, useEffect } from 'react'

export default function Admin() {
  const [status, setStatus] = useState(null)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function fetchStatus() {
    try {
      setLoading(true)
      const res = await fetch('/api/status')
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      const j = await res.json()
      setStatus(j)
      setError(null)
    } catch (e) {
      console.error('Status fetch error:', e)
      setError('Failed to load status')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
    const t = setInterval(fetchStatus, 5000)
    return () => clearInterval(t)
  }, [])

  async function trigger() {
    setRunning(true)
    setError(null)
    try {
      const token = prompt('Enter ADMIN_TOKEN:')
      if (!token) {
        setRunning(false)
        return
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }

      const res = await fetch('/api/admin/run', { method: 'POST', headers })
      
      if (!res.ok) {
        const j = await res.json()
        throw new Error(j.detail || `Server error: ${res.status}`)
      }

      const j = await res.json()
      
      if (window.showToast) {
        window.showToast('Admin run completed successfully', 'success')
      }
      
      const output = j.output || j.message || JSON.stringify(j)
      alert(`Admin run output:\n\n${output.substring(0, 500)}${output.length > 500 ? '\n...(truncated)' : ''}`)
      
      // Refresh status after orchestrator runs
      await fetchStatus()
    } catch (e) {
      console.error('Admin run error:', e)
      const errorMsg = e.message || 'Admin run failed'
      setError(errorMsg)
      
      if (window.showToast) {
        window.showToast(`Admin run failed: ${errorMsg}`, 'error')
      }
      alert(`Error: ${errorMsg}`)
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="widget">
      <h3>Admin Dashboard</h3>
      
      {status ? (
        <div className="admin-stats">
          <div className="stat-row">
            <span className="stat-label">Recipients:</span>
            <span className="stat-value">{status.recipients}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Total Allocated:</span>
            <span className="stat-value">{status.total_allocated.toLocaleString()} DOJO</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Claims Made:</span>
            <span className="stat-value">{status.claims}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Total Claimed:</span>
            <span className="stat-value">{status.total_claimed.toLocaleString()} DOJO</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Progress:</span>
            <span className="stat-value">{status.claimed_percent || 0}%</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Remaining:</span>
            <span className="stat-value">{status.remaining?.toLocaleString() || 0} DOJO</span>
          </div>
          
          {status.staking_program && (
            <div className="stat-row">
              <span className="stat-label">Staking Program:</span>
              <code className="stat-value">{status.staking_program.substring(0, 8)}...</code>
            </div>
          )}
        </div>
      ) : (
        <div className="loading">{loading ? 'Loading status...' : 'No status available'}</div>
      )}
      
      {error && <div className="error-msg">{error}</div>}
      
      <div className="admin-actions">
        <button 
          onClick={trigger}
          disabled={running}
          className="btn btn-admin"
        >
          {running ? 'Running...' : '▶ Trigger Airdrop Distribution (Admin)'}
        </button>
        
        <button 
          onClick={fetchStatus}
          disabled={running || loading}
          className="btn btn-secondary"
        >
          {loading ? 'Refreshing...' : '↻ Refresh Status'}
        </button>
      </div>
    </div>
  )
}
