// ============================================================================
// 📁 userRoutes.js – Rotas e controladores de usuários
// Projeto: O Bem Te Quer 💜 – Registro, login e busca de usuários
// ============================================================================

const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const router = express.Router();

// ============================================================================
// 📌 Modelo do Usuário (Mongoose Schema + Model)
// ============================================================================
const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  senha: {
    type: String,
    required: true
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// ============================================================================
// ✅ Validações
// ============================================================================

// Validação para registro
function validarRegistro(req, res, next) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }

  if (senha.length < 6) {
    return res.status(400).json({ erro: 'A senha deve ter no mínimo 6 caracteres' });
  }

  next();
}

// Validação para login
function validarLogin(req, res, next) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  next();
}

// ============================================================================
// 🎯 Controladores
// ============================================================================

// GET /api/usuarios/:id – Buscar usuário pelo ID
async function buscarUsuarioPorId(req, res) {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-senha');
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.status(200).json(usuario);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar usuário por ID' });
  }
}

// POST /api/usuarios/registro – Registro
async function registroUsuarioController(req, res) {
  const { nome, email, senha } = req.body;

  try {
    const existente = await Usuario.findOne({ email });
    if (existente) return res.status(400).json({ erro: 'Email já registrado' });

    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    const novoUsuario = new Usuario({ nome, email, senha: senhaCriptografada });
    await novoUsuario.save();

    res.status(201).json({
      mensagem: 'Usuário registrado com sucesso',
      usuario: { nome, email }
    });

  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao registrar usuário' });
  }
}

// POST /api/usuarios/login – Login
async function loginUsuarioController(req, res) {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ erro: 'Usuário não encontrado' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ erro: 'Senha incorreta' });

    res.status(200).json({
      mensagem: 'Login bem-sucedido',
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email
      }
    });

  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao realizar login' });
  }
}

// ============================================================================
// 🔗 Rotas
// ============================================================================
router.get('/:id', buscarUsuarioPorId);
router.post('/registro', validarRegistro, registroUsuarioController);
router.post('/login', validarLogin, loginUsuarioController);

// ============================================================================
// 🚀 Exportação
// ============================================================================
module.exports = router;
