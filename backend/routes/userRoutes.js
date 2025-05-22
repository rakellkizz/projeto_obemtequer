const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rota para criar um novo usuário
router.post('/', async (req, res) => {
  try {
    const novoUsuario = new User(req.body);
    const usuarioSalvo = await novoUsuario.save();
    res.status(201).json(usuarioSalvo);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

// Rota para listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

module.exports = router;
