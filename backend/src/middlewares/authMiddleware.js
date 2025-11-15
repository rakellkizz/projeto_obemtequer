// =======================================================================================
// 📁 ARQUIVO: middlewares/authMiddleware.js
// DESCRIÇÃO: Middleware para proteger rotas privadas usando token JWT
// Verifica se o token está presente e válido. Caso contrário, retorna erro.
// =======================================================================================

import jwt from 'jsonwebtoken';                             // 🔐 Biblioteca para gerar/verificar tokens JWT
import createHttpError from '../utils/createHttpError.js';  // ⚠️ Função para lançar erros HTTP amigáveis

// =======================================================================================
// 📌 Middleware: verificarTokenJWT
// =======================================================================================
const verificarTokenJWT = (req, res, next) => {
  // 🔎 Busca o token do cabeçalho Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(createHttpError(401, 'Token não fornecido ou inválido. 🔐'));
  }

  const token = authHeader.split(' ')[1]; // 🎯 Extrai apenas o token

  try {
    // ✅ Verifica a validade e decodifica os dados do token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // 🔄 Adiciona os dados decodificados na requisição (ex: id do usuário)
    req.usuario = payload;

    next(); // Continua para a próxima função da rota protegida
  } catch (err) {
    return next(createHttpError(403, 'Token inválido ou expirado. ⛔'));
  }
};

// ✅ Exporta o middleware para uso nas rotas privadas
export default verificarTokenJWT;
