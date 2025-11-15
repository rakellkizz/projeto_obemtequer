// =============================================================================================
// 📄 LoginAcessivel.jsx – Login por palavra mágica com reconhecimento de voz sincronizado 🎤
// Projeto: O Bem Te Quer 💖
// =============================================================================================

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  falar,
  iniciarEscuta,
  pararEscuta,
  pausarEscutaTemporariamente,
  retomarEscuta // mantido para compat
} from '../../utils/vozController';

// ✅ Importa as frases como módulo JS
import * as FrasesVoz from '../Acessibilidade/frasesVoz.js';

import { useSpeechRecognition } from 'react-speech-recognition';
import '../../global.css';

export default function LoginAcessivel() {
  const navigate = useNavigate();

  // hook correto
  const { transcript, resetTranscript } = useSpeechRecognition();

  // estados do fluxo
  const [estado, setEstado] = useState('iniciando'); // 'gravando' | 'aguardando' | 'confirmando' | 'validando'
  const [mensagem, setMensagem] = useState('🔊 Preparando sistema de voz...');
  const [tentativas, setTentativas] = useState(0);
  const [palavraTemp, setPalavraTemp] = useState('');

  // persistência da palavra e histórico
  const salvarPalavra = (nova) => {
    const historico = JSON.parse(localStorage.getItem('palavrasMagicasHistorico')) || [];
    const novoHistorico = [nova, ...historico.filter(p => p !== nova)].slice(0, 3);
    localStorage.setItem('palavraMagicaPersonalizada', nova);
    localStorage.setItem('palavrasMagicasHistorico', JSON.stringify(novoHistorico));
  };

  const deletarPalavra = () => {
    localStorage.removeItem('palavraMagicaPersonalizada');
    setMensagem('❌ Palavra mágica apagada.');
    falar(FrasesVoz.deletar, () => iniciarEscuta(processarComando));
  };

  const listarHistorico = () => {
    const lista = JSON.parse(localStorage.getItem('palavrasMagicasHistorico')) || [];
    if (lista.length === 0) {
      falar(FrasesVoz.nenhumaSalva, () => iniciarEscuta(processarComando));
    } else {
      falar(FrasesVoz.historico(lista), () => iniciarEscuta(processarComando));
    }
  };

  const capturarPalavra = (texto) => {
    if (!texto) return;
    const palavra = texto.toLowerCase().trim();
    setPalavraTemp(palavra);
    setEstado('confirmando');
    falar(FrasesVoz.gravarConfirmar(palavra), () => iniciarEscuta(processarComando));
  };

  const processarComando = (texto) => {
    if (!texto) return;
    const comando = texto.toLowerCase().trim();

    if (estado === 'aguardando') {
      if (comando.includes('gravar') || comando.includes('trocar')) {
        setEstado('gravando');
        falar(FrasesVoz.boasVindasSemPalavra, () => iniciarEscuta(capturarPalavra));
      } else if (comando.includes('deletar')) {
        deletarPalavra();
      } else if (comando.includes('histórico') || comando.includes('anteriores')) {
        listarHistorico();
      } else if (comando.includes('voltar')) {
        falar(FrasesVoz.navegandoVoltar, () => navigate('/'));
      } else {
        falar(FrasesVoz.comandosDisponiveis, () => iniciarEscuta(processarComando));
      }
    }

    if (estado === 'confirmando') {
      const segunda = comando;
      if (segunda === palavraTemp) {
        pausarEscutaTemporariamente();
        salvarPalavra(segunda);
        setMensagem('✅ Palavra confirmada e gravada. Acessando sistema...');
        falar(FrasesVoz.sucessoConfirmacao, () => navigate('/menu-escolha'));
      } else {
        falar(FrasesVoz.erroConfirmacao, () => {
          setEstado('aguardando');
          iniciarEscuta(processarComando);
        });
      }
    }

    if (estado === 'validando') {
      const salva = localStorage.getItem('palavraMagicaPersonalizada')?.toLowerCase();
      if (comando === salva) {
        pausarEscutaTemporariamente();
        falar(FrasesVoz.palavraCorreta, () => navigate('/menu-escolha'));
      } else {
        const novas = tentativas + 1;
        setTentativas(novas);
        if (novas >= 2) {
          falar(FrasesVoz.palavraIncorreta2, () => {
            setEstado('aguardando');
            iniciarEscuta(processarComando);
          });
        } else {
          falar(FrasesVoz.palavraIncorreta, () => iniciarEscuta(processarComando));
        }
      }
    }
  };

  useEffect(() => {
    document.body.className = 'tema-wallpaper-arquivo';
    setMensagem('🔊 Preparando sistema de voz...');

    setTimeout(() => {
      const salva = localStorage.getItem('palavraMagicaPersonalizada');
      if (!salva) {
        setEstado('gravando');
        falar(FrasesVoz.boasVindasSemPalavra, () => iniciarEscuta(capturarPalavra));
      } else {
        setEstado('aguardando');
        falar(FrasesVoz.boasVindasComPalavra, () => iniciarEscuta(processarComando));
      }
    }, 800);

    return () => pararEscuta();
  }, []);

  useEffect(() => {
    const fala = transcript.trim();
    if (!fala) return;

    if (estado === 'gravando') {
      capturarPalavra(fala);
    } else {
      processarComando(fala);
    }

    resetTranscript();
  }, [transcript]);

  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-black">
      <div className="max-w-xl p-8 text-center border border-purple-600 shadow-xl rounded-3xl bg-black/80">
        <h1 className="mb-4 text-2xl font-bold text-purple-300 animate-pulse">
          Login por Palavra Mágica ✨
        </h1>
        <p className="mb-4 text-sm text-zinc-300">{mensagem}</p>
        <p className="text-xs italic text-purple-400">
          Comandos disponíveis: "gravar", "trocar senha", "deletar", "histórico", "voltar"
        </p>
        <button
          className="px-4 py-2 mt-6 text-sm text-white transition-all bg-purple-700 rounded-full hover:bg-purple-800"
          onClick={() => { pausarEscutaTemporariamente(); navigate('/'); }}
        >
          🔙 Voltar para o Início
        </button>
      </div>
    </div>
  );
}
// =============================================================================================
// ✅ FIM do LoginAcessivel.jsx – 100% funcional, com voz e comandos intuitivos
// =============================================================================================