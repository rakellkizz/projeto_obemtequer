// =============================================================================================
// 📄 LoginLuxuoso.jsx – Tela de Login com Estilo Premium + Reconhecimento de Voz/Facial
// Projeto: O Bem Te Quer 💜 – Elegância, acessibilidade e modernidade visual
// =============================================================================================

import React, { useEffect, useRef, useState } from 'react'; // 🎣 Hooks para estados e referências
import { Mic, ScanFace, Lock } from 'lucide-react';          // 🎨 Ícones modernos para UI
import * as faceapi from 'face-api.js';                      // 🤖 Biblioteca de reconhecimento facial
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; // 🎤 Voz
import '../global.css'; // 💅 Estilo global luxuoso com Tailwind e classes customizadas

export default function LoginLuxuoso() {
  // 🎯 Estados principais do login
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [etapa, setEtapa] = useState('usuario'); // 👂 Controla o estágio da escuta por voz

  const videoRef = useRef(null); // 🎥 Referência para a webcam ao fundo

  // 🎤 Reconhecimento de voz
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  // 🔊 Função de fala com síntese de voz
  const falar = (texto) => {
    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = 'pt-BR';
    window.speechSynthesis.cancel(); // Interrompe falas anteriores
    window.speechSynthesis.speak(fala);
  };

  // 🤖 Carrega os modelos de reconhecimento facial + ativa câmera ao montar
  useEffect(() => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models')
    ]).then(() => {
      console.log('📦 Modelos faciais carregados com sucesso');
    });

    // 📷 Solicita acesso à câmera e exibe no vídeo
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(() => setMensagem('❌ Erro ao acessar câmera'));
  }, []);

  // 🎧 Detecta entrada por voz de usuário e senha em duas etapas
  useEffect(() => {
    if (!transcript.trim()) return;

    if (etapa === 'usuario') {
      setUsuario(transcript.trim());
      setEtapa('senha');
      setMensagem('✅ Nome reconhecido. Agora diga sua senha.');
      falar('Agora diga sua senha');
      resetTranscript();
    } else if (etapa === 'senha') {
      setSenha(transcript.trim());
      setMensagem('🔐 Senha capturada. Clique em entrar.');
      falar('Senha registrada. Pressione entrar para continuar');
      resetTranscript();
    }
  }, [transcript]);

  // 🔐 Simula autenticação visual
  const autenticar = () => {
    setMensagem('🔄 Autenticando...');
    setTimeout(() => {
      setMensagem(`✅ Seja bem-vinda, ${usuario}`);
      falar(`Seja bem-vinda, ${usuario}`);
    }, 1000);
  };

  // ============================================================================================
  // 🖥️ INTERFACE VISUAL LUXUOSA – Campos, botões e câmera
  // ============================================================================================
  return (
    <div className="login-luxuoso">
      <div className="login-card glass">
        {/* 🏷️ Título elegante com ícone */}
        <h2 className="titulo-login">
          <Lock size={20} /> Login Acessível
        </h2>

        {/* 👤 Campo de usuário */}
        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="input-login"
        />

        {/* 🔐 Campo de senha */}
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="input-login"
        />

        {/* 🔘 Botão elegante com gradiente */}
        <button onClick={autenticar} className="botao-gradiente">
          Entrar
        </button>

        {/* 🎤 Botão de ativar reconhecimento por voz */}
        <button
          className="botao-voz"
          onClick={() => {
            setEtapa('usuario');
            resetTranscript();
            SpeechRecognition.startListening({ continuous: true, language: 'pt-BR' });
            falar('Diga seu nome de usuário');
          }}
        >
          <Mic size={16} />
          {listening ? '🎧 Ouvindo...' : '🎤 Login por Voz'}
        </button>

        {/* ℹ️ Mensagem dinâmica abaixo dos campos */}
        {mensagem && <p className="mensagem-login">{mensagem}</p>}

        {/* 📷 Webcam em plano de fundo */}
        <video ref={videoRef} autoPlay muted className="webcam-preview" />
      </div>
    </div>
  );
}
// =============================================================================================
// Fim do componente LoginLuxuoso.jsx
// =============================================================================================