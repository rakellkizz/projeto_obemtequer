// ============================================================================
// ARQUIVO: jest.backend.config.js
// 🎯 Configura Jest só para os testes reais do backend (ignora backups)
// ============================================================================

module.exports = {
  testEnvironment: 'node',

  // Roda só testes na pasta `src/tests` do backend
  testMatch: ['**/src/tests/**/*.test.js'],

  // Ignora pastas de referência ou backups
  testPathIgnorePatterns: [
    '/node_modules/',
    '/portifolio_referencias_Backend/',
    '/_backup_antigo2/',
  ],
};
