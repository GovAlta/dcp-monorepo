import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Required: Import web components FIRST for GoA components to render
import '@abgov/web-components'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
