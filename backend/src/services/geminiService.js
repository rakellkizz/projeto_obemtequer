// =========================================================================================
// 📁 ARQUIVO: src/services/geminiService.js
// DESCRIÇÃO: Serviço que se comunica com o modelo Gemini da Google para gerar respostas de IA
// =========================================================================================

import { GoogleGenerativeAI } from '@google/generative-ai'; // 🤖 Cliente oficial da Gemini
import dotenv from 'dotenv';
dotenv.config(); // 🔐 Carrega as variáveis do .env (caso necessário neste contexto)

// 🔑 Chave da API Gemini (definida em .env)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * 📌 Envia uma mensagem para o modelo Gemini e retorna a resposta textual
 * @param {string} mensagem - Texto enviado pelo usuário
 * @returns {Promise<string>} - Texto gerado pela IA
 */
export async function responderComGemini(mensagem) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(mensagem);
    const response = await result.response;

    return response.text(); // ✅ Retorna apenas o texto da IA
  } catch (erro) {
    console.error('❌ Erro ao se comunicar com a API Gemini:', erro.message);
    throw new Error('Falha ao obter resposta da IA Gemini.');
  }
}
