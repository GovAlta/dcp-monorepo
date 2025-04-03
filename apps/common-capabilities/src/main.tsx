import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@abgov/web-components';
import './scripts/loadGtag';
import './index.css';
import App from './App';

const root = document.getElementById('root')!;
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
