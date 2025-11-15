// ===========================================================================================
// 📁 ARQUIVO: controllers/iaController.js
// DESCRIÇÃO: Controlador para lidar com geração de resposta via OpenAI
// - Recebe o prompt do usuário
// - Valida o conteúdo
// - Repassa para o serviço de IA (OpenAI ou Gemini)
// ===========================================================================================

const createError = require('http-errors');                     // 📦 Geração padronizada de erros HTTP
const openaiService = require('../services/openaiService');     // 🤖 Serviço de comunicação com OpenAI

// ===========================================================================================
// 📌 POST /api/ia/chat – Gera resposta de IA com base no prompt
// ===========================================================================================
/**
 * Gera uma resposta a partir de um prompt de texto fornecido pelo usuário.
 *
 * @route   POST /api/ia/chat
 * @access  Público (ou protegido, dependendo do middleware aplicado na rota)
 */
const gerarRespostaIA = async (req, res, next) => {
  try {
    const { prompt } = req.body; // 📨 Extrai o prompt do corpo da requisição

    // 🛑 Validação: Verifica se o prompt é uma string válida
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      throw createError(400, '❗ Prompt inválido. Envie um texto no formato correto.');
    }

    // 🎯 Chama o serviço de IA para obter a resposta
    const resposta = await openaiService.gerarResposta(prompt);

    // ✅ Retorna a resposta estruturada
    res.status(200).json({
      sucesso: true,
      resposta
    });

  } catch (erro) {
    // ⚠️ Encaminha o erro para o middleware global
    next(erro);
  }
};

// ===========================================================================================
// ✅ Exporta os métodos para uso nas rotas
// ===========================================================================================
module.exports = {
  gerarRespostaIA,
};
