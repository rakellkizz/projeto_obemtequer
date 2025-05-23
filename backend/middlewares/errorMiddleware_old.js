// ⚠️ Arquivo antigo - backup do middleware de erro anterior
// Substituído por errorHandler.js em Maio/2025
// Pode ser excluído futuramente após testes

// ------------------------------
// ARQUIVO: middlewares/errorMiddleware_old.js

// ------------------------------
// Middleware global para tratamento unificado de erros no Express.
// Intercepta erros lançados em qualquer rota ou middleware,
// e retorna uma resposta JSON padronizada para o cliente.

// Importa a lib para criação de erros HTTP padronizados
const createHttpError = require('http-errors');

/**
 * Middleware de tratamento global de erros.
 * @param {Error} err - Objeto de erro lançado em qualquer parte da aplicação.
 * @param {import('express').Request} req - Objeto da requisição HTTP.
 * @param {import('express').Response} res - Objeto da resposta HTTP.
 * @param {import('express').NextFunction} next - Função para passar controle adiante.
 */
const errorMiddleware = (err, req, res, next) => {
  // Log detalhado do erro para facilitar debugging (exibido apenas no backend)
  console.error('🔥 Erro capturado no middleware global:', err);

  // Verifica se o erro é um HTTPError criado pela lib 'http-errors'
  const isHttpError = err.status && err.expose;

  // Define código HTTP e mensagem a partir do erro, ou usa padrão para erros inesperados
  const statusCode = isHttpError ? err.status : 500;
  const mensagem = isHttpError
    ? err.message
    : 'Erro interno do servidor. Por favor, tente novamente mais tarde.';

  // Resposta JSON padronizada para o cliente
  const respostaErro = {
    sucesso: false,
    erro: {
      codigo: statusCode,
      mensagem,
      // Inclui stack trace somente em ambiente de desenvolvimento para não vazar infos sensíveis
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  };

  // Envia resposta com status adequado e corpo JSON
  res.status(statusCode).json(respostaErro);
};

module.exports = errorMiddleware;


/*
Exemplos de uso do 'http-errors' para lançar erros personalizados em sua aplicação

const createError = require('http-errors');

// Exemplo de middleware que verifica autenticação
function autenticar(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    // Lança erro 401 Unauthorized
    return next(createError(401, 'Token de autenticação não fornecido.'));
  }

  if (token !== 'Bearer tokenvalido123') {
    // Lança erro 403 Forbidden
    return next(createError(403, 'Token inválido ou expirado.'));
  }

  next(); // segue adiante se autenticado
}

// Exemplo de controller que valida dados e lança erro 400 Bad Request
function criarUsuario(req, res, next) {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return next(createError(400, 'Os campos nome e email são obrigatórios.'));
  }

  // Se tudo OK
  res.status(201).json({ sucesso: true, mensagem: 'Usuário criado com sucesso.' });
}

Na sua aplicação Express, lembre-se:

const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errorMiddleware');

app.use(express.json());

// Rotas que usam middleware e controllers que podem lançar erros via createError
app.post('/usuario', autenticar, criarUsuario);

// Middleware global de erro SEMPRE por último
app.use(errorMiddleware);

*/
