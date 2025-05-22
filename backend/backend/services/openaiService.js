// src/services/openaiService.js

// Importa o cliente oficial da biblioteca OpenAI
const { OpenAI } = require('openai');

// Cria uma instância do cliente OpenAI, utilizando a chave de API armazenada em variáveis de ambiente (.env)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Função responsável por enviar uma mensagem para o modelo da OpenAI
 * e retornar a resposta gerada pela IA.
 *
 * @param {string} mensagem - Entrada do usuário.
 * @returns {Promise<string>} - Resposta da IA em formato de texto.
 */
async function responderComOpenAI(mensagem) {
  try {
    // Cria uma nova conversa no modelo de chat (chat completion)
    const completion = await openai.chat.completions.create({
      // Mensagem enviada pelo usuário no formato esperado pela OpenAI
      messages: [{ role: 'user', content: mensagem }],
      
      // Modelo a ser utilizado (GPT-3.5 por padrão, pode ser alterado para GPT-4)
      model: 'gpt-3.5-turbo',

      // Você pode adicionar parâmetros adicionais aqui, como `temperature`, `max_tokens`, etc.
    });

    // Retorna a resposta textual gerada pela IA
    return completion.choices[0].message.content;

  } catch (error) {
    // Em caso de erro, exibe no console e retorna uma mensagem genérica
    console.error('Erro ao chamar OpenAI:', error.message);
    return 'Desculpe, houve um erro ao processar sua mensagem com o OpenAI.';
  }
}

// Exporta a função para ser usada em outros módulos da aplicação
module.exports = responderComOpenAI;
