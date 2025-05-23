// -----------------------------------------------------------------------------
// ARQUIVO: middlewares/verificarPermissao.js
// -----------------------------------------------------------------------------
// 🔐 Middleware de verificação de permissões (roles)
// Este middleware é utilizado após a autenticação JWT para garantir que
// apenas usuários com certas permissões (ex: "admin", "editor", etc.)
// possam acessar rotas específicas do sistema.
// -----------------------------------------------------------------------------
// 📌 Exemplo de uso:
// router.get('/admin', verificarTokenJWT, verificarPermissao(['admin']), controlador);
// -----------------------------------------------------------------------------

const createHttpError = require('../utils/createHttpError');

/**
 * 🧩 Middleware de autorização por perfil (role).
 * 
 * @param {Array<string>} permissoesPermitidas - Lista de perfis autorizados (ex: ['admin', 'editor'])
 * @returns {Function} Middleware Express que valida se o usuário tem permissão.
 */
const verificarPermissao = (permissoesPermitidas) => {
  return (req, res, next) => {
    // 🔐 Recupera o payload do usuário autenticado (definido pelo middleware JWT)
    const usuario = req.usuario;

    // ⚠️ Verifica se o usuário ou seu perfil estão ausentes
    if (!usuario || !usuario.role) {
      return next(
        createHttpError(403, 'Acesso negado: usuário não autenticado ou sem perfil definido.')
      );
    }

    // 🔎 Verifica se o perfil do usuário está na lista de permitidos
    const possuiPermissao = permissoesPermitidas.includes(usuario.role);

    if (!possuiPermissao) {
      return next(
        createHttpError(403, `Acesso negado: seu perfil (${usuario.role}) não tem permissão para esta rota.`)
      );
    }

    // ✅ Permissão concedida - continua para a próxima etapa
    next();
  };
};

module.exports = verificarPermissao;
