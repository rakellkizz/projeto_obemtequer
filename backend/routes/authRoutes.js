// --------------------------------------------------------------------
// ARQUIVO: routes/authRoutes.js
// --------------------------------------------------------------------
// Rotas relacionadas à autenticação de usuários:
// - Registro de novo usuário
// - Login de usuário existente
// - Consulta do próprio perfil autenticado (rota protegida)
// - Consulta de usuário por ID
// --------------------------------------------------------------------

const express = require('express');
const router = express.Router();

// Importa as funções do controlador (lógica de autenticação)
const {
  registrarUsuario,
  loginUsuario,
  buscarUsuarioPorId
} = require('../controllers/userController');

// Middleware de autenticação (protege rotas privadas)
const verificarTokenJWT = require('../middlewares/authMiddleware');

// Importa os validadores de dados para registro e login
const { validarRegistro, validarLogin } = require('../validators/userValidator');

// Middleware que verifica se as validações geraram erros
const validarCampos = require('../validators/validarCampos');

// ---------------------------------------------------------
// @route   POST /api/usuarios/registrar
// @desc    Cadastra um novo usuário na base de dados
// @access  Público
// ---------------------------------------------------------
router.post('/registrar', validarRegistro, validarCampos, registrarUsuario);

// ---------------------------------------------------------
// @route   POST /api/usuarios/login
// @desc    Autentica o usuário e retorna um token JWT
// @access  Público
// ---------------------------------------------------------
router.post('/login', validarLogin, validarCampos, loginUsuario);

// ---------------------------------------------------------
// @route   GET /api/usuarios/me
// @desc    Retorna os dados do usuário autenticado (baseado no token)
// @access  Privado (requer token JWT válido)
// ---------------------------------------------------------
router.get('/me', verificarTokenJWT, (req, res) => {
  res.status(200).json({
    mensagem: 'Usuário autenticado com sucesso!',
    usuario: req.usuario
  });
});

// ---------------------------------------------------------
// @route   GET /api/usuarios/:id
// @desc    Retorna os dados de um usuário pelo ID
// @access  Privado (requer token JWT válido)
// ---------------------------------------------------------
router.get('/:id', verificarTokenJWT, buscarUsuarioPorId);

// Exporta as rotas para serem utilizadas no server.js
module.exports = router;
