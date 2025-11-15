// =======================================================================================
// 📁 ARQUIVO: utils/generateToken.js
// DESCRIÇÃO: Função utilitária para geração de tokens JWT seguros e reutilizáveis
// =======================================================================================

// 🔐 JWT = JSON Web Token: padrão seguro de autenticação baseado em tokens
const jwt = require('jsonwebtoken');

/**
 * 🧪 Gera um token JWT assinado com os dados fornecidos no payload.
 *
 * @param {Object} payload - Objeto com informações do usuário (ex: { id: '123' }).
 * @returns {string} - Token JWT assinado e válido por 1 dia.
 *
 * ✅ Exemplo de uso:
 * const token = generateToken({ id: usuario._id });
 */
const generateToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('🔐 JWT_SECRET não definido no arquivo .env');
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d', // ⏱️ Token válido por 1 dia (pode ser ajustado)
  });
};

// =======================================================================================
// 📤 EXPORTAÇÃO: Disponibiliza a função para uso em controllers e middlewares
// =======================================================================================
module.exports = generateToken;
