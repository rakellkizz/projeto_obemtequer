// =======================================================================================
// 📁 ARQUIVO: middlewares/errorHandler.js
// DESCRIÇÃO: Middleware global para tratamento de erros no Express.
// ✅ Capta erros lançados em rotas, controllers e middlewares.
// ✅ Diferencia erros HTTP esperados (400, 404, 401...) dos inesperados (500).
// ✅ Mostra stack trace apenas em desenvolvimento.
// =======================================================================================

// 📦 Importa função utilitária para identificar erros HTTP definidos por nós
const { isHttpError } = require('../utils/createHttpError');

/**
 * 🛑 Middleware global de tratamento de erros.
 * Este middleware **sempre deve estar no final da cadeia de middlewares** no Express.
 *
 * @param {Error} err - O erro capturado (lançado por try/catch ou throw)
 * @param {import('express').Request} req - Objeto da requisição Express
 * @param {import('express').Response} res - Objeto da resposta Express
 * @param {import('express').NextFunction} next - Função para passar controle adiante (não usada aqui)
 */
const errorHandler = (err, req, res, next) => {
  console.error('🔥 Erro capturado pelo middleware global:', err);

  // 🔎 Determina o status HTTP: 500 (erro interno) ou o status do erro lançado
  const statusCode = isHttpError(err) ? err.statusCode : 500;

  // 💬 Define mensagem amigável para o usuário
  const mensagem = isHttpError(err)
    ? err.message
    : 'Erro interno do servidor. Por favor, tente novamente mais tarde.';

  // 📦 Monta o objeto de erro a ser enviado como resposta
  const respostaErro = {
    sucesso: false,
    erro: {
      codigo: statusCode,
      mensagem,
      // 🐞 Exibe a stack trace apenas em ambiente de desenvolvimento
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  };

  // 🚨 Retorna a resposta com o status HTTP apropriado
  res.status(statusCode).json(respostaErro);
};

module.exports = errorHandler;
