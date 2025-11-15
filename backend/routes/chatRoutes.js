// ============================================================================================
// 📁 ARQUIVO: routes/chatRoutes.js
// DESCRIÇÃO: Rota pública para envio de mensagens à IA (OpenAI ou Gemini)
// Projeto: O Bem Te Quer 💜 – Comunicação acolhedora e sem exigência de login por token
// ============================================================================================

const express = require('express');
const router = express.Router();

// 🤖 Controller que processa a mensagem e envia à IA
const chatController = require('../controllers/chatController');

// ============================================================================================
// 📌 POST /api/chat
// ▶️ Envia uma mensagem para a IA e retorna a resposta gerada
// 🛡️ Acesso: Público – sem exigência de token JWT
// ============================================================================================

router.post('/', chatController.processarMensagemIA);

// ============================================================================================
// ✅ Exporta o roteador para ser usado no servidor principal (server.js)
// ============================================================================================
module.exports = router;
