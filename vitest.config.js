// 📦 Módulos Node.js para manipulação de caminhos
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ✅ Importa a função de configuração principal do Vite (não apenas Vitest!)
import { defineConfig } from 'vite';

// 🧪 Plugin para executar testes com base nos arquivos do Storybook
import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';

// 🛠️ Corrige o uso de __dirname em módulos ES (ESM)
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

/**
 * 🔧 Arquivo de configuração do Vite com suporte a:
 * - Storybook + Vitest para testes automatizados em componentes
 * - Ignorar pastas desnecessárias no servidor de desenvolvimento
 */
export default defineConfig({
  // ⚙️ Configurações específicas para o servidor Vite (modo desenvolvimento)
  server: {
    watch: {
      /**
       * 🛡️ Evita que o Vite tente monitorar arquivos da virtualenv Python (venv),
       * o que causaria erros por permissão ou incompatibilidade.
       * Boa prática: manter o venv fora do diretório do frontend.
       */
      ignored: ['**/venv/**'],
    },
  },

  // ✅ Configuração de testes com Vitest + Storybook
  test: {
    workspace: [
      {
        extends: true,
        plugins: [
          /**
           * 🔍 Esse plugin executa testes baseados nas *stories* do Storybook.
           * Ideal para garantir que os componentes visuais funcionem corretamente.
           */
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          // ⚙️ Configura testes no navegador com Playwright
          browser: {
            enabled: true,     // Ativa testes no navegador
            headless: true,    // Executa sem abrir a interface (modo invisível)
            name: 'chromium',  // Navegador usado nos testes
            provider: 'playwright',
          },
          /**
           * 📄 Arquivo de setup onde você pode definir mocks, globalThis, etc.
           * Ex: importar bibliotecas de testes globais, mockar API, etc.
           */
          setupFiles: ['.storybook/vitest.setup.js'],
        },
      },
    ],
  },
});
