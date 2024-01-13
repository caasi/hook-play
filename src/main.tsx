import React from 'react'
import ReactDOM from 'react-dom/client'
import { EffectContext } from './contexts'
import App from './App.tsx'
import * as effects from './hooks'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EffectContext.Provider value={effects}>
      <App />
    </EffectContext.Provider>
  </React.StrictMode>,
)
