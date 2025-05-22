// -------------------------------------------------------------
// ARQUIVO: utils/generateToken.js
// -------------------------------------------------------------
// ✅ OBJETIVO:
// Gerar um token JWT (JSON Web Token) com os dados do usuário
// para autenticação e autorização segura na aplicação.
//
// ✅ EXEMPLO DE USO:
// const token = generateToken({ id: usuario._id });
//
// ✅ UTILIZADO EM:
// - Controllers de autenticação
// - Middleware de login
// -------------------------------------------------------------

// -----------------------------
// IMPORTAÇÃO DE DEPENDÊNCIAS
// -----------------------------
const jwt = require('jsonwebtoken');

/**
 * Gera um token JWT assinado com a chave secreta definida no .env.
 * 
 * @param {Object} payload - Objeto com os dados que serão incluídos no token (ex: id do usuário).
 * @returns {string} - Token JWT assinado e com tempo de expiração.
 */
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d' // Token válido por 1 dia (pode ser ajustado conforme necessário)
  });
};

// -----------------------------
// EXPORTAÇÃO DA FUNÇÃO
// -----------------------------
// Permite reutilizar generateToken() em outros módulos da aplicação.
module.exports = generateToken;

// -------------------------------------------------------------
// FIM DO ARQUIVO: utils/generateToken.js
// -------------------------------------------------------------
