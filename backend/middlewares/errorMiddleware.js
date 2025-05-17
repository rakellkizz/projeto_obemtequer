// ------------------------------
// ARQUIVO: errorMiddleware.js
// ------------------------------
// Middleware global de tratamento de erros para toda a API Express
// Captura qualquer erro não tratado e envia resposta padronizada ao cliente

const errorMiddleware = (err, req, res, next) => {
  // Log técnico completo no servidor para debug
  console.error('🧨 Erro capturado pelo middleware:', err.stack);

  // Define o status HTTP apropriado (padrão: 500)
  const statusCode = err.statusCode || 500;

  // Cria resposta padronizada
  const errorResponse = {
    sucesso: false,
    mensagem: err.message || 'Erro interno do servidor. Tente novamente mais tarde.',
    // Apenas em desenvolvimento mostra detalhes técnicos
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  // Envia a resposta JSON com o código HTTP apropriado
  res.status(statusCode).json(errorResponse);
};

module.exports = errorMiddleware;
