// ========================================================================================
// 📁 ARQUIVO: routes/authRoutes.js
// DESCRIÇÃO: Rotas de autenticação para registro, login e perfil do projeto "O Bem Te Quer"
// Protegidas com JWT e validadas com express-validator
// ========================================================================================

import express from 'express';
const router = express.Router();

// 🎯 Controladores (lógica das rotas)
import {
  registrarUsuario,
  loginUsuario,
  buscarUsuarioPorId
} from '../controllers/userController.js';

// 🔐 Middleware de autenticação por token JWT
import verificarTokenJWT from '../middlewares/authMiddleware.js';

// 📋 Validações de entrada
import { validarRegistro, validarLogin } from '../validators/userValidator.js';
import validarCampos from '../validators/validarCampos.js'; // 🔎 Verifica erros após validação

// ========================================================================================
// 📌 ROTAS PÚBLICAS
// ========================================================================================

// ▶️ POST /registrar
// Cadastra um novo usuário
router.post('/registrar', validarRegistro, validarCampos, registrarUsuario);

// ▶️ POST /login
// Realiza login e retorna token
router.post('/login', validarLogin, validarCampos, loginUsuario);

// ========================================================================================
// 📌 ROTAS PRIVADAS (token obrigatório)
// ========================================================================================

// ▶️ GET /me
// Retorna o perfil do usuário autenticado
router.get('/me', verificarTokenJWT, (req, res) => {
  res.status(200).json({
    mensagem: 'Usuário autenticado com sucesso!',
    usuario: req.usuario
  });
});

// ▶️ GET /:id
// Busca usuário por ID
router.get('/:id', verificarTokenJWT, buscarUsuarioPorId);

// ========================================================================================
// ✅ Exporta para uso no server.js (prefixo será: /api/usuarios)
// ========================================================================================
export default router;
