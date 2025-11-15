// ============================================================================================
// 📁 ARQUIVO: controllers/chatController.js
// DESCRIÇÃO: Controlador responsável por processar mensagens de chat enviadas ao backend,
//            encaminhar para a OpenAI (GPT-3.5 ou GPT-4) e retornar a resposta ao frontend.
// Projeto: O Bem Te Quer 💜 – Backend com acolhimento e inteligência
// ============================================================================================

const axios = require('axios'); // 📦 Cliente HTTP para enviar requisições à API da OpenAI
const createHttpError = require('../utils/createHttpError'); // 🔧 Função utilitária para lançar erros HTTP personalizados

/**
 * ============================================================================================
 * 📌 Função: processarMensagemIA
 * Rota:     POST /api/chat
 * Descrição:
 *    Recebe uma mensagem do usuário, envia para a OpenAI, e devolve a resposta gerada.
 * ============================================================================================
 */
const processarMensagemIA = async (req, res, next) => {
  try {
    const { mensagem } = req.body; // 📨 Extrai a mensagem do corpo da requisição

    // ✅ Validação: Garante que a mensagem seja uma string válida
    if (!mensagem || typeof mensagem !== 'string') {
      throw createHttpError(400, '❗ A mensagem é obrigatória e deve ser uma string.');
    }

    // 🔐 Busca a chave da API da OpenAI no arquivo .env
    //const apiKey = process.env.OPENAI_API_KEY;
    //if (!apiKey) {
    //throw createHttpError(500, '❗ Chave da API OpenAI não configurada. Verifique o arquivo .env.');
   const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
  throw createHttpError(500, '❗ Chave da API OpenAI não configurada. Verifique o arquivo .env.');
}

  }

    // 📡 Envia a mensagem para a OpenAI com modelo GPT
    const resposta = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // 🤖 Modelo de IA (pode ser alterado para gpt-4 no futuro)
        messages: [{ role: 'user', content: mensagem }], // 💬 Mensagem do usuário
        temperature: 0.7, // 🎯 Grau de criatividade (0 = resposta exata, 1 = mais criativa)
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`, // 🔐 Token de acesso da OpenAI
          'Content-Type': 'application/json'
        }
      }
    );

    // ✅ Extrai a resposta textual da IA
    const respostaIA = resposta?.data?.choices?.[0]?.message?.content;

    // ⚠️ Caso a IA não tenha retornado resposta válida
    if (!respostaIA) {
      throw createHttpError(502, '❌ A resposta da IA veio vazia ou com formato inválido.');
    }

    // 🚀 Retorna a resposta como string simples (💡 CORREÇÃO PARA O FRONT FUNCIONAR)
    res.status(200).send(respostaIA); // 🔁 Agora retorna texto puro diretamente

  } catch (erro) {
    // 🐞 Log de erro no terminal (útil para depuração)
    console.error('❌ Erro ao comunicar com a OpenAI:', erro.message || erro);

    // 🔁 Encaminha o erro para o middleware de tratamento global
    next(erro);
  }
};

// ============================================================================================
// ✅ Exporta o controlador para uso nas rotas
// ============================================================================================
module.exports = {
  processarMensagemIA,
};
