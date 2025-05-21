// -----------------------------------------------------------------------------
// ARQUIVO: routes/chatRoutes.js
// -----------------------------------------------------------------------------
// Esta rota envia a mensagem do usuário para a IA (OpenAI ou Gemini) e retorna
// a resposta gerada. Protegida por JWT via authMiddleware.
// ----------------------------------------------------------------------------- 

const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Importa middleware de autenticação
const authMiddleware = require('../middlewares/authMiddleware');

// -----------------------------------------------------------------------------
// @route   POST /api/chat
// @desc    Envia uma mensagem para a IA e retorna a resposta gerada
// @access  Privado (JWT necessário)
// -----------------------------------------------------------------------------
router.post('/', authMiddleware, chatController.processarMensagemIA);

module.exports = router;
// -----------------------------------------------------------------------------