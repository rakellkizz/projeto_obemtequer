// =============================================================================================
// 📄 ConfigurarPalavraMagica.jsx – Cadastro por Voz da Palavra Mágica com Histórico Limitado
// Projeto: O Bem Te Quer 💜 – Acolhimento por Voz + Inclusão ✨
// =============================================================================================

import React, { useEffect, useState, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useNavigate } from 'react-router-dom';
import '../../global.css'; // 🌐 Estilos globais e temas visuais

export default function ConfigurarPalavraMagica() {
  const navigate = useNavigate();

  // 🎙️ Reconhecimento de voz
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  // 🌟 Estados do processo
  const [fase, setFase] = useState('esperando_fala'); // 'esperando_fala' | 'aguardando_confirmacao'
  const [palavraFalada, setPalavraFalada] = useState('');
  const esperandoFala = useRef(false); // 🔇 Controla pausa da escuta enquanto a IA fala

  // 🔊 Função personalizada de fala com retorno automático à escuta
  const falar = (texto, callback = null) => {
    SpeechRecognition.stopListening();
    esperandoFala.current = true;

    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = 'pt-BR';
    fala.pitch = 1;
    fala.rate = 1;

    const vozes = window.speechSynthesis.getVoices();
    fala.voice = vozes.find(v => v.lang.includes('pt')) || vozes[0];

    fala.onend = () => {
      esperandoFala.current = false;
      if (callback) callback();
      SpeechRecognition.startListening({ continuous: true, language: 'pt-BR' });
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(fala);
  };

  // ▶️ Ao entrar na tela
  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) return;

    document.body.className = 'tema-login-magico'; // ✨ Aplica fundo mágico
    resetTranscript();

    falar('Fale agora sua nova palavra mágica. Ela será usada para login por voz.');
  }, []);

  // 🧠 Captura inicial da palavra
  useEffect(() => {
    if (fase !== 'esperando_fala' || esperandoFala.current || !transcript.trim()) return;

    const falado = transcript.trim().toLowerCase();
    setPalavraFalada(falado);
    setFase('aguardando_confirmacao');
    resetTranscript();

    falar(`Você disse: "${falado}". Confirma essa palavra mágica? Diga sim ou não.`);
  }, [transcript, fase]);

  // ✅ Confirmação da palavra
  useEffect(() => {
    if (fase !== 'aguardando_confirmacao' || esperandoFala.current || !transcript.trim()) return;

    const resposta = transcript.trim().toLowerCase();
    resetTranscript();

    if (resposta.includes('sim')) {
      salvarPalavra(palavraFalada);
      falar('Palavra mágica salva com sucesso. Voltando ao menu.', () => navigate('/'));
    } else if (resposta.includes('não')) {
      setPalavraFalada('');
      setFase('esperando_fala');
      falar('Tudo bem. Fale novamente sua nova palavra mágica.');
    }
  }, [transcript, fase]);

  // 💾 Salva a palavra mágica + histórico local
  const salvarPalavra = (nova) => {
    localStorage.setItem('palavraMagicaPersonalizada', nova);

    const historico = JSON.parse(localStorage.getItem('palavrasMagicasHistorico')) || [];
    const atualizado = [nova, ...historico.filter(p => p !== nova)].slice(0, 3);
    localStorage.setItem('palavrasMagicasHistorico', JSON.stringify(atualizado));
  };

  // 🖼️ Interface acessível e mágica
  return (
    <div className="flex items-center justify-center min-h-screen px-6 text-center text-white bg-black fade-in">
      <div className="max-w-xl p-8 border shadow-xl rounded-2xl bg-zinc-800 border-cyan-600">
        <h1 className="mb-4 text-2xl font-bold text-cyan-400">✨ Configurar Palavra Mágica</h1>

        {fase === 'esperando_fala' && (
          <p className="text-zinc-200">🎤 Fale agora sua nova palavra mágica...</p>
        )}

        {fase === 'aguardando_confirmacao' && (
          <p className="text-emerald-400">Você disse: <strong>{palavraFalada}</strong></p>
        )}

        <p className="mt-4 text-sm italic text-purple-300">
          {listening && !esperandoFala.current ? '🎧 Ouvindo...' : '🔈 Aguardando...'}
        </p>
      </div>
    </div>
  );
}
// ========================================================================================
// 🪄 Fim da página de configuração da palavra mágica – O Bem Te Quer
// ========================================================================================
// Esta página é parte do projeto O Bem Te Quer 💜, que visa criar uma experiência
// acessível, mágica e acolhedora para todos os usuários. A configuração da palavra
// mágica é feita por voz, com feedback auditivo claro e histórico de palavras
// para fácil acesso. A interface é limpa, com foco na usabilidade e inclusão,
// respeitando o tempo do usuário e garantindo que ele se sinta confortável e seguro.
// A voz ativa guia o usuário de forma empática, sem distrações, focando na
// configuração da palavra mágica. A interface é limpa, com partículas mágicas
// para manter a atmosfera encantadora, mas sem fumaça ou distrações visuais.
// O objetivo é proporcionar uma experiência fluida e intuitiva, respeitando o tempo
// do usuário e garantindo que ele se sinta acolhido e respeitado.
// ======================================================================================== 