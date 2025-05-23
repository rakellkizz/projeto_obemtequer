// utils/auth.js

const jwt = require('jsonwebtoken');

// 🛡️ Variável de ambiente para proteger o segredo do JWT
// ⚠️ IMPORTANTE: Nunca versionar segredos no código
const SECRET = process.env.JWT_SECRET || 'segredoSuperSecreto';

/**
 * 🎯 Gera um token JWT válido por 1 hora
 * @param {Object} payload - Dados que serão armazenados no token (ex: { id: user._id })
 * @returns {string} - Token JWT assinado
 */
function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

/**
 * ✅ Verifica se o token é válido e não expirou
 * @param {string} token - Token JWT enviado pelo cliente
 * @returns {Object|null} - Retorna o payload decodificado ou null se inválido
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    // 🚨 Aqui você pode logar erros se quiser auditar tokens inválidos
    // console.error('Erro ao verificar token:', error.message);
    return null;
  }
}

/**
 * (Opcional) 🚀 Gera um Refresh Token com validade maior
 * Ideal para renovar sessões sem forçar o usuário a logar novamente.
 */
function generateRefreshToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' }); // Ex: 7 dias
}

/**
 * (Opcional) ❌ Função segura para invalidar tokens (exige blacklist ou redis)
 * JWT por padrão não permite "invalidar", apenas expira
 */
function isTokenBlacklisted(token) {
  // Implementar cache ou blacklist se desejar controle avançado
  return false;
}

// 📦 Exporta tudo de forma organizada
module.exports = {
  generateToken,
  verifyToken,
  generateRefreshToken, // você pode ignorar se não for usar por agora
  isTokenBlacklisted    // idem acima
};
