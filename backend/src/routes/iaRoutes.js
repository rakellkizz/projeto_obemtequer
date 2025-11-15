// ============================================================================================
// 📁 ARQUIVO: routes/ia/iaRoutes.js
// DESCRIÇÃO: Define rotas específicas para serviços de Inteligência Artificial (OpenAI, Gemini)
// Exemplo: geração de texto, respostas automáticas, futuramente geração de imagens, etc.
// ============================================================================================

import express from 'express';
import { enviarMensagemIA } from '../../controllers/ia/iaController.js'; // 🤖 Controlador da IA

const router = express.Router();

// ============================================================================================
// 📌 POST /mensagem
// ▶️ Envia uma mensagem para o modelo de IA (OpenAI/Gemini) e recebe a resposta
// Acesso: Pode ser público ou protegido por JWT se desejar futuramente
// ============================================================================================
router.post('/mensagem', enviarMensagemIA);

// ✅ Exporta o router para ser usado no server.js
export default router;
