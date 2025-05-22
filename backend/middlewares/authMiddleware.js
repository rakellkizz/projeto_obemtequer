// ------------------------------------------------------------------------
// ARQUIVO: middlewares/authMiddleware.js
// ------------------------------------------------------------------------
// 🔐 Middleware de autenticação JWT
// Este middleware verifica se o token JWT está presente e válido,
// protegendo rotas privadas contra acessos não autorizados.
// ------------------------------------------------------------------------

const jwt = require('jsonwebtoken');
const createHttpError = require('../utils/createHttpError');

// Middleware principal para proteger rotas com JWT
const verificarTokenJWT = (req, res, next) => {
  // 🔎 Captura o cabeçalho 'Authorization' da requisição
  const authHeader = req.headers.authorization;

  // ⚠️ Se não houver token ou estiver mal formatado
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(createHttpError(401, 'Acesso negado: token ausente ou malformado.'));
  }

  // 🧪 Extrai apenas o token (removendo "Bearer ")
  const token = authHeader.split(' ')[1];

  try {
    // 🔐 Valida o token e obtém os dados decodificados (payload)
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // 🧾 Anexa os dados do usuário na requisição para uso posterior
    req.usuario = payload;

    // ✅ Permite que a requisição prossiga para a próxima função
    next();
  } catch (erro) {
    // ❌ Token inválido ou expirado
    return next(createHttpError(403, 'Token inválido ou expirado. Acesso negado.'));
  }
};

module.exports = verificarTokenJWT;
