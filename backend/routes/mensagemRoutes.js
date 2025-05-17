// ------------------------------
// ARQUIVO: mensagemRoutes.js
// ------------------------------
// Define as rotas específicas para manipulação das mensagens do chatbot,
// incluindo envio e listagem de mensagens no banco MongoDB.

// ------------------------------
// 1. IMPORTAÇÕES NECESSÁRIAS
// ------------------------------
const express = require('express');                  
const router = express.Router();                     
const Mensagem = require('../models/Mensagem');      
const validarMensagem = require('../validators/mensagemValidator'); 
const { validationResult } = require('express-validator'); 

// ------------------------------
// 2. ROTA POST: Criar e salvar nova mensagem
// Endpoint: POST /api/mensagens
// ------------------------------
router.post('/', validarMensagem, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const novaMensagem = new Mensagem(req.body);
    await novaMensagem.save();
    res.status(201).json(novaMensagem);
  } catch (err) {
    next(err); // Encaminha erro para o errorMiddleware
  }
});

// ------------------------------
// 3. ROTA GET: Listar todas as mensagens
// Endpoint: GET /api/mensagens
// ------------------------------
router.get('/', async (req, res, next) => {
  try {
    const mensagens = await Mensagem.find().sort({ data: -1 });
    res.status(200).json(mensagens);
  } catch (err) {
    next(err); // Encaminha erro para o errorMiddleware
  }
});

// ------------------------------
// 4. EXPORTAÇÃO DO ROUTER
// ------------------------------
module.exports = router;
