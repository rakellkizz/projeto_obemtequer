// ------------------------------
// ARQUIVO: errorMiddleware.js
// ------------------------------
// Middleware para capturar e retornar erros globais da aplicação

// Middleware para capturar e retornar erros da aplicação
const errorMiddleware = (err, req, res, next) => {
  // Log do erro no servidor para futuras análises
  console.error('🧨 Erro capturado pelo middleware:', err.stack);

  // Determina o status do erro (padrão: 500)
  const statusCode = err.statusCode || 500;

  // Resposta padronizada de erro para o usuário final
  res.status(statusCode).json({ 
    message: err.message || 'Erro interno do servidor. Tente novamente mais tarde.' 
  });
};

module.exports = errorMiddleware; // Exporta o middleware para ser utilizado em outros arquivos
