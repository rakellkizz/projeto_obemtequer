// src/services/geminiService.js

// Importa a biblioteca oficial do Google para usar o modelo Gemini
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Instancia o cliente da API Gemini usando a chave de ambiente configurada no .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Função responsável por enviar a mensagem para o modelo Gemini
 * e retornar a resposta em formato de texto.
 *
 * @param {string} mensagem - Texto enviado pelo usuário.
 * @returns {Promise<string>} - Texto gerado pela IA.
 */
async function responderComGemini(mensagem) {
  // Seleciona o modelo "gemini-pro", ideal para NLP e interações em linguagem natural
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  // Envia a mensagem para o modelo e aguarda o conteúdo gerado
  const result = await model.generateContent(mensagem);

  // Extrai a resposta final do resultado
  const response = await result.response;

  // Retorna apenas o texto da resposta
  return response.text();
}

// Exporta a função para ser usada em outras partes da aplicação
module.exports = responderComGemini;
