// =============================================================================================
// 📄 MenuPrincipal.jsx – Portal de Acesso com Comando "O bem me quer" ✨
// Projeto: O Bem Te Quer 💜 – Entrada mágica, voz ativa e navegação empática
// =============================================================================================

import React, { useEffect, useState, useRef } from 'react';   // 🧙 Importa React e hooks necessários
import { useNavigate } from 'react-router-dom'; // 🧭 Navegação entre páginas
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; // 🎤 Reconhecimento de voz
import { falar, iniciarEscuta, pararEscuta } from '../../utils/vozController';  // 🔊 Função de fala empática
import { FrasesVoz } from "../Acessibilidade/frasesVoz"; // 🧠 Frases padronizadas para voz
import '../../global.css';

export default function MenuPrincipal() {
  const navigate = useNavigate();
  const jaIniciou = useRef(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [erro, setErro] = useState(false);

  // 🧠 Interpreta a frase mágica
  const interpretarFrase = (texto) => {
    const comando = texto.toLowerCase().trim();
    console.log('🎙️ Frase detectada:', comando);

    if (comando.includes('o bem me quer')) {
      falar('Frase mágica reconhecida. Portal sendo aberto...', () => navigate('/menu-escolha'));
    } else if (comando.length > 3 && !erro) {
      setErro(true);
      falar('Não entendi. Por favor, diga: "O bem me quer".', () => iniciarEscuta(interpretarFrase));
    }

    resetTranscript();
  };

  // 🚀 Inicia a escuta somente após voz carregada e clique do usuário
  const ativarPortal = () => {
    if (jaIniciou.current) return;
    jaIniciou.current = true;

    pararEscuta();
    falar('Para abrir o portal, diga em voz alta: "O bem me quer"', () => iniciarEscuta(interpretarFrase));
  };

  // 🖼️ Tema visual da entrada
  useEffect(() => {
    document.body.className = 'tema-wallpaper-arquivo';
  }, []);

  // 🔄 Detecta fala
  useEffect(() => {
    if (!transcript.trim()) return;
    interpretarFrase(transcript);
  }, [transcript]);

  return (
    <div className="flex items-center justify-center min-h-screen fade-in bg-black/90">
      <div className="max-w-2xl p-10 text-center text-white border border-purple-500 shadow-2xl rounded-3xl backdrop-blur-md bg-black/70">

        <h1 className="mb-4 text-4xl font-bold text-indigo-300 animate-pulse">
          ✨ O Portal Secreto do Bem
        </h1>

        <p className="mb-6 text-lg text-indigo-100">
          Um santuário de acolhimento, voz e amor. Para iniciar a experiência, diga:
        </p>

        <p className="mb-6 text-2xl font-semibold text-emerald-300">
          "O bem me quer"
        </p>

        <button
          onClick={ativarPortal}
          className="px-6 py-3 mt-4 text-lg font-semibold transition-all bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-xl hover:scale-105"
        >
          🗣️ Dizer a frase mágica
        </button>

        <p className="mt-6 text-sm text-indigo-200">
          Reconhecimento por voz ativo. Ou entre pelo botão manual abaixo:
        </p>

        <button
          onClick={() => navigate('/menu-escolha')}
          className="w-full px-6 py-3 mt-4 font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl hover:scale-105"
        >
          🚪 Entrar Manualmente
        </button>

      </div>
    </div>
  );
}

// =============================================================================================
// 🪄 Fim do MenuPrincipal.jsx – Portal com "O bem me quer"
// =============================================================================================
