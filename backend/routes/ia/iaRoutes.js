// ------------------------------
// ARQUIVO DE ROTAS: iaRoutes.js
// ------------------------------
// Responsável por definir as rotas que lidam com requisições
// relacionadas à Inteligência Artificial do sistema, como
// geração de respostas via OpenAI/Gemini.
// ------------------------------

const express = require('express');         // Importa o Express para criar rotas
const router = express.Router();              // Instancia o roteador do Express

// Importa o controller que contém a lógica das requisições de IA
const iaController = require('../../controllers/iaController');

// -----------------------------------------------------
// DEFINIÇÃO DAS ROTAS DE IA
// -----------------------------------------------------

/**
 * @route   POST /api/ia/chat
 * @desc    Recebe um prompt do usuário e retorna a resposta gerada pela IA
 * @access  Público ou autenticado conforme configuração do middleware
 */
router.post('/chat', iaController.gerarRespostaIA);

// Exemplo de outras rotas possíveis para IA, futuramente:
// router.post('/image-generation', iaController.generateImage);
// router.get('/status', iaController.getStatus);

module.exports = router;  // Exporta o router para uso no app principal
