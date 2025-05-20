// -------------------------------------------------------------
// ARQUIVO: utils/generateToken.js
// -------------------------------------------------------------
// Gera um token JWT com os dados do usuário.
// -------------------------------------------------------------

const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d' // token válido por 1 dia
  });
};

module.exports = generateToken;
// -------------------------------------------------------------
// FIM DO ARQUIVO: utils/generateToken.js
// -------------------------------------------------------------