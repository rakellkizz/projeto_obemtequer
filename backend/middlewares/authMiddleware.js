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
 * 🧪 Middleware de autenticação via JWT.
 * 
 * Valida a presença do token JWT no cabeçalho `Authorization`,
 * decodifica-o e injeta o payload no objeto `req.usuario`.
 * 
 * @param {Object} req - Objeto da requisição (Express)
 * @param {Object} res - Objeto da resposta (Express)
 * @param {Function} next - Função para prosseguir com a cadeia de middlewares
 */
const verificarTokenJWT = (req, res, next) => {
  // 🔎 Captura o cabeçalho Authorization (esperado: "Bearer <token>")
  const authHeader = req.headers.authorization;

  // ⚠️ Verifica a existência e formatação correta do token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(
      createHttpError(401, 'Acesso negado: token ausente ou malformado.')
    );
  }

  // ✂️ Extrai apenas o token (removendo o prefixo "Bearer ")
  const token = authHeader.split(' ')[1];

  try {
    // 🔐 Valida e decodifica o token com a chave secreta da aplicação
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // 📎 Injeta os dados decodificados no objeto de requisição
    // Isso permite que os próximos middlewares e rotas usem req.usuario
    req.usuario = payload;

    // ✅ Autenticação bem-sucedida – segue para a próxima etapa
    next();
  } catch (erro) {
    // ❌ Token inválido ou expirado
    return next(
      createHttpError(403, 'Token inválido ou expirado. Acesso negado.')
    );
  }
};

// Exporta o middleware para uso em rotas protegidas
module.exports = verificarTokenJWT;
