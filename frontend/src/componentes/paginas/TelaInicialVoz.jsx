// =============================================================================================
// 📄 TelaInicialVoz.jsx – Ativação por Voz com frase mágica "O bem me quer" + "Iniciar"
// Projeto: O Bem Te Quer 💜 – Interface inicial luxuosa e acessível por voz
// =============================================================================================

import React, { useEffect, useRef, useState } from 'react'; // 🧙 Importa React e hooks necessários
import { useNavigate } from 'react-router-dom'; // 🧭 Navegação entre páginas
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';   // 🎤 Reconhecimento de voz
import '../../global.css';    // 🎨 Estilo global do projeto

// 🔎 Util: normaliza texto (remove acentos) para matches mais robustos
const norm = (s = '') =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export default function TelaInicialVoz() {
  const navigate = useNavigate();

  // 🎧 Hook de escuta contínua
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // 🎛️ Estados/refs de controle do fluxo
  const jaIniciou = useRef(false);               // Evita inicializações duplicadas
  const vocesHandlerRegistrado = useRef(false);  // Evita múltiplos onvoiceschanged
  const [estado, setEstado] = useState('aguardando_frase'); // 'aguardando_frase' → 'frase_ok'
  const [listening, setListening] = useState(false);
  const [interagiu, setInteragiu] = useState(false);        // Exige gesto do usuário (autoplay iOS/Chrome)

  // =============================================================================================
  // 🔊 FALAR – Fala empática, seleciona voz pt-BR e reativa a escuta ao terminar
  // =============================================================================================
  const falar = (mensagem, aoTerminar) => {
    window.speechSynthesis.cancel(); // 🧹 Interrompe qualquer fala anterior
    const utter = new SpeechSynthesisUtterance(mensagem);
    utter.lang = 'pt-BR';

    // 🎙️ Seleciona voz pt-BR disponível, quando houver
    const vozes = speechSynthesis.getVoices();
    const vozSelecionada = vozes.find((v) => v.lang?.toLowerCase().includes('pt'));
    if (vozSelecionada) utter.voice = vozSelecionada;

    utter.onend = () => {
      aoTerminar?.();
      if (!listening) iniciarEscuta(); // Reativa a escuta caso não esteja ativa
    };

    speechSynthesis.speak(utter);
  };

  // =============================================================================================
  // 🎤 CONTROLES DE ESCUTA
  // =============================================================================================
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
    } finally {
      setListening(false);
    }
  };

  // =============================================================================================
  // 🔘 Clique manual – habilita fala/escuta (necessário para autoplay em navegadores modernos)
  // =============================================================================================
  const ativarManual = () => {
    if (interagiu) return;
    setInteragiu(true);
    resetTranscript();
    iniciarEscuta();

    // Pequeno delay para sincronizar microfone e TTS
    setTimeout(() => {
      // 🗣️ Explica a frase mágica correta para abrir o portal
      falar('Para abrir o portal, diga com carinho: "O bem me quer". Depois, diga "iniciar" para seguirmos.');
    }, 300);
  };

  // =============================================================================================
  // 🎨 Ao montar: aplica tema e arma o gatilho de vozes (sem iniciar fala automaticamente)
  // =============================================================================================
  useEffect(() => {
    document.body.className = 'tema-wallpaper-arquivo';

    if (!browserSupportsSpeechRecognition) {
      console.warn('⛔ Este navegador não suporta reconhecimento de voz.');
      return;
    }

    if (jaIniciou.current) return;
    jaIniciou.current = true;

    // Aguarda as vozes carregarem apenas uma vez — alguns navegadores preenchem de forma assíncrona
    if (!vocesHandlerRegistrado.current && speechSynthesis.getVoices().length === 0) {
      vocesHandlerRegistrado.current = true;
      speechSynthesis.onvoiceschanged = () => {
        // Apenas garante que as vozes estarão disponíveis para a primeira fala
      };
    }

    // 🧹 Limpa escuta e event handlers ao desmontar
    return () => {
      pararEscuta();
      if (vocesHandlerRegistrado.current) {
        speechSynthesis.onvoiceschanged = null;
        vocesHandlerRegistrado.current = false;
      }
    };
  }, [browserSupportsSpeechRecognition]);

  // =============================================================================================
  // 🧠 Processa comandos reconhecidos
  //  - Passo 1: reconhecer a frase mágica "o bem me quer" (tolerante a acentos)
  //  - Passo 2: depois dizer "iniciar" (ou "começar/comecar") para avançar ao menu
  // =============================================================================================
  useEffect(() => {
    const bruto = transcript;
    if (!bruto || !interagiu) return;

    const comando = norm(bruto); // normaliza para comparar sem acentos
    const fraseMagica = 'o bem me quer';

    const disseFraseMagica = norm(fraseMagica);
    const matchFrase = comando.includes(disseFraseMagica); // contém a frase em qualquer parte

    const matchIniciar =
      comando.includes('iniciar') ||
      comando.includes('comecar') ||
      comando.includes('começar') || // alguns navegadores geram "ç" de forma diferente
      comando.includes('comecar');    // redundante, mas mantido por segurança

    // 1️⃣ Primeiro passo: dizer "o bem me quer"
    if (estado === 'aguardando_frase' && matchFrase) {
      pararEscuta();
      resetTranscript();
      setEstado('frase_ok');
      // feedback carinhoso + instrução do próximo passo
      falar('Eu ouvi: "O bem me quer". E eu também te quero bem! Agora diga "iniciar" para avançarmos.');
      return;
    }

    // 2️⃣ Segundo passo: "iniciar/começar"
    if (estado === 'frase_ok' && matchIniciar) {
      pararEscuta();
      falar('Acessando o sistema. Aguarde um instante.', () => navigate('/menu-escolha'));
    }
  }, [transcript, estado, interagiu, navigate]);

  // =============================================================================================
  // 💻 Interface
  // =============================================================================================
  return (
    <div className="flex items-center justify-center w-full min-h-screen fade-in">
      <div className="max-w-xl p-8 text-center border shadow-2xl bg-black/80 border-zinc-700 rounded-3xl backdrop-blur-xl">
        <h1 className="mb-4 text-3xl font-bold tracking-wide text-cyan-400 animate-pulse">
          Abra o portal dizendo <span className="text-emerald-300">“O bem me quer”</span> 💜
        </h1>

        <p className="mb-6 text-lg text-zinc-200">
          Depois, diga <strong className="text-emerald-300">“iniciar”</strong> para escolher como entrar no sistema.
        </p>

        {/* 🎙️ Status de escuta visível */}
        <div className="text-sm italic text-purple-300">
          {listening ? '🎙️ Escutando sua voz...' : '🟣 Microfone aguardando interação ou bloqueado...'}
        </div>

        {/* 🔘 Ativação via clique (necessária para liberar TTS/mic em navegadores modernos) */}
        {!interagiu && (
          <button
            onClick={ativarManual}
            className="px-6 py-3 mt-4 font-semibold text-white transition-all shadow-md bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl hover:scale-105"
          >
            🔓 Ativar por Voz / Clique
          </button>
        )}

        {/* 🖱️ Alternativa manual direta */}
        <button
          onClick={() => navigate('/menu-escolha')}
          className="px-6 py-3 mt-4 font-semibold text-white transition-all shadow-md bg-gradient-to-r from-cyan-500 to-emerald-600 hover:scale-105 rounded-xl"
        >
          🚀 Iniciar Manualmente
        </button>
      </div>
    </div>
  );
}
// =============================================================================================
// 🪄 Fim da Tela Inicial por Voz – O Bem Te Quer
// =============================================================================================
