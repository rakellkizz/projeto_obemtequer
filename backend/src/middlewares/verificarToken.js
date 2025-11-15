// ===========================================================================================
// 📁 ARQUIVO: middlewares/verificarToken.js
// DESCRIÇÃO: Middleware de autenticação JWT para proteger rotas privadas
// Injeta os dados decodificados do token em `req.usuario`
// ===========================================================================================

import jwt from 'jsonwebtoken';
import createHttpError from '../utils/createHttpError.js';

/**
 * 🔐 Middleware que protege rotas usando token JWT no cabeçalho Authorization
 * Injeta `req.usuario` com os dados do token após validação
 */
const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 🚨 Verifica se a chave do JWT está definida no .env
  if (!process.env.JWT_SECRET) {
    console.error('❌ JWT_SECRET não definido nas variáveis de ambiente!');
    return next(createHttpError(500, 'Erro interno do servidor.'));
  }

  // 🔍 Verifica se o cabeçalho existe e tem formato correto
  if (typeof authHeader !== 'string' || !authHeader.toLowerCase().startsWith('bearer ')) {
    return next(
      createHttpError(401, '🚫 Acesso negado: token ausente ou malformado.')
    );
  }

  const token = authHeader.split(' ')[1]; // ✂️ Extrai o token

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // ✅ Valida o token
    req.usuario = payload; // 📌 Injeta o payload no objeto da requisição
    next();
  } catch (erro) {
    console.error('⚠️ Erro na verificação do token JWT:', erro.message);
    return next(
      createHttpError(403, '⛔ Token inválido ou expirado. Acesso negado.')
    );
  }
};

export default verificarToken;
