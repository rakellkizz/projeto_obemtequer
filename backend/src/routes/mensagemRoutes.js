// ============================================================================================
// 📁 ARQUIVO: routes/chatRoutes.js
// DESCRIÇÃO: Rota de conversa com a IA (OpenAI ou Gemini) para respostas empáticas 💜
// Acesso: Protegido com JWT para garantir segurança e contexto do usuário
// ============================================================================================

import express from 'express';
import { processarMensagemIA } from '../controllers/chatController.js'; // 🤖 Lógica de resposta da IA
import verificarTokenJWT from '../middlewares/authMiddleware.js';        // 🔐 Proteção com token JWT

const router = express.Router();

// ============================================================================================
// 📌 POST /chat
// ▶️ Envia a mensagem do usuário e retorna a resposta da IA (OpenAI ou Gemini)
// 🛡️ Protegido por JWT
// ============================================================================================
router.post('/chat', verificarTokenJWT, processarMensagemIA);

// ✅ Exporta o roteador para ser usado no server.js
export default router;
