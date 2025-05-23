// -----------------------------------------------------------------------------
// ARQUIVO: middlewares/authMiddleware.js
// -----------------------------------------------------------------------------
// 🔐 Middleware de Autenticação JWT
// Este middleware protege rotas privadas verificando a presença e validade
// de um token JWT no cabeçalho Authorization da requisição HTTP.
// Se válido, injeta os dados do usuário no objeto da requisição.
// -----------------------------------------------------------------------------

// 📦 Dependências
const jwt = require('jsonwebtoken');
const createHttpError = require('../utils/createHttpError');

// -----------------------------------------------------------------------------
// FUNÇÃO: verificarTokenJWT
// -----------------------------------------------------------------------------

/**
 * 🧪 Middleware de autenticação JWT para proteger rotas privadas.
 * 
 * Valida a presença do token no cabeçalho Authorization (formato: "Bearer <token>"),
 * decodifica o payload e injeta as informações do usuário em `req.usuario`.
 * 
 * @param {Object} req - Objeto da requisição Express
 * @param {Object} res - Objeto da resposta Express
 * @param {Function} next - Próximo middleware ou rota
 */
const verificarTokenJWT = (req, res, next) => {
  // 🔎 Captura o cabeçalho Authorization
  const authHeader = req.headers.authorization;

  // ⚠️ Verifica se o cabeçalho existe e começa com "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(
      createHttpError(401, 'Acesso negado: token ausente ou malformado.')
    );
  }

  // ✂️ Extrai o token puro (sem o prefixo "Bearer ")
  const token = authHeader.split(' ')[1];

  try {
    // 🔐 Verifica e decodifica o token JWT usando o segredo da aplicação
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // 📎 Injeta os dados do payload no objeto da requisição
    req.usuario = payload;

    // ✅ Autorizado – segue para o próximo middleware
    next();
  } catch (erro) {
    // ❌ Token inválido ou expirado
    return next(
      createHttpError(403, 'Token inválido ou expirado. Acesso negado.')
    );
  }
};

// -----------------------------------------------------------------------------
// EXPORTAÇÃO
// -----------------------------------------------------------------------------
module.exports = verificarTokenJWT;
