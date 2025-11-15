// ========================================================================================
// 📄 conexao.js – Serviço de conexão com o backend para conversar com a IA (Chatbot)
// Projeto: O Bem Te Quer 💜 – Comunicação entre frontend e backend com carinho e voz
// ========================================================================================

import axios from 'axios'; // 🔁 Biblioteca para requisições HTTP com suporte a Promises

// 🌐 URL base da API – ajuste a porta ou IP conforme o ambiente
const API_URL = 'http://localhost:5000'; // ✅ Use IP da máquina real se testar em dispositivos diferentes

/**
 * 🤖 enviarMensagemParaBot
 * Envia a mensagem do usuário para o backend (que usa OpenAI, Gemini ou IA local)
 * e retorna a resposta gerada pela inteligência artificial.
 *
 * @param {string} mensagem - Texto enviado pelo usuário no chat
 * @returns {Promise<string>} - Resposta gerada pela IA
 */
export async function enviarMensagemParaBot(mensagem) {
  try {
    // 🚀 Envia a mensagem para o endpoint da IA
    const resposta = await axios.post(`${API_URL}/api/chat`, { mensagem });

    // ✅ Retorna o conteúdo da resposta formatada do backend
    return resposta.data.resposta;
  } catch (erro) {
    // ❌ Captura e loga qualquer erro na comunicação com a API
    console.error('❌ Erro ao se comunicar com o bot:', erro.message);

    // 🆘 Resposta padrão em caso de falha
    return '⚠️ Ocorreu um erro ao falar com a IA. Tente novamente em instantes.';
  }
}

// ========================================================================================
// ✅ FIM do arquivo conexao.js – 100% funcional, sem duplicações e com axios
// ========================================================================================
