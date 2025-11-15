// =========================================================================================
// 📁 ARQUIVO: routes/iaRoutes.js
// DESCRIÇÃO: Define rotas relacionadas à Inteligência Artificial do sistema
// Exemplos: geração de texto (chat), imagem, status da IA
// =========================================================================================

import express from 'express';
import { gerarRespostaIA } from '../controllers/iaController.js'; // 🤖 Lógica principal da IA

const router = express.Router();

// =========================================================================================
// 📌 POST /chat
// ▶️ Envia um prompt e recebe uma resposta gerada pela IA
// Acesso: Público por enquanto (pode adicionar JWT depois)
// =========================================================================================
router.post('/chat', gerarRespostaIA);

// 🔮 Futuras rotas da IA:
// router.post('/image-generation', gerarImagemIA);
// router.get('/status', statusDaIA);

export default router;
