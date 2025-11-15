/**
 * @type { import('@storybook/react-vite').StorybookConfig }
 *
 * 🎯 Configuração principal do Storybook usando React com Vite.
 * Esta configuração define:
 * - Onde estão os arquivos de histórias (stories)
 * - Quais addons o Storybook deve usar
 * - Integração com o framework React via Vite
 * - Ajustes para evitar que o Vite fique observando a pasta 'venv'
 */

const config = {
  // 📚 Define os arquivos que o Storybook irá carregar como histórias de componentes
  stories: [
    "../src/**/*.mdx",                            // Histórias no formato MDX (Markdown + JSX)
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"    // Histórias em JavaScript, TypeScript e variações
  ],

  // 🔌 Addons que estendem funcionalidades do Storybook
  addons: [
    "@storybook/addon-essentials",         // Pacote essencial com controles, actions, docs, viewport etc.
    "@storybook/addon-onboarding",         // Assistente de boas-vindas para novos usuários do Storybook
    "@chromatic-com/storybook",            // Integração com Chromatic para testes visuais na nuvem
    "@storybook/experimental-addon-test"   // Addon experimental para testes (play functions, etc)
  ],

  // ⚙️ Define o framework base e integra com o Vite para builds rápidos
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },

  // 🛠️ Ajustes finais na configuração do Vite
  viteFinal: (config) => {
    config.server.watch = {
      // 🚫 Ignora arquivos dentro da pasta 'venv', que é usada por ambientes Python.
      // Isso evita lentidão, travamentos e uso desnecessário de memória, pois o Vite
      // deixará de observar arquivos inúteis para o projeto React.
      ignored: ['**/venv/**'],
    };
    return config;
  },
};

export default config;
