// ============================================================================================
// 📁 ARQUIVO: utils/createHttpError.js
// DESCRIÇÃO: Gera erros HTTP padronizados para tratamento global e resposta ao cliente
// Permite lançar: createHttpError(404, 'Usuário não encontrado')
// ============================================================================================

/**
 * 📦 Classe personalizada de erro HTTP
 * Estende a classe Error e adiciona statusCode para controle de respostas
 */
class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);              // Chama o construtor original de Error
    this.name = 'HttpError';    // Nome útil para logs e debug
    this.statusCode = statusCode;

    // Remove referências internas da pilha de erro
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 🧰 Função utilitária para gerar erros padronizados
 * @param {number} statusCode - Código HTTP (ex: 401, 404)
 * @param {string} message - Mensagem explicativa
 * @returns {HttpError}
 */
const createHttpError = (statusCode, message) => {
  return new HttpError(statusCode, message);
};

// ✅ Exporta a função para ser usada nos controllers
export default createHttpError;
