// -------------------------------------------------------------
// ARQUIVO: routes/userRoutes.js
// -------------------------------------------------------------
// Define as rotas relacionadas aos usuários, como cadastro, login,
// listagem e busca por ID. Usa o controller para separar a lógica.
// -------------------------------------------------------------

const express = require('express');
const router = express.Router();
const {
  buscarUsuarioPorId,
  registrarUsuario,
  loginUsuario
} = require('../controllers/userController');

// -------------------------------------------------------------
// @route   POST /api/usuarios/register
// @desc    Cadastra um novo usuário
// @access  Público
// -------------------------------------------------------------
router.post('/register', registrarUsuario);

// -------------------------------------------------------------
// @route   POST /api/usuarios/login
// @desc    Realiza login de um usuário
// @access  Público
// -------------------------------------------------------------
router.post('/login', loginUsuario);

// -------------------------------------------------------------
// @route   GET /api/usuarios/:id
// @desc    Retorna dados de um usuário pelo ID
// @access  Público
// -------------------------------------------------------------
router.get('/:id', buscarUsuarioPorId);

module.exports = router;
