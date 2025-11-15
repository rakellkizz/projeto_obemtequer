// ============================================================================================
// 📁 ARQUIVO: routes/chatRoutes.js
// DESCRIÇÃO: Rota para envio de mensagens à IA (OpenAI ou Gemini) e recebimento da resposta.
// Projeto: O Bem Te Quer 💜 – Interações empáticas e acessíveis
// ============================================================================================

const express = require('express');
const router = express.Router();

// 🤖 Controller que processa a mensagem com a IA e retorna a resposta
const chatController = require('../controllers/chatController');

// ============================================================================================
// 📌 POST /api/chat
// ▶️ Envia uma mensagem para a IA e retorna a resposta gerada
// 🛡️ Acesso: Público (pode ser protegido com JWT futuramente)
// ============================================================================================
router.post('/', chatController.processarMensagemIA);

// ============================================================================================
// ✅ Exporta as rotas para serem usadas no server.js
// ============================================================================================
module.exports = router;
