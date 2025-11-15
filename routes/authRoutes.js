// -----------------------------------------------------------------------------
// ARQUIVO: routes/userRoutes.js
// -----------------------------------------------------------------------------
// 🚀 Rotas para gerenciamento de usuários
// CRUD básico: criação e listagem de usuários.
// Pode ser expandido para atualizar, deletar, autenticação, etc.
// -----------------------------------------------------------------------------

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// -----------------------------------------------------------------------------
// ROTA: POST /
// Cria um novo usuário no banco de dados.
// -----------------------------------------------------------------------------
router.post('/', async (req, res, next) => {
  try {
    // Cria instância do usuário com dados da requisição
    const novoUsuario = new User(req.body);

    // Salva no banco e obtém o registro salvo
    const usuarioSalvo = await novoUsuario.save();

    // Retorna o usuário criado com status 201 (Created)
    res.status(201).json(usuarioSalvo);
  } catch (erro) {
    // Passa o erro para o middleware de tratamento centralizado
    next(erro);
  }
});

// -----------------------------------------------------------------------------
// ROTA: GET /
// Lista todos os usuários cadastrados.
// -----------------------------------------------------------------------------
// Caso queira proteger esta rota, adicione seu middleware de autenticação aqui:
// ex: router.get('/', verificarTokenJWT, async (req, res, next) => { ... });
router.get('/', async (req, res, next) => {
  try {
    // Busca todos usuários no banco
    const usuarios = await User.find();

    // Retorna a lista como JSON
    res.json(usuarios);
  } catch (erro) {
    // Passa o erro para o middleware de tratamento centralizado
    next(erro);
  }
});

module.exports = router;
