// ============================================================================
// 📄 main.jsx – Entrada principal do projeto "O Bem Te Quer 💜"
// ============================================================================

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "./debug/ttsDevTools"; // src/main.jsx (ou src/index.jsx)
import './global.css'; // 🌍 Estilos globais

// 🚀 Monta a aplicação dentro do <div id="root">
const rootElement = document.getElementById('root');
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
