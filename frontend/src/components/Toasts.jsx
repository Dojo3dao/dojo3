import React, { useState, useEffect } from 'react'

export default function Toasts(){
  const [toasts, setToasts] = useState([])

  useEffect(()=>{
    // expose simple global API: window.showToast(msg, type)
    window.showToast = (msg, type='info') => {
      const id = Date.now() + Math.random()
      setToasts(t => [...t, { id, msg, type }])
      // auto remove
      setTimeout(()=> setToasts(t => t.filter(x => x.id !== id)), 4000)
    }
    return ()=> { window.showToast = undefined }
  }, [])

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.msg}
        </div>
      ))}
    </div>
  )
}
