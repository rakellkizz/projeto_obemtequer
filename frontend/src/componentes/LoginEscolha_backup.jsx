/* =============================================================================================
 * 📄 LoginEscolha.jsx 💜
 * Tela de boas-vindas com múltiplas formas de login com acessibilidade total (voz + orientação)
 * Projeto: O Bem Te Quer – Inclusiva, elegante, acessível e responsiva
 * ============================================================================================= */

import React, { useEffect, useState } from 'react'; // 🧙 Importa React e hooks necessários
import { useNavigate } from 'react-router-dom'; // 🧭 Navegação entre páginas
import { motion } from 'framer-motion';   // 🎨 Animações modernas e responsivas
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';   // 🎤 Reconhecimento de voz

/* 🎨 ÍCONES modernos – Biblioteca lucide-react */
import {
  Lock, Mic, ScanFace, QrCode, Fingerprint
} from 'lucide-react';

/* =============================================================================================
 * COMPONENTE: LoginEscolha
 * ============================================================================================= */
export default function LoginEscolha() {
  const navigate = useNavigate();

  /* ✨ Estado local: controla se o modo voz está ativado */
  const [modoVoz, setModoVoz] = useState(() => {
    return localStorage.getItem('modoVoz') === 'true';
  });

  /* 🎧 Ganchos do reconhecimento de voz */
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  /* 🔊 Fala inicial e início da escuta automática (caso ativado) */
  useEffect(() => {
    const falar = (texto) => {
      const fala = new SpeechSynthesisUtterance(texto);
      fala.lang = 'pt-BR';
      fala.rate = 1;
      fala.pitch = 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(fala);
    };

    if (modoVoz && browserSupportsSpeechRecognition) {
      falar('Bem-vindo ao login. Diga: voz, facial, token ou biometria.');

      setTimeout(() => {
        SpeechRecognition.startListening({
          continuous: true,
          language: 'pt-BR'
        });
      }, 3500);
    }
  }, [modoVoz, browserSupportsSpeechRecognition]);

  /* 📢 Interpreta comandos de voz e redireciona */
  useEffect(() => {
    if (!modoVoz || !transcript) return;

    const comando = transcript.toLowerCase();

    if (comando.includes('voz') || comando.includes('acessível')) {
      navigate('/login-acessivel');
    } else if (comando.includes('facial') || comando.includes('rosto')) {
      navigate('/login-facial');
    } else if (comando.includes('token') || comando.includes('código')) {
      navigate('/login-token');
    } else if (comando.includes('biometria') || comando.includes('digital')) {
      navigate('/login-biometria');
    }

    resetTranscript();
  }, [transcript, navigate, resetTranscript, modoVoz]);

  /* 🎯 Redirecionamento manual com atraso elegante */
  const navegar = (rota) => {
    setTimeout(() => navigate(rota), 250);
  };

  /* 🌊 Alterna entre modo de voz ativo/inativo */
  const alternarModo = () => {
    const novoModo = !modoVoz;
    setModoVoz(novoModo);
    localStorage.setItem('modoVoz', novoModo);
    SpeechRecognition.stopListening();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="app-container"
    >
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white shadow-2xl dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 rounded-3xl fade-in">

        {/* 📍 Cabeçalho */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-purple-700 sm:text-4xl dark:text-purple-300">
            Seja bem-vindo(a)! 🌷
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Escolha a forma de login que melhor se adapta a você:
          </p>
        </div>

        {/* 🔘 Grade de opções de login */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            onClick={() => navegar('/login-acessivel')}
            className="flex items-center justify-center gap-3 px-6 py-4 text-lg font-medium text-gray-800 transition-all duration-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 rounded-xl"
          >
            <Lock size={20} /> Tradicional
          </button>

          <button
            onClick={() => navegar('/login-acessivel')}
            className="flex items-center justify-center gap-3 px-6 py-4 text-lg font-medium text-indigo-900 transition-all duration-300 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-800 dark:hover:bg-indigo-700 dark:text-indigo-200 rounded-xl"
          >
            <Mic size={20} /> Acessível com Voz
          </button>

          <button
            onClick={() => navegar('/login-facial')}
            className="flex items-center justify-center gap-3 px-6 py-4 text-lg font-medium text-green-900 transition-all duration-300 bg-green-100 hover:bg-green-200 dark:bg-green-800 dark:hover:bg-green-700 dark:text-green-200 rounded-xl"
          >
            <ScanFace size={20} /> Reconhecimento Facial
          </button>

          <button
            onClick={() => navegar('/login-token')}
            className="flex items-center justify-center gap-3 px-6 py-4 text-lg font-medium text-yellow-900 transition-all duration-300 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-800 dark:hover:bg-yellow-700 dark:text-yellow-100 rounded-xl"
          >
            <QrCode size={20} /> Token ou Código
          </button>

          <button
            onClick={() => navegar('/login-biometria')}
            className="flex items-center justify-center gap-3 px-6 py-4 text-lg font-medium text-pink-900 transition-all duration-300 bg-pink-100 col-span-full hover:bg-pink-200 dark:bg-pink-800 dark:hover:bg-pink-700 dark:text-pink-200 rounded-xl"
          >
            <Fingerprint size={20} /> Biometria Digital
          </button>
        </div>

        {/* 🆘 Botão para alternar entre modo voz/manual */}
        <div className="pt-4 text-center">
          <button
            onClick={alternarModo}
            className="px-4 py-2 text-white transition bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            {modoVoz ? 'Desativar Modo Voz' : 'Ativar Modo Voz'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
