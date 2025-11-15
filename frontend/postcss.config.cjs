/* ====================================================================================
    📄 postcss.config.cjs – Configuração obrigatória do PostCSS para Tailwind + Vite
     Projeto: O Bem Te Quer 💜
   ====================================================================================*/

/**
 * ✅ Este arquivo configura o PostCSS para usar o Tailwind e o Autoprefixer.
 * ⚠️ É necessário usar `.cjs` (CommonJS) se o seu package.json tiver `"type": "module"`.
 */
module.exports = {
  plugins: {
    tailwindcss: {},     /* Habilita o Tailwind como plugin PostCSS*/
    autoprefixer: {},    /* Adiciona prefixos para compatibilidade entre navegadores*/
  },
};
