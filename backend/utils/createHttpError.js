// -----------------------------------------------------------------------------
// ARQUIVO: utils/createHttpError.js
// -----------------------------------------------------------------------------
// 🔧 OBJETIVO:
// Fornece uma classe personalizada para erros HTTP (HttpError)
// e uma função utilitária para criar instâncias padronizadas,
// facilitando o tratamento uniforme de exceções na aplicação.
//
// 💡 EXEMPLO DE USO:
// if (!usuario) throw createHttpError(404, 'Usuário não encontrado');
//
// -----------------------------------------------------------------------------


/**
 * 📦 Classe personalizada para representar erros HTTP.
 * Estende a classe nativa Error, adicionando o statusCode HTTP
 * e um rastreamento de stack mais limpo.
 */
class HttpError extends Error {
  /**
   * @param {number} statusCode - Código de status HTTP (ex: 400, 404, 500).
   * @param {string} message - Mensagem explicativa do erro.
   */
  constructor(statusCode, message) {
    super(message);                    // 🧬 Inicializa a mensagem na superclasse
    this.name = 'HttpError';          // 📛 Nome da classe (útil para logs e rastreamento)
    this.statusCode = statusCode;     // 🔢 Código de status HTTP
    Error.captureStackTrace(this, this.constructor); // 🔍 Stack trace limpa
  }
}


/**
 * 🧰 Função utilitária para criar instâncias de HttpError.
 *
 * Abstrai a criação manual e mantém a padronização em toda a aplicação.
 *
 * @param {number} statusCode - Código HTTP (ex: 401, 403, 500).
 * @param {string} message - Mensagem descritiva do erro.
 * @returns {HttpError} - Instância de erro pronta para ser lançada.
 */
const createHttpError = (statusCode, message) => {
  return new HttpError(statusCode, message);
};


// -----------------------------------------------------------------------------
// EXPORTAÇÃO
// -----------------------------------------------------------------------------
module.exports = createHttpError;
