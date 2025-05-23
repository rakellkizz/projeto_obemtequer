// -----------------------------------------------------------------------------
// ARQUIVO: middlewares/errorHandler.js
// -----------------------------------------------------------------------------
// 🛠️ Middleware global para tratamento unificado de erros no Express.
// Este middleware captura quaisquer erros lançados na aplicação (em rotas, controllers ou middlewares)
// e envia uma resposta JSON padronizada ao cliente.
//
// 👉 Ele também diferencia erros esperados (como 400, 401, 403, 404...) usando a biblioteca `http-errors`.
//
// ✅ Deve ser SEMPRE o último middleware da cadeia de middlewares do Express!
// -----------------------------------------------------------------------------

const createHttpError = require('http-errors'); // Biblioteca para criação/tratamento de erros HTTP

/**
 * Middleware global de tratamento de erros.
 *
 * @param {Error} err - O erro lançado em qualquer parte da aplicação.
 * @param {import('express').Request} req - Objeto da requisição Express.
 * @param {import('express').Response} res - Objeto da resposta Express.
 * @param {import('express').NextFunction} next - Função para passar o controle adiante (caso necessário).
 */
const errorHandler = (err, req, res, next) => {
  // ---------------------------------------------------------------------------
  // 🔎 Log do erro no backend (útil apenas no desenvolvimento ou logs internos)
  // ---------------------------------------------------------------------------
  console.error('🔥 Erro capturado no middleware global:', err);

  // ---------------------------------------------------------------------------
  // 🔐 Verifica se o erro segue o padrão do `http-errors` (status + mensagem + exposições públicas)
  // ---------------------------------------------------------------------------
  const isHttpError = err.status && err.expose;

  // ---------------------------------------------------------------------------
  // ⚙️ Define o status HTTP e a mensagem apropriada
  // - Se for um erro esperado, usa seu status e mensagem
  // - Caso contrário, assume 500 (erro interno do servidor)
  // ---------------------------------------------------------------------------
  const statusCode = isHttpError ? err.status : 500;

  const mensagem = isHttpError
    ? err.message
    : 'Erro interno do servidor. Por favor, tente novamente mais tarde.';

  // ---------------------------------------------------------------------------
  // 🧾 Cria uma resposta JSON estruturada, segura e padronizada
  // ---------------------------------------------------------------------------
  const respostaErro = {
    sucesso: false,
    erro: {
      codigo: statusCode,
      mensagem,
      // Exibe stack trace SOMENTE em ambiente de desenvolvimento
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  };

  // ---------------------------------------------------------------------------
  // 🚀 Envia a resposta com status HTTP adequado
  // ---------------------------------------------------------------------------
  res.status(statusCode).json(respostaErro);
};

module.exports = errorHandler;
