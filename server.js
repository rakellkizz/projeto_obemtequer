// --------------------------------------------------------------------
// ARQUIVO: errorHandler.js
// DESCRIÇÃO: Middleware global para captura e tratamento de erros.
// Aplica boas práticas como logs, mensagens padronizadas e status HTTP.
// --------------------------------------------------------------------

/**
 * Middleware para tratamento de erros (Express padrão de 4 parâmetros).
 * @param {Error} err - Objeto de erro lançado
 * @param {Request} req - Requisição HTTP
 * @param {Response} res - Resposta HTTP
 * @param {Function} next - Próximo middleware (não usado aqui)
 */
const errorHandler = (err, req, res, next) => {
  console.error('🔥 Erro capturado pelo middleware global:', err);

  // Status HTTP: se não estiver definido, assume 500 (erro interno)
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Erro interno no servidor',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

module.exports = errorHandler;
