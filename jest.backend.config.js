// ============================================================================
// 📄 ARQUIVO: jest.backend.config.js
// ---------------------------------------------------------------------------
// 🔧 Configuração de testes do backend usando Jest (ambiente Node.js)
// Ignora pastas desnecessárias e define padrões para arquivos de teste
// ============================================================================

module.exports = {
  // 🌐 Ambiente simulado para testes em Node.js (sem DOM ou navegador)
  testEnvironment: 'node',

  // 🧪 Arquivos de teste válidos (em qualquer subpasta do backend)
  testMatch: ['**/backend/**/*.test.js'],

  // 🚫 Pastas que devem ser ignoradas nos testes
  testPathIgnorePatterns: [
    '/node_modules/',                        // Ignora dependências
    '/portifolio_referencias_Backend/',     // Ignora backups externos
    '/_backup_antigo2/',                     // Ignora backups internos
    '/__tests__/legacy/',                    // Ignora testes legados
  ],

  // 🗒️ Mostra todos os testes no terminal
  // verbose: true,

  // 📊 Gera relatório de cobertura de código
  // collectCoverage: true,
};
