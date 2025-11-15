// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Ativa o plugin React (JSX, Fast Refresh etc.)

  resolve: {
    alias: {
      // Permite usar "@" como atalho para a pasta src
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    watch: {
      // Ignora o ambiente virtual Python e arquivos antigos
      ignored: [
        '**/venv/**',
        '**/arquivados/**',
        '**/node_modules/**'
      ],
    },
    port: 5173,      // Porta padrão (pode mudar se necessário)
    open: true,      // Abre automaticamente no navegador
  },
})
