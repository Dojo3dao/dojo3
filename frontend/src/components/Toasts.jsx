import React, { useState, useEffect } from 'react'

export default function Toasts(){
  const [toasts, setToasts] = useState([])

  useEffect(()=>{
    // Expose global API: window.showToast(msg, type='info')
    window.showToast = (msg, type='info') => {
      const id = Date.now() + Math.random()
      
      // Validate type
      const validTypes = ['info', 'success', 'error', 'warning']
      const finalType = validTypes.includes(type) ? type : 'info'
      
      setToasts(t => [...t, { id, msg, type: finalType }])
      
      // Auto-dismiss after 4 seconds
      setTimeout(()=> {
        setToasts(t => t.filter(x => x.id !== id))
      }, 4000)
    }
    
    return ()=> { 
      window.showToast = undefined 
    }
  }, [])

  const removeToast = (id) => {
    setToasts(t => t.filter(x => x.id !== id))
  }

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div 
          key={t.id} 
          className={`toast toast-${t.type}`}
          onClick={() => removeToast(t.id)}
          role="alert"
        >
          <span className="toast-content">{t.msg}</span>
          <button 
            className="toast-close"
            onClick={(e) => {
              e.stopPropagation()
              removeToast(t.id)
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
