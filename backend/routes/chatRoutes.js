// src/routes/chatRoutes.js

const express = require('express');
const router = express.Router();

// Serviços de IA: Gemini (Google) e OpenAI
const responderComGemini = require('../services/geminiService');
const responderComOpenAI = require('../services/openaiService');

/**
 * Rota POST /chat
 * Recebe uma mensagem e um modelo (opcional), e retorna a resposta da IA escolhida.
 * Se o modelo não for especificado ou for inválido, o padrão é usar o Gemini.
 */
router.post('/chat', async (req, res) => {
  const { mensagem, modelo } = req.body;

  // Validação da entrada
  if (!mensagem || typeof mensagem !== 'string') {
    return res.status(400).json({ erro: 'Mensagem é obrigatória e deve ser uma string.' });
  }

  try {
    let resposta;

    // Seleciona o modelo de IA com base no parâmetro "modelo"
    if (modelo === 'openai') {
      resposta = await responderComOpenAI(mensagem);
    } else {
      // Caso o modelo não seja informado ou seja diferente de "openai", usa Gemini como padrão
      resposta = await responderComGemini(mensagem);
    }

    // Envia a resposta da IA
    res.status(200).json({ resposta });

  } catch (erro) {
    console.error('Erro ao gerar resposta com IA:', erro);
    res.status(500).json({ erro: 'Erro ao processar a resposta da IA. Tente novamente mais tarde.' });
  }
});

module.exports = router;
