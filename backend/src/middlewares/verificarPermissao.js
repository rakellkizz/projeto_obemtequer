// ==============================================================================================
// 📁 ARQUIVO: middlewares/verificarPermissao.js
// DESCRIÇÃO: Middleware que restringe o acesso a rotas com base no papel do usuário (RBAC)
// Exige que o token JWT já tenha sido validado e decodificado (via verificarTokenJWT)
// ==============================================================================================

import createHttpError from '../utils/createHttpError.js'; // ⚠️ Lançador de erros padronizados

/**
 * 🔐 Middleware de verificação de permissão por papel (role).
 * @param {Array<string>} permissoesPermitidas - Ex: ['admin'], ['admin', 'editor']
 * @returns {Function} Middleware Express que verifica o papel do usuário.
 */
const verificarPermissao = (permissoesPermitidas) => {
  return (req, res, next) => {
    const usuario = req.usuario; // 💡 Definido em authMiddleware.js

    // 🔍 Verifica se o token existe e se o role foi informado
    if (!usuario || !usuario.role) {
      return next(
        createHttpError(403, 'Acesso negado: usuário não autenticado ou sem perfil definido.')
      );
    }

    const possuiPermissao = permissoesPermitidas.includes(usuario.role);

    if (!possuiPermissao) {
      console.warn(`🔒 Acesso negado: usuário ${usuario.id || 'desconhecido'} tentou acessar com role '${usuario.role}'`);
      return next(
        createHttpError(403, `Acesso negado: seu perfil (${usuario.role}) não tem permissão para esta rota.`)
      );
    }

    // ✅ Usuário autorizado
    next();
  };
};

export default verificarPermissao;
