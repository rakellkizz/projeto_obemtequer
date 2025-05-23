// -----------------------------------------------------------------------------
// ARQUIVO: routes/adminRoutes.js
// -----------------------------------------------------------------------------
// 📌 Este módulo define rotas protegidas com autenticação JWT e controle de
//     permissões baseado em papéis (roles), como "admin" e "editor".
// -----------------------------------------------------------------------------
// 🔐 Middleware de autenticação:
//     Garante que apenas usuários com token JWT válido possam acessar.
// 🛡️ Middleware de permissão:
//     Controla acesso com base no papel do usuário (RBAC - Role-Based Access Control).
// -----------------------------------------------------------------------------

const express = require('express');
const router = express.Router();

// 🔄 Importação dos middlewares de autenticação e permissão
const verificarTokenJWT = require('../middlewares/authMiddleware');
const verificarPermissao = require('../middlewares/verificarPermissao');

// -----------------------------------------------------------------------------
// 🔐 ROTA: GET /api/admin/painel
// -----------------------------------------------------------------------------
/*
  ✅ Acesso restrito ao papel: "admin"
  ✅ Exige token JWT válido
  ✅ Retorna mensagem personalizada com nome do usuário autenticado
*/
router.get(
  '/admin/painel',
  verificarTokenJWT,               // Verifica se o token JWT é válido
  verificarPermissao(['admin']),   // Verifica se o usuário tem papel 'admin'
  (req, res) => {
    res.status(200).json({
      status: 'sucesso',
      mensagem: `Bem-vinda ao painel de administração, ${req.usuario.nome}`,
      usuario: req.usuario
    });
  }
);

// -----------------------------------------------------------------------------
// 🔒 ROTA: GET /api/editar-conteudo
// -----------------------------------------------------------------------------
/*
  ✅ Acesso permitido aos papéis: "admin" e "editor"
  ✅ Exige token JWT válido
  ✅ Retorna mensagem de permissão para edição de conteúdo
*/
router.get(
  '/editar-conteudo',
  verificarTokenJWT,                        // Validação do token JWT
  verificarPermissao(['admin', 'editor']),  // Acesso para admin ou editor
  (req, res) => {
    res.status(200).json({
      status: 'sucesso',
      mensagem: 'Você pode editar este conteúdo.',
      usuario: req.usuario
    });
  }
);

// -----------------------------------------------------------------------------

// 📤 Exporta o roteador para ser utilizado no app principal
module.exports = router;
