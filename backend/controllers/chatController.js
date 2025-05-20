// -----------------------------------------------------------------------------
// ARQUIVO: controllers/chatController.js
// -----------------------------------------------------------------------------
// Este controller envia a entrada do usuário para a OpenAI e retorna a resposta
// recebida. Modelo usado: gpt-3.5-turbo ou gpt-4. Requer chave no .env
// -----------------------------------------------------------------------------

const axios = require('axios');

const processarMensagemIA = async (req, res, next) => {
  try {
    const { mensagem } = req.body;

    if (!mensagem) {
      return res.status(400).json({ erro: 'A mensagem é obrigatória.' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ erro: 'Chave da API OpenAI não configurada.' });
    }

    const resposta = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // Ou 'gpt-4'
        messages: [{ role: 'user', content: mensagem }],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const respostaIA = resposta.data.choices[0].message.content;
    res.json({ resposta: respostaIA });

  } catch (erro) {
    console.error('Erro ao comunicar com IA:', erro);
    next(erro); // Middleware de erro global
  }
};

module.exports = { processarMensagemIA };
