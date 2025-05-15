// vite.config.js
// Configuração do Vite para o projeto "O Bem Te Quer 🌻"
// Este arquivo define como o Vite deve rodar e compilar a aplicação React

/**
 * Importa a função defineConfig do Vite.
 * Ela ajuda a aplicar validações e sugestões de tipos no VS Code.
 */
import { defineConfig } from 'vite';

/**
 * Importa o plugin oficial para projetos React.
 * Permite usar JSX, Fast Refresh e outras funcionalidades do React.
 */
import react from '@vitejs/plugin-react';

/**
 * Exporta a configuração padrão do Vite usando defineConfig.
 */
export default defineConfig({
  // Lista de plugins a serem utilizados no build
  plugins: [react()],

  // Configuração do servidor de desenvolvimento local
  server: {
    port: 3000, // Porta onde o Vite vai rodar (http://localhost:3000)
    open: true  // Abre automaticamente o navegador ao rodar `npm run dev`
  },

  // Caminho base da aplicação (ajuste se for necessário para deploy)
  base: './'
});
