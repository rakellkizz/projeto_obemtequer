// -------------------------------------------
// ARQUIVO: frontend/src/index.js
// -------------------------------------------
// Ponto de entrada principal da aplicação React.
// Renderiza o componente <App /> dentro da <div id="root">
// -------------------------------------------

import React from 'react';                      // Biblioteca principal do React
import ReactDOM from 'react-dom/client';        // React 18+ usa createRoot
import App from './App';                        // Componente principal da aplicação
import './index.css';                           // Estilo global (opcional)

const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente <App /> dentro da div com id="root" no HTML
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
