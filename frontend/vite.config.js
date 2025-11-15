// ====================================================================================
// 📁 vite.config.js – Configuração COMPLETA + COMENTADA 💜
// Projeto O Bem Te Quer – PWA + React + Vercel + Cache + Offline
// ====================================================================================

// 🔧 Importações principais do Vite e plugins
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Esses dois abaixo permitem usar "__dirname" em projetos ES Modules (type: module)
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Correção obrigatória: "__dirname" não existe em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ====================================================================================
// 📦 EXPORTAÇÃO PRINCIPAL DO VITE
// ====================================================================================
export default defineConfig({

  // =======================================================================
  // 🌍 BASE DO PROJETO
  // -----------------------------------------------------------------------
  // ❗ IMPORTANTE: para o Vercel evitar erro 404, a base deve ser VAZIA.
  // Se colocar "/", o Vercel trata como rota absoluta e gera tela branca.
  // =======================================================================
  base: "",

  // =======================================================================
  // 🔌 PLUGINS DO VITE (React + PWA)
  // =======================================================================
  plugins: [

    // Suporte ao JSX, atualização rápida e toda base do React
    react(),

    // Configuração COMPLETA da PWA (offline + cache + ícones + manifest)
    VitePWA({

      // Atualiza o service worker automaticamente ao fazer deploy
      registerType: 'autoUpdate',

      // Arquivos que entram no bundle final e podem ser cacheados
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'icon-192.png',
        'icon-512.png',
        'offline.html',
        'logo_obemtequer.png',
      ],

      // Manifesto da aplicação (nome, ícone, comportamento de instalação)
      manifest: {
        name: 'O Bem Te Quer',
        short_name: 'BemTeQuer',
        description: 'Acolhimento com amor 💜',
        theme_color: '#6D28D9',       // Cor da barra do app instalado
        start_url: '/',               // Inicio ao abrir
        display: 'standalone',        // Remove barra do navegador

        // Ícones da PWA
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },

      // Permite testar PWA localmente (npm run dev)
      devOptions: {
        enabled: true,
      },

      // ===================================================================
      // 🤖 CONFIGURAÇÃO DO WORKBOX (cache + offline inteligente)
      // ===================================================================
      workbox: {

        // Aceitar arquivos grandes (ex: papel de parede com +2MB)
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB

        // Página usada quando o usuário estiver offline e tentar navegar
        navigateFallback: 'offline.html',

        // Extensões que entram no pré-cache
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],

        // Estratégias de cache
        runtimeCaching: [

          // 📸 IMAGENS → Cache First (pega do cache se existir)
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'imagens',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 dias
              },
            },
          },

          // 📄 HTML, CSS, JS → Network First (tenta rede primeiro)
          {
            urlPattern: ({ request }) =>
              ['style', 'script', 'document'].includes(request.destination),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'arquivos-dinamicos',
            },
          },
        ],
      },
    }),
  ],

  // =======================================================================
  // 🔧 CONFIGURAÇÃO DO SERVIDOR LOCAL (npm run dev)
  // =======================================================================
  server: {
    port: 3000,
    open: true, // abre o navegador automaticamente

    // Rota /api será redirecionada ao backend
    proxy: {
      '/api': 'http://localhost:5000',
    },

    // Correção de hot reload em Windows
    watch: {
      usePolling: true,
      ignored: [
        '**/venv/**',
        '**/portifolio_referencia_frontend/**',
      ],
    },
  },

  // =======================================================================
  // 🏗️ BUILD (onde o Vercel vai procurar pelo projeto compilado)
  // =======================================================================
  build: {
    outDir: 'dist',     // Pasta final do build
    emptyOutDir: true,  // Limpa pasta antes de gerar novo build
  },

  // =======================================================================
  // 🎯 OTIMIZAÇÃO (caso você importe libs que não são para browser)
  // =======================================================================
  optimizeDeps: {
    exclude: ['scipy', 'numpy'], // <- Evita crash no navegador
  },

  // =======================================================================
  // 🧭 ALIAS PARA IMPORTS (ex: "@/components/Button")
  // =======================================================================
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  // =======================================================================
  // 🔊 PERMITIR IMPORTAÇÃO DE ARQUIVOS MP3
  // =======================================================================
  assetsInclude: ['**/*.mp3'],

  // =======================================================================
  // 🧹 NÃO APAGAR O TERMINAL A CADA REFRESH (útil pra debug)
  // =======================================================================
  clearScreen: false,
});

// ====================================================================================
// 📁 FIM DO ARQUIVO – TODO COMENTADO E OTIMIZADO 💜
// ====================================================================================
