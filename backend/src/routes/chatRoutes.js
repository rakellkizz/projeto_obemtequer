// =========================================================================================
// 📁 ARQUIVO: routes/chatRoutes.js
// DESCRIÇÃO: Rota de conversa com a IA (OpenAI ou Gemini) protegida por autenticação JWT
// Somente usuários autenticados podem acessar essa funcionalidade com empatia 💜
// =========================================================================================

import express from 'express';
import { processarMensagemIA } from '../controllers/chatController.js';     // 🤖 Controlador da IA
import verificarTokenJWT from '../middlewares/authMiddleware.js';           // 🔐 Protege com JWT

const router = express.Router();

// =========================================================================================
// 📌 POST /chat
// ▶️ Envia mensagem do usuário para a IA e retorna resposta gerada
// 🛡️ Protegido por JWT
// =========================================================================================
router.post('/chat', verificarTokenJWT, processarMensagemIA);

// =========================================================================================
// ✅ Exporta o router para uso no server.js
// =========================================================================================
export default router;
