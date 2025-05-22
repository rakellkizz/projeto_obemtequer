// -----------------------------------------------------------------------------
// ARQUIVO: controllers/chatController.js
// -----------------------------------------------------------------------------
// ✅ OBJETIVO:
// Este controller envia a entrada do usuário para a OpenAI e retorna a resposta
// gerada. Utiliza o modelo GPT-3.5-turbo ou GPT-4 e requer a chave no .env.
// -----------------------------------------------------------------------------
// ✅ EXEMPLO DE USO:
// POST /api/chat
// body: { "mensagem": "Olá, IA!" }
// -----------------------------------------------------------------------------

const axios = require('axios');
const createHttpError = require('../utils/createHttpError'); // ✅ Importa função de erro customizada

/**
 * Processa a mensagem enviada pelo usuário e retorna a resposta da IA (OpenAI).
 * @param {*} req - Objeto de requisição Express.
 * @param {*} res - Objeto de resposta Express.
 * @param {*} next - Função para passar controle ao middleware de erro.
 */
const processarMensagemIA = async (req, res, next) => {
  try {
    const { mensagem } = req.body;

    // ✅ Validação da entrada: mensagem deve existir e ser string
    if (!mensagem || typeof mensagem !== 'string') {
      throw createHttpError(400, 'A mensagem é obrigatória e deve ser uma string.');
    }

    const apiKey = process.env.OPENAI_API_KEY;

    // ✅ Verifica se a chave da API OpenAI está configurada
    if (!apiKey) {
      throw createHttpError(500, 'Chave da API OpenAI não configurada no ambiente.');
    }

    // ✅ Realiza requisição POST para o endpoint da OpenAI
    const resposta = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // Pode ser 'gpt-4' se desejar
        messages: [{ role: 'user', content: mensagem }],
        temperature: 0.7, // Controla criatividade/resposta do modelo
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // ✅ Extrai a resposta da IA do objeto retornado pela API
    const respostaIA = resposta?.data?.choices?.[0]?.message?.content;

    // Se a resposta da IA for inválida, lança erro
    if (!respostaIA) {
      throw createHttpError(502, 'Resposta inválida recebida da OpenAI.');
    }

    // ✅ Envia a resposta da IA para o cliente em formato JSON
    res.json({ resposta: respostaIA });

  } catch (erro) {
    // Loga o erro no console para debugging
    console.error('❌ Erro ao comunicar com a OpenAI:', erro.message || erro);

    // Passa o erro para o middleware global de tratamento de erros
    next(erro);
  }
};

module.exports = {
  processarMensagemIA,
};
