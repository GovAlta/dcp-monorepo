import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@abgov/design-tokens/dist/tokens.css';
import '@abgov/web-components/index.css';
import './index.css'
import App from './App'

const root = document.getElementById('root')!;
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
