import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './styles/global.css'

// Initialize consent manager
if (typeof window !== 'undefined') {
  import('./utils/consent-manager.js').then(module => {
    const ConsentManager = module.default;
    const consentManager = new ConsentManager();
    consentManager.init();
    window.consentManager = consentManager;
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
