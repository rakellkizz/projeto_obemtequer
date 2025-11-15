// =============================================================================================
// 📄 Home.jsx – Tela de Boas-vindas Inicial com Estilo, Reconhecimento de Voz e Inclusão 🌈
// Projeto: O Bem Te Quer 💜 – Portal de entrada empático, mágico e acessível
// =============================================================================================

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import portalImg from "../../assets/fundos/portal_imagem.png"; // 🌌 Imagem mágica de boas-vindas
import '../../global.css'; // 🎨 Estilo global com temas e animações

export default function Home() {
  const navigate = useNavigate();
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [interagiu, setInteragiu] = useState(false);
  const [listening, setListening] = useState(false);
  const jaIniciou = useRef(false);

  // =============================================================================================
  // 🔊 Fala empática que explica o portal mágico
  // =============================================================================================
  const falar = (mensagem, aoTerminar) => {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(mensagem);
    utter.lang = 'pt-BR';
    const vozes = speechSynthesis.getVoices();
    const voz = vozes.find(v => v.lang.includes('pt'));
    if (voz) utter.voice = voz;
    utter.onend = () => {
      if (aoTerminar) aoTerminar();
      if (!listening) iniciarEscuta();
    };
    speechSynthesis.speak(utter);
  };

  const iniciarEscuta = () => {
    try {
      SpeechRecognition.startListening({ continuous: true, language: 'pt-BR' });
      setListening(true);
    } catch (erro) {
      console.warn('🎙️ Erro ao ativar microfone:', erro);
      setListening(false);
    }
  };

  const pararEscuta = () => {
    try {
      SpeechRecognition.stopListening();
      setListening(false);
    } catch {}
  };

  // =============================================================================================
  // 🧠 Escuta a frase mágica personalizada "o bem me quer"
  // =============================================================================================
  useEffect(() => {
    const comando = transcript.toLowerCase().trim();
    if (!comando || !interagiu) return;

    if (comando.includes('o bem me quer')) {
      pararEscuta();
      falar('Portal mágico reconhecido. Entrando no universo de acolhimento...', () => navigate('/menu-escolha'));
    }
  }, [transcript, interagiu]);

  // =============================================================================================
  // 🌌 Estilização ao montar a tela
  // =============================================================================================
  useEffect(() => {
    document.body.className = 'tema-wallpaper-arquivo';
  }, []);

  const ativarSistema = () => {
    setInteragiu(true);
    resetTranscript();
    iniciarEscuta();
    setTimeout(() => {
      falar('Para abrir o portal mágico, diga com fé: "O bem me quer".');
    }, 300);
  };

  return (
    <div className="flex items-center justify-center min-h-screen fade-in bg-gradient-to-br from-indigo-700 via-purple-800 to-black">
      <div className="relative max-w-xl p-8 text-center text-white border border-purple-500 shadow-2xl rounded-3xl backdrop-blur-md bg-black/70">

        {/* 🌌 Imagem do portal mágico */}
        <img
          src={portalImg}
          alt="Portal de boas-vindas do Bem Te Quer"
          className="w-full max-w-md mx-auto mb-6 shadow-lg rounded-2xl"
        />

        {/* 💬 Descrição acolhedora */}
        <h1 className="mb-2 text-3xl font-bold text-emerald-300">
          Você está prestes a entrar em um universo de amizade e acolhimento 💜
        </h1>

        {/* ✨ Botão alternativo para iniciar manualmente */}
        {!interagiu && (
          <button
            onClick={ativarSistema}
            className="px-6 py-3 mt-4 text-lg font-semibold transition-all bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl hover:scale-105"
          >
            ✨ Quero entrar nesse universo
          </button>
        )}

        {/* 🔁 Acesso manual */}
        <button
          onClick={() => navigate('/menu-escolha')}
          className="px-6 py-3 mt-4 text-sm font-semibold transition-all bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-xl hover:scale-105"
        >
          🚪 Entrar sem voz
        </button>

        {/* 🔍 Info extra */}
        <p className="mt-6 text-sm text-zinc-300">
          Navegação acessível por voz: basta dizer "O bem me quer" para abrir o portal.
        </p>

        {/* 🎙️ Status de escuta */}
        <p className="mt-2 text-xs italic text-purple-300">
          {listening ? '🎙️ Escutando sua voz mágica...' : '🟣 Aguardando ativação...'}
        </p>
      </div>
    </div>
  );
}

// =============================================================================================
// 🪄 Fim da Home.jsx com Portal mágico por voz – O Bem Te Quer 💜
// =============================================================================================
// ========================================================================================