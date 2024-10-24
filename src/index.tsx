import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import * as serviceWorkerRegistration from './sw'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Aquí registramos el Service Worker para habilitar las funcionalidades de PWA
serviceWorkerRegistration.register()

// Si quieres medir el rendimiento de tu aplicación
reportWebVitals()
