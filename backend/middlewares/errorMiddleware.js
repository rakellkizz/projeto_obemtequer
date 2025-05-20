// ------------------------------
// ARQUIVO: middlewares/errorMiddleware.js
// ------------------------------
// Middleware de tratamento global de erros para a aplicação Express.
// Ele captura qualquer erro passado para "next(err)" e envia uma resposta apropriada.

// ------------------------------
// 1. FUNÇÃO DE ERRO PERSONALIZADA
// ------------------------------
const errorMiddleware = (err, req, res, next) => {
  console.error('🔥 Erro capturado pelo middleware:', err);

  // Se o erro já tiver um status definido, usamos ele. Senão, usamos 500 (Erro Interno).
  const statusCode = err.statusCode || 500;

  // Mensagem amigável para o usuário. Usa a mensagem do erro, se houver.
  const mensagem = err.message || 'Ocorreu um erro inesperado no servidor.';

  // Estrutura de resposta padronizada
  res.status(statusCode).json({
    sucesso: false,
    erro: {
      codigo: statusCode,
      mensagem: mensagem,
      // Apenas em ambiente de desenvolvimento: detalhes técnicos
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

// ------------------------------
// 2. EXPORTAÇÃO DO MIDDLEWARE
// ------------------------------
module.exports = errorMiddleware;
