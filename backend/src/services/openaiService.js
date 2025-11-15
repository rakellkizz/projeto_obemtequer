// ============================================================================================
// 📁 ARQUIVO: src/services/openaiService.js
// DESCRIÇÃO: Serviço para gerar respostas via OpenAI (GPT-3.5 ou GPT-4)
// Utiliza a biblioteca oficial da OpenAI e chave segura do .env
// ============================================================================================

import { OpenAI } from 'openai';       // 🤖 Cliente oficial da OpenAI
import dotenv from 'dotenv';
dotenv.config();                       // 🔐 Carrega variáveis de ambiente (como a chave da API)

// 🔑 Instancia o cliente com a chave segura
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * 📌 Envia uma mensagem para a OpenAI e retorna a resposta gerada pela IA
 * @param {string} mensagem - Texto enviado pelo usuário
 * @returns {Promise<string>} - Texto gerado pelo modelo
 */
export async function responderComOpenAI(mensagem) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // ou 'gpt-4'
      messages: [{ role: 'user', content: mensagem }],
      temperature: 0.7 // 🔄 Pode ajustar criatividade
    });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error('❌ Erro ao chamar OpenAI:', error.message);
    throw new Error('Falha ao obter resposta da IA OpenAI.');
  }
}
