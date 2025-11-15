// =============================================================================================
// 📄 LoginVoz.jsx – Tela de Login usando apenas Comando de Voz (com suporte a Modo Manual)
// Projeto: O Bem Te Quer 💜 – Luxuoso, acessível, moderno e funcional
// =============================================================================================

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // 🔁 Navegação e leitura de estado
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import '../../global.css'; // 🌍 Estilo global com visual luxuoso

export default function LoginVoz() {
  const navigate = useNavigate();
  const location = useLocation();

  // 📌 Detecta se o login por voz está em modo manual (sem voz ativa)
  const modoManual = location.state?.modo === 'manual';

  // 🎤 Hook de reconhecimento de voz
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [escutandoComando, setEscutandoComando] = useState(false); // 🧠 Começa a escutar após a fala inicial

  // 🔊 Narração empática – silenciada no modo manual
  const falar = (mensagem) => {
    if (modoManual) return;
    window.speechSynthesis.cancel(); // Evita sobreposição de falas
    const fala = new SpeechSynthesisUtterance(mensagem);
    fala.lang = 'pt-BR';
    window.speechSynthesis.speak(fala);
  };

  // 🧠 Processamento dos comandos falados
  useEffect(() => {
    const comando = transcript.trim().toLowerCase();
    if (!escutandoComando || !comando) return;

    if (comando.includes('voltar')) {
      falar('Voltando ao menu principal.');
      SpeechRecognition.stopListening();
      navigate('/');
    } else if (comando.includes('acessar')) {
      falar('Login de voz confirmado com sucesso!');
      SpeechRecognition.stopListening();
      navigate('/login-tradicional');
    }
  }, [transcript, escutandoComando, navigate]);

  // 👋 Saudação inicial ao entrar na tela
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) return;

    if (!modoManual) {
      falar('Você escolheu login por voz. Diga "acessar" para entrar ou "voltar" para retornar.');

      const delay = setTimeout(() => {
        resetTranscript(); // Limpa escuta anterior
        SpeechRecognition.startListening({ continuous: true, language: 'pt-BR' });
        setEscutandoComando(true); // Começa a escutar de fato
      }, 2000);

      return () => clearTimeout(delay);
    }
  }, [browserSupportsSpeechRecognition, modoManual]);

  // 🚫 Caso o navegador não suporte voz
  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="text-white container-centralizado bg-gradient-to-br from-black via-purple-900 to-black">
        <div className="w-full max-w-xl card-login">
          <h1 className="mb-4 text-2xl font-bold text-center text-red-500">
            Seu navegador não suporta comandos de voz.
          </h1>
          <button onClick={() => navigate('/')} className="w-full mt-4 botao-outline">
            🔙 Voltar ao Menu Principal
          </button>
        </div>
      </div>
    );
  }

  // 💎 Interface visual moderna e acessível
  return (
    <div className="text-white container-centralizado bg-gradient-to-br from-black via-purple-900 to-black">
      <div className="w-full max-w-xl card-login">

        {/* 🎤 Título */}
        <h1 className="mb-4 text-3xl font-bold text-center">Login por Comando de Voz</h1>

        {/* 🗣️ Instruções visuais */}
        <p className="mb-4 text-center text-purple-300">
          Diga <strong>"acessar"</strong> para entrar ou <strong>"voltar"</strong> para retornar ao menu.
        </p>

        {/* 🎧 Status de escuta */}
        <p className="mb-6 text-sm italic text-center text-zinc-400">
          {listening ? '🎧 Ouvindo sua voz...' : '🛑 Parado. Clique no botão para reiniciar.'}
        </p>

        {/* 🔘 Botão de voltar */}
        <button
          className="w-full mt-2 botao-outline"
          onClick={() => {
            SpeechRecognition.stopListening();
            navigate('/');
          }}
        >
          🔙 Voltar para o Início
        </button>

      </div>
    </div>
  );
}
// =============================================================================================
// Fim do componente LoginVoz.jsx
// =============================================================================================
// =============================================================================================