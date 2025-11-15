// ========================================================================================
// 📄 LoginMagico.jsx – Login por Palavra Secreta Personalizada por Voz
// Projeto: O Bem Te Quer 💜 – Totalmente acessível, apenas com voz do usuário
// ========================================================================================

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// ✨ Efeitos visuais mágicos
import ParticulasMagicas from '../Visuais/ParticulasMagicas';

// 🔊 Controlador de fala
import { falar } from '../../utils/vozController';

// 🗣️ Frases de voz (ajustado para o caminho certo)
import * as frasesVozModule from '../Acessibilidade/frasesVoz';

// 🔧 Compat: funciona com default ou nomeado
const FrasesVoz =
  frasesVozModule.default ?? frasesVozModule.FrasesVoz ?? frasesVozModule;

import '../../global.css'; // 🎨 Estilo global

export default function LoginMagico() {
  const navigate = useNavigate();

  // Estados principais
  const [mensagem, setMensagem] = useState('Aguardando palavra mágica personalizada...');
  const [etapa, setEtapa] = useState('verificando'); // 'gravando' | 'verificando'

  const { transcript, resetTranscript, browserSupportsSpeechRecognition, listening } =
    useSpeechRecognition();

  // Controle interno
  const iniciouTemaRef = useRef(false);
  const timerRef = useRef(null);

  // ========================================================================================
  // 🎧 Inicia escuta contínua em português
  // ========================================================================================
  const iniciarEscuta = () => {
    if (!browserSupportsSpeechRecognition) {
      alert('Reconhecimento de voz não suportado neste navegador.');
      return;
    }
    if (listening) return; // evita múltiplas sessões
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: 'pt-BR' });
  };

  // ========================================================================================
  // 🧹 Limpeza ao desmontar
  // ========================================================================================
  useEffect(() => {
    return () => {
      try {
        SpeechRecognition.stopListening();
      } catch {}
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  // ========================================================================================
  // 🎨 Ao montar: aplica tema e orienta usuário
  // ========================================================================================
  useEffect(() => {
    if (iniciouTemaRef.current) return;
    iniciouTemaRef.current = true;

    const prevClass = document.body.className;
    document.body.className = 'tema-login-magico';

    const palavraMagica = localStorage.getItem('palavraMagicaPersonalizada');

    if (!palavraMagica) {
      setMensagem('🧠 Diga sua nova palavra ou frase mágica...');
      setEtapa('gravando');
      falar?.(FrasesVoz?.loginMagico?.naoConfigurado ?? 'Diga sua nova palavra mágica.');
    } else {
      setMensagem('🎤 Aguardando sua palavra secreta...');
      try {
        falar?.(
          FrasesVoz?.loginMagico?.pedirPalavra ??
            'Diga sua palavra mágica para entrar.',
          iniciarEscuta
        );
      } catch {
        iniciarEscuta();
      }
    }

    return () => {
      document.body.className = prevClass;
    };
  }, []);

  // ========================================================================================
  // 🧠 Processa o que o usuário fala
  // ========================================================================================
  useEffect(() => {
    const comando = transcript?.toLowerCase()?.trim();
    if (!comando) return;

    const palavraSalva =
      localStorage.getItem('palavraMagicaPersonalizada')?.toLowerCase() ?? '';

    // 1) Etapa de gravação
    if (etapa === 'gravando' && comando.length > 2) {
      localStorage.setItem('palavraMagicaPersonalizada', comando);
      setMensagem(`✨ Palavra mágica "${comando}" salva! Agora diga novamente para entrar.`);
      falar?.(
        FrasesVoz?.loginMagico?.sucessoGravacao ??
          'Palavra mágica salva. Diga novamente para entrar.',
        iniciarEscuta
      );
      setEtapa('verificando');
      resetTranscript();
      return;
    }

    // 2) Etapa de verificação
    if (etapa === 'verificando') {
      if (palavraSalva && comando.includes(palavraSalva)) {
        setMensagem('🪄 Palavra secreta reconhecida! Abrindo portal...');
        falar?.(FrasesVoz?.loginMagico?.aceita ?? 'Palavra reconhecida. Bem-vinda.');

        try {
          const audio = new Audio('/sounds/magic-open.mp3');
          audio.play().catch(() => {});
        } catch {}

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => navigate('/home'), 1200);
      } else if (comando.includes('voltar')) {
        setMensagem('Voltando ao menu principal...');
        falar?.(
          FrasesVoz?.loginMagico?.voltando ?? 'Voltando ao início.',
          () => navigate('/')
        );
      } else {
        setMensagem('❌ Palavra incorreta ou não registrada.');
        falar?.(
          FrasesVoz?.loginMagico?.incorreta ??
            'Não reconheci sua palavra. Tente novamente.'
        );
      }
      resetTranscript();
    }
  }, [transcript, etapa, navigate, resetTranscript]);

  // ========================================================================================
  // 🖼️ Interface visual
  // ========================================================================================
  return (
    <>
      <ParticulasMagicas />

      <div className="container-centralizado fade-in">
        <div className="text-center login-card">
          <h2 className="titulo-login">💫 Login Mágico</h2>

          <p className="mb-4 mensagem-login">{mensagem}</p>

          <button
            onClick={iniciarEscuta}
            className="botao-gradiente"
            aria-pressed={listening ? 'true' : 'false'}
          >
            🔮 Falar Palavra Mágica
          </button>

          <button onClick={() => navigate('/')} className="mt-4 botao-outline">
            🔙 Voltar ao Início
          </button>

          <p className="mt-6 text-sm text-indigo-300">
            {etapa === 'gravando'
              ? 'Grave sua palavra mágica com a sua voz. Ela será salva localmente.'
              : 'Diga a palavra ou frase mágica que você configurou.'}
            <br />
            <strong className="text-indigo-400">
              Sua palavra mágica é totalmente confidencial.
            </strong>
          </p>
        </div>
      </div>
    </>
  );
}
// ========================================================================================
// ✅ FIM do componente LoginMagico.jsx – 100% funcional, com voz e efeitos visuais
// ======================================================================================== 