import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReExtProvider } from '@sencha/reext'
import './index.css'
import App from './App.jsx'

// ReExt Configuration
const ReExtData = {
  "sdkversion": "7.8.0",
  "toolkit": "classic",
  "theme": "material",
  "rtl": false,
  "locale": "en",
  "debug": false,
  "urlbase": "./",
  "location": "remote" // Using remote (CDN) - works with Vite plugin
}

// PASTE YOUR TRIAL KEY HERE (get from ReExt form on first load)
const reextkey = "your_reext_trial_key_here";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReExtProvider splash={true} ReExtData={ReExtData} reextkey={reextkey}>
      <App />
    </ReExtProvider>
  </StrictMode>,
)
