// =====================================================================================
// 📄 vitest.config.js – Configuração de testes com Vitest + Storybook + Playwright
// Projeto: O Bem Te Quer 💜
// =====================================================================================

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';

// ✅ Garante o __dirname mesmo com ES Modules
const __dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url));

// ✅ Configuração principal
export default defineConfig({
  test: {
    workspace: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(__dirname, '.storybook'), // 🔍 Aponta para a config do Storybook
          }),
        ],
        test: {
          name: 'storybook', // 🧪 Nome do conjunto de testes
          browser: {
            enabled: true,
            headless: true,
            name: 'chromium',
            provider: 'playwright', // 🎭 Playwright para testes E2E em navegador
          },
          setupFiles: ['.storybook/vitest.setup.js'], // 🛠️ Arquivo de setup dos testes
        },
      },
    ],
  },
});
