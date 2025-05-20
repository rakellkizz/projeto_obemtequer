// ------------------------------
// ARQUIVO: src/routes/chatRoutes.js
// ------------------------------
// Define a rota de chat com IA, integrando os serviços Gemini (Google) e OpenAI (ChatGPT).
// Escolha dinâmica de modelo de IA com fallback para Gemini como padrão.
// ------------------------------

const express = require('express');
const router = express.Router();

// ------------------------------
// 1. IMPORTAÇÃO DOS SERVIÇOS DE IA
// ------------------------------
const responderComGemini = require('../services/geminiService');   // Serviço Gemini
const responderComOpenAI = require('../services/openaiService');   // Serviço OpenAI

// ------------------------------
// 2. ROTA POST /chat
// ------------------------------
/**
 * @route   POST /chat
 * @desc    Recebe uma mensagem e retorna uma resposta gerada por IA (Gemini ou OpenAI)
 * @access  Público
 * @body    { mensagem: string, modelo?: 'openai' | 'gemini' }
 */
router.post('/chat', async (req, res) => {
  const { mensagem, modelo } = req.body;

  // ------------------------------
  // 2.1 VALIDAÇÃO DA REQUISIÇÃO
  // ------------------------------
  if (!mensagem || typeof mensagem !== 'string' || mensagem.trim() === '') {
    return res.status(400).json({
      erro: '⚠️ Campo "mensagem" é obrigatório e deve ser uma string válida.',
    });
  }

  try {
    let resposta;

    // ------------------------------
    // 2.2 ESCOLHA DO MODELO DE IA
    // ------------------------------
    switch (modelo?.toLowerCase()) {
      case 'openai':
        resposta = await responderComOpenAI(mensagem);
        break;
      case 'gemini':
      default:
        resposta = await responderComGemini(mensagem);
        break;
    }

    // ------------------------------
    // 2.3 RESPOSTA SUCESSO
    // ------------------------------
    res.status(200).json({ resposta });

  } catch (erro) {
    // ------------------------------
    // 2.4 TRATAMENTO DE ERROS
    // ------------------------------
    console.error('❌ Erro ao gerar resposta com IA:', erro);
    res.status(500).json({
      erro: 'Erro ao processar a resposta da IA. Tente novamente mais tarde.',
    });
  }
});

// ------------------------------
// 3. EXPORTAÇÃO DO ROUTER
// ------------------------------
module.exports = router;
