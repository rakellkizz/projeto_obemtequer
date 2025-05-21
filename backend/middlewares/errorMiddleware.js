// ------------------------------
// ARQUIVO: middlewares/errorMiddleware.js
// ------------------------------
// Middleware global para tratamento de erros na aplicação Express.
// Ele captura qualquer erro que for passado para "next(err)" e envia
// uma resposta padronizada ao cliente, facilitando o debug e a manutenção.

// Importa a classe personalizada de erro para identificar erros customizados
const ErrorResponse = require('../utils/ErrorResponse');

/**
 * Middleware de tratamento global de erros.
 * @param {Error} err - Objeto de erro lançado em qualquer parte da aplicação.
 * @param {Request} req - Objeto da requisição HTTP.
 * @param {Response} res - Objeto da resposta HTTP.
 * @param {NextFunction} next - Função para passar controle ao próximo middleware.
 */
const errorMiddleware = (err, req, res, next) => {
  // Loga o erro no console para que o desenvolvedor possa analisar detalhes
  console.error('🔥 Erro capturado pelo middleware:', err);

  // Se o erro for uma instância da classe ErrorResponse (customizada),
  // usamos seu statusCode e mensagem específicos.
  // Caso contrário, configuramos como erro interno do servidor (500).
  const statusCode = err instanceof ErrorResponse ? err.statusCode : 500;

  // Mensagem para o cliente: usa a do erro customizado ou uma genérica padrão.
  const mensagem = err instanceof ErrorResponse
    ? err.message
    : 'Ocorreu um erro inesperado no servidor. Por favor, tente novamente mais tarde.';

  // Envia a resposta com status HTTP apropriado e formato JSON padronizado.
  res.status(statusCode).json({
    sucesso: false, // Indica falha na requisição
    erro: {
      codigo: statusCode,       // Código HTTP do erro
      mensagem: mensagem,       // Mensagem amigável para o cliente
      // Em ambiente de desenvolvimento, inclui detalhes técnicos para ajudar no debug
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};

// Exporta o middleware para ser usado na aplicação Express
module.exports = errorMiddleware;
