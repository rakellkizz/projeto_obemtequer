// -------------------------------------------------------------
// ARQUIVO: middlewares/authMiddleware.js
// -------------------------------------------------------------
// Middleware para verificar e validar o token JWT enviado pelo cliente.
// Protegerá rotas privadas de acesso não autorizado.
// -------------------------------------------------------------

const jwt = require('jsonwebtoken');
const createHttpError = require('../utils/createHttpError');

const authMiddleware = (req, res, next) => {
  // Pega o token do cabeçalho da requisição
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(createHttpError(401, 'Token não fornecido ou inválido.'));
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifica e decodifica o token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload; // adiciona dados do usuário à requisição
    next();
  } catch (err) {
    return next(createHttpError(403, 'Token inválido ou expirado.'));
  }
};

module.exports = authMiddleware;
