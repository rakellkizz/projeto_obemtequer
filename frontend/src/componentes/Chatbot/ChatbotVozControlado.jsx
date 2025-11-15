// ========================================================================================
// 📄 ChatbotVozControlado.jsx – Comandos de Voz do Chatbot Victor 🎙️
// Projeto: O Bem Te Quer 💜 – Ativa ações como "quero jogar xadrez" por comando de voz
// ========================================================================================

import { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Chess } from 'chess.js'; // ♟️ Lógica do jogo de xadrez
/**
 * 🎤 Hook customizado para controlar comandos de voz específicos do Chatbot
 * Exemplo: ao dizer "quero jogar xadrez", ativa a função passada como parâmetro.
 *
 * @param {function} acaoXadrez - Função chamada quando o usuário disser "xadrez"
 */
export default function ChatbotVozControlado({ ativarXadrez }) {
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) return;

    // 🎧 Inicia escuta contínua em português
    SpeechRecognition.startListening({ continuous: true, language: 'pt-BR' });

    // 🧠 Verifica se o comando "xadrez" foi falado
    if (transcript.toLowerCase().includes('xadrez')) {
      ativarXadrez?.();     // ✅ Ativa o tabuleiro
      resetTranscript();    // 🧹 Limpa para evitar repetição
    }
  }, [transcript]);

  return null; // Este componente não renderiza nada visível
}

// ========================================================================================
// 📝 FIM DO HOOK ChatbotVozControlado.jsx
