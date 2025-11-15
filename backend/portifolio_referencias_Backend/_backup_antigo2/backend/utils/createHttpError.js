// ------------------------------------------------------------
// ARQUIVO: utils/createHttpError.js
// ------------------------------------------------------------
// ✅ OBJETIVO:
// Fornece uma classe de erro personalizada (HttpError)
// e uma função utilitária para lançar erros HTTP padronizados,
// facilitando o tratamento uniforme de erros na aplicação.
//
// ✅ EXEMPLO DE USO:
// throw createHttpError(404, 'Usuário não encontrado');
//
// ✅ USO EM UM CONTROLLER:
// if (!usuario) throw createHttpError(404, 'Usuário não encontrado');
// ------------------------------------------------------------

/**
 * Classe personalizada para representar erros HTTP.
 * Estende a classe nativa Error e inclui um statusCode HTTP,
 * permitindo tratamento uniforme em middlewares, logs e respostas.
 */
class HttpError extends Error {
  /**
   * Construtor do erro HTTP.
   * @param {number} statusCode - Código de status HTTP (ex: 400, 404, 500).
   * @param {string} message - Mensagem descritiva do erro.
   */
  constructor(statusCode, message) {
    super(message); // Herda a mensagem da superclasse Error
    this.name = 'HttpError'; // Nome da classe para facilitar o rastreamento
    this.statusCode = statusCode; // Código de status HTTP
    Error.captureStackTrace(this, this.constructor); // Garante rastreamento limpo da stack
  }
}

/**
 * Função auxiliar para criar um erro HTTP.
 * Evita instanciar diretamente a classe e padroniza a criação.
 * 
 * @param {number} statusCode - Código HTTP (ex: 400, 404).
 * @param {string} message - Mensagem explicativa do erro.
 * @returns {HttpError} - Instância pronta para ser lançada.
 */
const createHttpError = (statusCode, message) => {
  return new HttpError(statusCode, message);
};

// ------------------------------------------------------------
// EXPORTAÇÃO
// ------------------------------------------------------------
// Permite importar e usar em controladores, middlewares etc.
module.exports = createHttpError;
