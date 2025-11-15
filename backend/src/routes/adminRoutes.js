// ============================================================================================
// 📁 ARQUIVO: routes/adminRoutes.js
// DESCRIÇÃO: Rotas administrativas com controle de acesso por papéis (RBAC) e JWT
// Projeto: O Bem Te Quer 💜
// ============================================================================================

import express from 'express';
import verificarTokenJWT from '../middlewares/authMiddleware.js';          // 🔐 Autenticação
import verificarPermissao from '../middlewares/verificarPermissao.js';    // 🛡️ Autorização por papel

const router = express.Router();

// ============================================================================================
// 📌 GET /painel
// ▶️ Acesso exclusivo para administradores (papel "admin")
// ============================================================================================
router.get(
  '/painel',
  verificarTokenJWT,
  verificarPermissao(['admin']),
  (req, res) => {
    res.status(200).json({
      status: 'sucesso',
      mensagem: `Bem-vinda ao painel de administração, ${req.usuario.nome}`,
      usuario: req.usuario
    });
  }
);

// ============================================================================================
// 📌 GET /editar-conteudo
// ▶️ Acesso para usuários com papel "admin" ou "editor"
// ============================================================================================
router.get(
  '/editar-conteudo',
  verificarTokenJWT,
  verificarPermissao(['admin', 'editor']),
  (req, res) => {
    res.status(200).json({
      status: 'sucesso',
      mensagem: 'Você pode editar este conteúdo.',
      usuario: req.usuario
    });
  }
);

// ============================================================================================
// ✅ Exporta para uso no server.js com prefixo /api/admin
// ============================================================================================
export default router;
