// =======================================================================================
// 📁 ARQUIVO: utils/ErrorResponse.js
// DESCRIÇÃO: Classe de erro personalizada para respostas HTTP padronizadas
// =======================================================================================

/**
 * 🔴 Classe personalizada que estende o objeto nativo `Error`.
 * Permite lançar exceções com códigos de status HTTP e mensagens específicas,
 * facilitando o tratamento padronizado de erros em APIs REST.
 *
 * ✅ Exemplo:
 * throw new ErrorResponse('Requisição inválida', 400);
 */
class ErrorResponse extends Error {
  /**
   * @param {string} message - Mensagem descritiva do erro para o cliente.
   * @param {number} statusCode - Código HTTP correspondente (ex: 400, 404, 500).
   */
  constructor(message, statusCode) {
    super(message); // 🧱 Inicializa a classe pai `Error` com a mensagem
    this.name = 'ErrorResponse'; // 🔖 Nome customizado para facilitar logs e debug
    this.statusCode = statusCode; // 📌 Armazena o código de status HTTP

    // 🧹 Remove detalhes desnecessários da stack trace para facilitar o debug
    Error.captureStackTrace(this, this.constructor);
  }
}

// =======================================================================================
// 📤 EXPORTAÇÃO: Disponibiliza a classe para uso em controllers, rotas e middlewares
// =======================================================================================
module.exports = ErrorResponse;
