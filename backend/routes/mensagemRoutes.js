// -----------------------------------------------------------------------------
// ARQUIVO: routes/chatRoutes.js
// -----------------------------------------------------------------------------
// Esta rota envia a mensagem do usuário para a IA (OpenAI ou Gemini) e retorna
// a resposta gerada. Não salva no banco de dados — apenas interação direta com IA.
// ----------------------------------------------------------------------------- 

const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// -----------------------------------------------------------------------------
// @route   POST /api/chat
// @desc    Envia uma mensagem para a IA e retorna a resposta gerada
// @access  Público (ou adicione authMiddleware se quiser proteger)
// -----------------------------------------------------------------------------
router.post('/', chatController.processarMensagemIA);

module.exports = router;
