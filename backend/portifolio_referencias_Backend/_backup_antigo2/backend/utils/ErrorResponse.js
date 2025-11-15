// ------------------------------------------------------------
// ARQUIVO: utils/ErrorResponse.js
// ------------------------------------------------------------
// ✅ OBJETIVO:
// Fornece uma classe de erro personalizada (ErrorResponse)
// que inclui um código de status HTTP, permitindo respostas
// de erro padronizadas e compatíveis com APIs REST.
//
// ✅ EXEMPLO DE USO:
// throw new ErrorResponse('Requisição inválida', 400);
//
// ✅ USO EM MIDDLEWARE DE ERROS:
// if (!usuario) throw new ErrorResponse('Usuário não encontrado', 404);
// ------------------------------------------------------------

/**
 * Classe personalizada para representar erros HTTP com mensagens específicas.
 * Estende a classe nativa Error e adiciona a propriedade statusCode,
 * permitindo retornos padronizados de erro em APIs REST.
 */
class ErrorResponse extends Error {
  /**
   * Construtor da classe ErrorResponse.
   * @param {string} message - Mensagem descritiva do erro para o cliente.
   * @param {number} statusCode - Código HTTP representando o tipo do erro.
   */
  constructor(message, statusCode) {
    super(message); // Chama o construtor da superclasse Error
    this.name = 'ErrorResponse'; // Nome da classe para fins de rastreamento
    this.statusCode = statusCode; // Atribui o status HTTP ao erro

    // Captura a stack trace omitindo o construtor atual, tornando o log mais limpo
    Error.captureStackTrace(this, this.constructor);
  }
}

// ------------------------------------------------------------
// EXPORTAÇÃO
// ------------------------------------------------------------
// Permite o uso da classe em controladores, serviços e middlewares.
module.exports = ErrorResponse;
