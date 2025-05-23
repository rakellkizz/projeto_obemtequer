module.exports = {
  testEnvironment: 'node',       // para rodar testes no ambiente Node.js
  transform: {
    "^.+\\.jsx?$": "babel-jest"  // use babel-jest para transformar arquivos JS/JSX
  },
  // opcional: ignorar node_modules para performance
  transformIgnorePatterns: [
    "/node_modules/"
  ]
};
