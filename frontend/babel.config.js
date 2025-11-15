// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: '> 0.25%, not dead', // Alvo: navegadores modernos + antigos ativos
    }],
    '@babel/preset-react', // Para JSX (React)
  ],
};
