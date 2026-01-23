import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/pixel.css'

// Polyfill Buffer for browser environments (some libs expect Node Buffer)
import { Buffer } from 'buffer'
if (typeof window !== 'undefined' && !window.Buffer) {
	window.Buffer = Buffer
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
