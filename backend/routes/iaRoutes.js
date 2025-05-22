// ------------------------------
// ARQUIVO: routes/ia/iaRoutes.js
// ------------------------------
// Define as rotas relacionadas à Inteligência Artificial (OpenAI/Gemini).
// Essas rotas serão responsáveis por interagir com serviços externos de IA,
// como geração de texto, resposta automática, entre outros.

const express = require('express');
const router = express.Router();

// Controller responsável por processar as requisições de IA
const iaController = require('../../controllers/ia/iaController');

// Rota: POST /api/ia/mensagem
// Objetivo: Enviar uma mensagem para o modelo de IA (OpenAI) e receber uma resposta.
router.post('/mensagem', iaController.enviarMensagemIA);

// Exporta as rotas para serem usadas no app principal (index.js)
module.exports = router;
