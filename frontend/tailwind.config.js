/**
 * @type {import('tailwindcss').Config}
 * 
 * 🔍 Habilita IntelliSense e verificação de tipos no VS Code para Tailwind
 */
module.exports = {
  /* 📁 Define onde o Tailwind deve escanear por classes CSS utilizadas */
  content: [
    "./index.html",                  // Página HTML principal
    "./src/**/*.{js,ts,jsx,tsx}",    // Todos os arquivos React, TypeScript etc.
  ],

  /* ✅ Lista de classes que devem SEMPRE estar presentes no build final */
  /* 🔒 Evita que Tailwind remova classes usadas dinamicamente (como nos temas) */
  safelist: [
    "tema-claro",
    "tema-escuro",
    "tema-dislexo",
    "tema-daltonismo",
    "tema-alto-contraste",
    "tema-leitura",
    "tema-wallpaper-rosa",
    "tema-wallpaper-personalizado",
    "fonte-reduzida",
    "fonte-maior",
    "fonte-maxima",
    "container-centralizado",
    "campo-login",
    "botao-login",
    "botao-voz",
    "card-login",
    "fade-in"
  ],

  theme: {
    extend: {
      // 🎨 Personalizações opcionais podem ser adicionadas aqui
    },
  },

  plugins: [
    // 📦 Plugins do Tailwind para formulários e tipografia rica
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
/**
 * @type {import('tailwindcss').Config}
 * 
 * 🔍 Habilita IntelliSense e verificação de tipos no VS Code para Tailwind
 */
module.exports = {
  // 📁 Escaneia os arquivos onde as classes Tailwind serão usadas
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // 🔒 Classes que NUNCA serão removidas do build (usadas dinamicamente)
  safelist: [
    "tema-claro",
    "tema-escuro",
    "tema-dislexo",
    "tema-daltonismo",
    "tema-alto-contraste",
    "tema-leitura",
    "tema-wallpaper-rosa",
    "tema-wallpaper-personalizado",
    "fonte-reduzida",
    "fonte-maior",
    "fonte-maxima",
    "container-centralizado",
    "campo-login",
    "botao-login",
    "botao-voz",
    "card-login",
    "fade-in"
  ],

  // 🎨 Customizações visuais do projeto
  theme: {
    extend: {
      // Exemplo de como adicionar cores, fontes ou animações aqui se quiser:
      // colors: {
      //   rosaLuxo: '#fcd3e1',
      // },
      // fontFamily: {
      //   especial: ['"Open Dyslexic"', 'sans-serif'],
      // },
    },
  },

  // 🧩 Plugins oficiais do Tailwind
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
