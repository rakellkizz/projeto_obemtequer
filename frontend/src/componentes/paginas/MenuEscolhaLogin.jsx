// =============================================================================================
// 📄 MenuEscolhaLogin.jsx – Escolha de login com controle de voz ativo e empático
// Projeto: O Bem Te Quer 💜
// =============================================================================================

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { falar, iniciarEscuta, pararEscuta, setPreferenciaGenero } from '../../utils/vozController';
import { FrasesVoz } from '../Acessibilidade/frasesVoz';
import { mapAvatarToGenero } from '../../utils/mapAvatarGenero';
import '../../global.css';

export default function MenuEscolhaLogin() {
  const navigate = useNavigate();

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);

  // ✅ Mantém a voz alinhada ao avatar salvo
  const syncGenero = () => {
    try {
      const avatar = localStorage.getItem('avatarSelecionado');
      const genero = mapAvatarToGenero(avatar);
      localStorage.setItem('avatarGenero', genero);
      setPreferenciaGenero(genero);
    } catch {}
  };

  const interpretarComando = (comando) => {
    // sincronia imediata
    syncGenero();

    const texto = String(comando || '').toLowerCase().trim();
    if (!texto) return;

    if (texto.includes('voz') || texto.includes('mágico') || texto.includes('magico')) {
      falar(FrasesVoz.menuPrincipal.loginVoz, () => navigate('/login-acessivel'));
    } else if (texto.includes('facial')) {
      falar(FrasesVoz.menuPrincipal.loginFacial, () => navigate('/login-facial'));
    } else if (texto.includes('manual') || texto.includes('usuário') || texto.includes('usuario')) {
      falar(FrasesVoz.menuPrincipal.loginManual, () => navigate('/login-tradicional'));
    } else if (texto.includes('voltar') || texto.includes('início') || texto.includes('inicio')) {
      falar(FrasesVoz.navegandoVoltar, () => navigate('/'));
    } else if (texto.includes('ajuda') || texto.includes('repetir')) {
      setMensagem(FrasesVoz.menuPrincipal.repetir);
      falar(FrasesVoz.menuPrincipal.repetir, () => iniciarEscuta(interpretarComando));
    } else if (texto.length > 3 && !erro) {
      setErro(true);
      setMensagem(FrasesVoz.menuPrincipal.repetir);
      falar('Desculpe, não entendi. ' + FrasesVoz.menuPrincipal.repetir, () => iniciarEscuta(interpretarComando));
    }

    resetTranscript();
  };

  useEffect(() => {
    document.body.className = 'tema-wallpaper-arquivo';

    // garante voz correta conforme avatar atual
    syncGenero();

    if (!browserSupportsSpeechRecognition) {
      setMensagem('Este navegador não suporta reconhecimento de voz.');
      return;
    }

    const iniciarFluxo = () => {
      setMensagem(FrasesVoz.menuPrincipal.saudacao);
      setTimeout(() => {
        falar(FrasesVoz.menuPrincipal.saudacao, () => iniciarEscuta(interpretarComando));
      }, 800);
    };

    const ss = window?.speechSynthesis;
    if (ss && ss.getVoices && ss.getVoices().length === 0) {
      const handler = () => iniciarFluxo();
      ss.onvoiceschanged = handler;
      const fallback = setTimeout(iniciarFluxo, 1200);

      return () => {
        try { if (ss.onvoiceschanged === handler) ss.onvoiceschanged = null; } catch {}
        clearTimeout(fallback);
        pararEscuta();
      };
    } else {
      iniciarFluxo();
      return () => pararEscuta();
    }
  }, []);

  useEffect(() => {
    const t = transcript?.trim();
    if (!t) return;
    interpretarComando(t);
  }, [transcript]);

  return (
    <div className="flex items-center justify-center min-h-screen fade-in">
      <div className="w-full max-w-md p-8 text-center text-white border border-indigo-500 shadow-2xl bg-black/70 backdrop-blur-xl rounded-3xl">
        <h1 className="mb-6 text-2xl font-bold text-indigo-300">Como deseja fazer login?</h1>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => { syncGenero(); navigate('/login-acessivel'); }}
            className="w-full py-4 text-lg botao-gradiente bg-gradient-to-r from-indigo-500 to-purple-600"
          >
            🎤 Login por Voz / Mágico
          </button>

          <button
            onClick={() => { syncGenero(); navigate('/login-facial'); }}
            className="w-full py-4 text-lg botao-gradiente bg-gradient-to-r from-teal-400 to-green-600"
          >
            📷 Login Facial
          </button>

          <button
            onClick={() => { syncGenero(); navigate('/login-tradicional'); }}
            className="w-full py-4 text-lg botao-gradiente bg-gradient-to-r from-amber-400 to-yellow-500"
          >
            ⌨️ Login Manual
          </button>
        </div>

        <p className="mt-6 text-sm text-indigo-200">{mensagem}</p>

        <button
          onClick={() => falar(mensagem, () => iniciarEscuta(interpretarComando))}
          className="px-4 py-2 mt-4 text-sm text-indigo-300 border border-indigo-400 rounded-xl hover:bg-indigo-600 hover:text-white"
        >
          🔁 Repetir instruções por voz
        </button>
      </div>
    </div>
  );
}
// =============================================================================================
// ✅ FIM do MenuEscolhaLogin.jsx – Comandos de voz empáticos e navegação fluida
// =============================================================================================