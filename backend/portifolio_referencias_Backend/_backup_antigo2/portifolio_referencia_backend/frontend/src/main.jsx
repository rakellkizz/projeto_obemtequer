// src/main.jsx
// ------------------------------
// Ponto de entrada da aplicação "O Bem Te Quer"
// Responsável por inicializar o React e renderizar o componente raiz no DOM.
// ------------------------------

/**
 * Importa o React para uso do JSX e recursos do React.
 */
import React from 'react';

/**
 * Importa o ReactDOM Client, que possui métodos para montar a aplicação React no DOM.
 * ReactDOM.createRoot é a API recomendada para React 18+.
 */
import ReactDOM from 'react-dom/client';

/**
 * Importa o componente raiz da aplicação.
 * Este componente representa toda a interface e lógica do app.
 */
import App from './App'; // Corrigido para o padrão correto com A maiúsculo

/**
 * Importa os estilos globais da aplicação.
 * Contém reset.css, variáveis CSS, tipografia e estilos base.
 * Caso não possua este arquivo, pode remover esta linha.
 */
import './styles/global.css';

/**
 * Obtém a referência do elemento HTML onde o React irá montar a aplicação.
 * Esse elemento deve existir no arquivo index.html e normalmente tem id="root".
 */
const rootElement = document.getElementById('root');

/**
 * Cria a raiz React para o elemento rootElement.
 * React 18+ usa createRoot para melhor performance e suporte a recursos modernos.
 */
const root = ReactDOM.createRoot(rootElement);

/**
 * Renderiza o componente App dentro do modo estrito do React.
 * React.StrictMode ativa verificações extras para desenvolvimento e boas práticas.
 */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
