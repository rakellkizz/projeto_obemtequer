// ======================================================================================
// 📄 LoginEscolhaVozFacial.jsx – Tela de Escolha com Reconhecimento de Voz Interativo
// Projeto: O Bem Te Quer 💜 – Visual moderno, acolhedor e com comandos de voz reais
// ======================================================================================

import React, { useEffect, useState } from 'react';   // 🧙 Importa React e hooks necessários
import { useNavigate } from 'react-router-dom';   // 🧭 Navegação entre páginas
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';   // 🎤 Reconhecimento de voz
import '../../global.css';    // 🎨 Estilo global do projeto

export default function LoginEscolhaVozFacial() {
  const navigate = useNavigate();

  // 🎙️ Configuração do reconhecimento de voz
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [saudacaoFeita, setSaudacaoFeita] = useState(false);
  const [comandoDetectado, setComandoDetectado] = useState(false);

  // 🔊 Fala empática
  const falar = (texto) => {
    window.speechSynthesis.cancel();
    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = 'pt-BR';
    fala.onend = () => {
      SpeechRecognition.startListening({ continuous: true, language: 'pt-BR' });
    };
    window.speechSynthesis.speak(fala);
  };

  // 👋 Saudação inicial com voz acolhedora
  useEffect(() => {
    if (!saudacaoFeita && browserSupportsSpeechRecognition) {
      falar(
        'Olá, seja bem-vindo ou bem-vinda ao portal O Bem Te Quer. Como você deseja logar? Diga: reconhecimento por voz ou facial.'
      );
      setSaudacaoFeita(true);
    }
  }, [saudacaoFeita, browserSupportsSpeechRecognition]);

  // 🤖 Interpretação de comando por voz
  useEffect(() => {
    const comando = transcript.trim().toLowerCase();

    if (!comandoDetectado) {
      if (comando.includes('facial')) {
        setComandoDetectado(true);
        falar('Redirecionando para login com reconhecimento facial.');
        SpeechRecognition.stopListening();
        setTimeout(() => navigate('/login-facial'), 2000);
      } else if (comando.includes('voz')) {
        setComandoDetectado(true);
        falar('Redirecionando para login por voz.');
        SpeechRecognition.stopListening();
        setTimeout(() => navigate('/login-acessivel', { state: { ativar: true } }), 2000);
      }
    }
  }, [transcript, comandoDetectado, navigate]);

  if (!browserSupportsSpeechRecognition) {
    return <p className="p-4 text-center text-red-500">Seu navegador não suporta reconhecimento de voz.</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-white bg-gradient-to-br from-purple-900 via-black to-indigo-900">
      <div className="w-full max-w-xl p-10 space-y-6 text-center border shadow-2xl rounded-3xl bg-black/40 backdrop-blur-xl border-white/20">
        <h2 className="text-xl font-medium text-purple-300">
          Olá: Diga <strong>'login facial'</strong> ou <strong>'login por voz'</strong> para começar.
        </h2>

        <h1 className="text-3xl font-bold text-purple-100">
          Bem-vindo ao Projeto <span className="text-purple-400">“O Bem Te Quer”</span> 💜
        </h1>

        {/* 🔘 Botões futuristas (visuais e funcionais) */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <button
            onClick={() => navigate('/login-facial')}
            className="border botao-futurista border-cyan-400"
          >
            Login Facial
          </button>

          <button
            onClick={() => navigate('/login-acessivel', { state: { ativar: true } })}
            className="border border-pink-400 botao-futurista"
          >
            Login por Voz
          </button>
        </div>

        {/* 🔊 Status de escuta */}
        <p className="text-sm italic text-purple-300">
          {listening ? '🎧 Ouvindo...' : '🛑 Aguardando comando...'}
        </p>
      </div>
    </div>
  );
}
