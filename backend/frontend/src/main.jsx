// main.jsx
// Ponto de entrada da aplicação "O Bem Te Quer"
// Responsável por inicializar o React e renderizar o componente raiz no DOM.

/**
 * Importação principal do React para usar JSX e funcionalidades do React.
 */
import React from 'react';

/**
 * Importação do ReactDOM Client, que contém métodos para montar a aplicação React no DOM.
 * ReactDOM.createRoot é a nova API recomendada para montar apps React 18+.
 */
import ReactDOM from 'react-dom/client';

/**
 * Importação do componente raiz da aplicação.
 * Este componente representa toda a interface e lógica do app.
 */
import App from './app';

/**
 * Importação dos estilos globais da aplicação.
 * Pode conter reset.css, variáveis CSS, tipografia e estilos base.
 * Caso não possua, pode remover esta linha.
 */
import './styles/global.css';

/**
 * Obtém a referência para o elemento HTML onde o React irá montar a aplicação.
 * Este elemento deve existir no arquivo index.html e normalmente tem id="root".
 */
const rootElement = document.getElementById('root');

/**
 * Cria a raiz React para o elemento rootElement.
 * React 18+ usa createRoot para melhor performance e suporte a recursos modernos.
 */
const root = ReactDOM.createRoot(rootElement);

/**
 * Renderiza o componente App dentro do modo estrito do React.
 * React.StrictMode ativa verificações adicionais para desenvolvimento e melhores práticas.
 */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
