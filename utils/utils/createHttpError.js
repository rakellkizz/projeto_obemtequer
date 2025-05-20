// ---------------------------------------------
// ARQUIVO: utils/createHttpError.js
// ---------------------------------------------
// ✅ OBJETIVO:
// Fornece uma classe de erro personalizada (HttpError)
// e uma função utilitária para lançar erros HTTP padronizados,
// facilitando o tratamento uniforme de erros na aplicação.
//
// ✅ EXEMPLO DE USO:
// throw createHttpError(404, 'Usuário não encontrado');
// ---------------------------------------------

/**
 * Classe personalizada para representar erros HTTP.
 * Estende a classe Error nativa do JavaScript e inclui
 * um statusCode HTTP para facilitar o tratamento.
 */
class HttpError extends Error {
  /**
   * Construtor do erro HTTP.
   * @param {number} statusCode - Código de status HTTP (ex: 400, 404, 500).
   * @param {string} message - Mensagem de erro descritiva.
   */
  constructor(statusCode, message) {
    super(message); // Chama o construtor da classe Error
    this.name = 'HttpError'; // Nome da classe para rastreamento
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor); // Rastreia o erro corretamente
  }
}

/**
 * Função auxiliar para instanciar um novo HttpError.
 * Pode ser usada em qualquer parte da aplicação.
 * 
 * @param {number} statusCode - Código HTTP.
 * @param {string} message - Mensagem descritiva do erro.
 * @returns {HttpError}
 */
const createHttpError = (statusCode, message) => {
  return new HttpError(statusCode, message);
};

module.exports = createHttpError;
