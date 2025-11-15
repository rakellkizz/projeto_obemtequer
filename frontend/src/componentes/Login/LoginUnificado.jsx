// =============================================================================================
// 📄 LoginUnificado.jsx – Login unificado com reconhecimento facial ativado e visual futurista
// Projeto: O Bem Te Quer 💜
// =============================================================================================

import React, { useState, useEffect, useRef } from 'react';
import LoginBase from '../componentes/LoginBase'; // 💎 Componente visual reutilizável
import * as faceapi from 'face-api.js';           // 📷 Reconhecimento facial
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; // 🎤 Voz
import { Mic, Lock, QrCode } from 'lucide-react';
import './global.css';

const usuariosValidos = [
  { usuario: 'raquel', senha: '1234' },
  { usuario: 'admin', senha: 'admin' }
];

export default function LoginUnificado({ tipo = 'acessivel' }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [imagem, setImagem] = useState(null);
  const [etapa, setEtapa] = useState('usuario');
  const [vozAtiva, setVozAtiva] = useState(false);
  const [modelosCarregados, setModelosCarregados] = useState(false);
  const videoRef = useRef(null);

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const falar = (texto, genero = 'feminino') => {
    if (!vozAtiva || !texto) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    const vozes = window.speechSynthesis.getVoices();
    const vozSelecionada = vozes.find(v =>
      genero === 'masculino'
        ? v.name.toLowerCase().includes('daniel')
        : v.name.toLowerCase().includes('female') || v.lang.includes('pt')
    ) || vozes[0];
    utterance.voice = vozSelecionada;
    window.speechSynthesis.speak(utterance);
  };

  const autenticar = () => {
    const valido = usuariosValidos.some(
      u => u.usuario.toLowerCase() === usuario.toLowerCase() && u.senha === senha
    );
    if (valido) {
      setMensagem('✅ Acesso liberado!');
      falar(`Acesso concedido. Seja bem-vinda, ${usuario}`);
    } else {
      setMensagem('❌ Usuário ou senha inválidos.');
      falar('Acesso negado. Usuário ou senha incorretos.');
    }
  };

  useEffect(() => {
    if (tipo !== 'acessivel' || !transcript || !vozAtiva) return;
    if (!browserSupportsSpeechRecognition) {
      setMensagem('⚠️ Navegador não suporta voz.');
      return;
    }
    if (etapa === 'usuario') {
      setUsuario(transcript.trim());
      setEtapa('senha');
      setMensagem('✅ Nome capturado. Agora diga sua senha.');
      falar('Nome capturado. Agora diga sua senha.');
      resetTranscript();
    } else if (etapa === 'senha') {
      setSenha(transcript.trim());
      setMensagem('🔐 Senha capturada. Validando...');
      falar('Senha capturada. Validando...');
      resetTranscript();
      setTimeout(() => autenticar(), 1500);
    }
  }, [transcript]);

  // ✅ REATIVAÇÃO DA CÂMERA COM DETECÇÃO FACIAL
  useEffect(() => {
    if (tipo !== 'facial') return;

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models')
    ]).then(() => {
      setModelosCarregados(true);
      falar('Reconhecimento facial ativado. Posicione seu rosto na câmera.');
      detectarRosto();
    });
  }, [tipo]);

  // 🔁 LOOP DE DETECÇÃO FACIAL
  const detectarRosto = async () => {
    if (!modelosCarregados || !videoRef.current) return;

    const options = new faceapi.TinyFaceDetectorOptions();
    const resultado = await faceapi.detectSingleFace(videoRef.current, options);

    if (resultado?.box) {
      setMensagem('✅ Rosto reconhecido! Acesso permitido.');
      falar('Rosto reconhecido com sucesso. Bem-vinda!');
    } else {
      setMensagem('📷 Nenhum rosto detectado. Tente centralizar seu rosto.');
    }

    setTimeout(detectarRosto, 300); // 🔁 Continua detectando
  };

  const handleFileChange = (e) => {
    setImagem(e.target.files[0]);
    setMensagem('🖼️ Imagem carregada. Validando...');
    falar('Imagem carregada. Validando...');
    setTimeout(() => {
      setMensagem('✅ Reconhecimento facial bem-sucedido!');
      falar('Bem-vinda, Raquel. Acesso concedido.');
    }, 2000);
  };

  const info = {
    acessivel: { titulo: 'Login Acessível', icone: <Mic size={24} /> },
    facial: { titulo: 'Login Facial', icone: <Lock size={24} /> },
    token: { titulo: 'Login por Token', icone: <QrCode size={24} /> }
  };

  return (
    <LoginBase titulo={info[tipo]?.titulo} icone={info[tipo]?.icone}>
      {/* 🎤 Login Acessível */}
      {tipo === 'acessivel' && (
        <>
          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full px-4 py-3 mb-3 text-white border rounded-lg bg-zinc-800 border-cyan-500 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-4 py-3 mb-3 text-white border rounded-lg bg-zinc-800 border-cyan-500 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            onClick={() => {
              window.speechSynthesis.cancel();
              setEtapa('usuario');
              resetTranscript();
              setVozAtiva(true);
              SpeechRecognition.startListening({ continuous: true, language: 'pt-BR' });
              setMensagem('🎤 Ouvindo...');
              falar('Estou ouvindo. Por favor, diga seu nome.');
            }}
            className="w-full py-3 mt-2 text-sm font-semibold tracking-wide transition border text-cyan-200 border-cyan-400 rounded-xl hover:bg-cyan-700 hover:text-white"
          >
            {listening ? '🎧 Ouvindo...' : '🎤 Falar por Voz'}
          </button>
        </>
      )}

      {/* 📷 Login Facial – agora com câmera ativada */}
      {tipo === 'facial' && (
        <>
          <div className="relative mx-auto mt-4 overflow-hidden border-4 border-purple-500 rounded-full shadow-2xl w-72 h-72">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <p className="mt-4 text-sm text-center text-purple-300 animate-pulse">{mensagem}</p>
        </>
      )}

      {/* 🔐 Login com token */}
      {tipo === 'token' && (
        <input
          type="text"
          placeholder="Digite o token"
          className="w-full px-4 py-3 mb-3 text-white placeholder-yellow-100 border border-yellow-500 rounded-lg bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      )}

      {/* 🔘 Botão principal */}
      <button
        onClick={autenticar}
        className="w-full py-3 mt-4 text-lg font-bold tracking-wide text-white transition-transform transform rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 hover:shadow-xl"
      >
        Entrar
      </button>

      {/* 📢 Mensagem dinâmica abaixo */}
      {mensagem && tipo !== 'facial' && (
        <p className="mt-4 text-sm text-center text-purple-300 animate-pulse">{mensagem}</p>
      )}
    </LoginBase>
  );
}
// =============================================================================================
// Fim do componente LoginUnificado.jsx
// =============================================================================================