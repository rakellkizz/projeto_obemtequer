const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  idade: {
    type: Number,
  },
}, {
  timestamps: true, // cria campos createdAt e updatedAt automaticamente
});

module.exports = mongoose.model('User', userSchema);
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// 📌 ROTA DE CADASTRO
router.post('/register', [
  check('nome').not().isEmpty().withMessage('Nome é obrigatório'),
  check('email').isEmail().withMessage('Email inválido'),
  check('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { nome, email, senha } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ erro: 'Usuário já existe' });

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    user = new User({ nome, email, senha: senhaHash });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(201).json({ token, nome: user.nome });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// 📌 ROTA DE LOGIN
router.post('/login', [
  check('email').isEmail().withMessage('Email inválido'),
  check('senha').exists().withMessage('Senha obrigatória')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ erro: 'Usuário não encontrado' });

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(400).json({ erro: 'Senha incorreta' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token, nome: user.nome });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
