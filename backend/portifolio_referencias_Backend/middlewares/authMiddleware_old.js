// -----------------------------------------------------------------------------
// ARQUIVO: middlewares/authMiddleware.js
// -----------------------------------------------------------------------------
// 🔐 Middleware de Autenticação JWT
// Este middleware protege rotas privadas verificando a presença e validade
// de um token JWT no cabeçalho Authorization da requisição HTTP.
// Se válido, injeta os dados do usuário autenticado no objeto req.usuario.
// -----------------------------------------------------------------------------

// 1. DEPENDÊNCIAS
const jwt = require('jsonwebtoken');
const createHttpError = require('../utils/createHttpError');
require('dotenv').config(); // Garante acesso ao segredo JWT

// 2. FUNÇÃO: verificarTokenJWT

/**
 * 🧪 Middleware de autenticação JWT.
 *
 * Verifica o cabeçalho Authorization no formato "Bearer <token>".
 * Se o token for válido, injeta o payload JWT em `req.usuario`.
 *
 * @param {Object} req - Objeto da requisição Express
 * @param {Object} res - Objeto da resposta Express
 * @param {Function} next - Próxima função middleware
 */
const verificarTokenJWT = (req, res, next) => {
  // 2.1 Captura o cabeçalho Authorization
  const authHeader = req.headers.authorization;

  // 2.2 Valida formato e existência do token
  if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
    return next(
      createHttpError(401, 'Acesso negado: token ausente ou malformado.')
    );
  }

  // 2.3 Extrai apenas o token (removendo o prefixo "Bearer ")
  const token = authHeader.split(' ')[1];

  try {
    // 2.4 Verifica e decodifica o token JWT
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // 2.5 Injeta dados do usuário na requisição
    req.usuario = payload;

    // ✅ Autorizado – segue para a próxima etapa
    next();
  } catch (erro) {
    // ❌ Token inválido ou expirado
    return next(
      createHttpError(403, 'Token inválido ou expirado. Acesso negado.')
    );
  }
};

// 3. EXPORTAÇÃO DO MIDDLEWARE
module.exports = verificarTokenJWT;
