// ----------------------------------------
// SERVIÇO: openaiService.js
// ----------------------------------------
// Responsável por realizar a comunicação com a API da OpenAI.
// Recebe prompts (textos) e retorna respostas geradas pelo modelo
// de linguagem da OpenAI, de forma assíncrona e tratada.
// ----------------------------------------

const axios = require('axios');              // Biblioteca para realizar requisições HTTP
const createError = require('http-errors'); // Para gerar erros HTTP amigáveis

// Recupera a chave da API do ambiente seguro (.env)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Endpoint oficial da API de chat completions da OpenAI
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Envia um prompt para o modelo de linguagem da OpenAI e retorna a resposta gerada.
 * 
 * @async
 * @function gerarResposta
 * @param {string} prompt - Texto enviado pelo usuário para a IA processar.
 * @throws {HttpError} - Lança erro caso a API não responda ou ocorra falha na requisição.
 * @returns {Promise<string>} - Texto gerado pela IA em resposta ao prompt.
 */
const gerarResposta = async (prompt) => {
  try {
    // Configura o corpo da requisição conforme especificação da API OpenAI Chat Completions
    const requestBody = {
      model: 'gpt-3.5-turbo', // Pode ser trocado para 'gpt-4' se autorizado
      messages: [
        {
          role: 'system',
          content: 'Você é uma IA empática e acolhedora, pronta para ajudar o usuário da melhor forma.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7, // Controla o grau de criatividade da resposta (0-1)
      max_tokens: 500,  // Limita o tamanho da resposta gerada
    };

    // Realiza a requisição POST para a API da OpenAI com os headers de autenticação e tipo de conteúdo
    const response = await axios.post(OPENAI_API_URL, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    });

    // Extrai a resposta textual do JSON retornado pela API, caso exista
    const resposta = response.data?.choices?.[0]?.message?.content?.trim();

    // Validação: Se a resposta estiver vazia ou indefinida, gera erro
    if (!resposta) {
      throw createError(502, '⚠️ Não foi possível obter resposta da IA.');
    }

    // Retorna a resposta obtida da IA para uso posterior
    return resposta;

  } catch (erro) {
    // Loga o erro no console para facilitar debugging
    console.error('Erro ao consultar a OpenAI:', erro.message);

    // Se a API retornar um erro com status HTTP, usa ele; senão, status 500 (erro interno)
    const status = erro.response?.status || 500;

    // Lança um erro HTTP personalizado para o middleware de tratamento capturar e responder
    throw createError(status, '❌ Falha ao gerar resposta com a IA.');
  }
};

// Exporta a função para ser usada em outros módulos da aplicação
module.exports = {
  gerarResposta,
};
