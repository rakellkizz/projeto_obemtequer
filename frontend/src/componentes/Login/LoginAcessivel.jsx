// =====================================================
// Componente: LoginAcessivel
// Projeto: O Bem Te Quer
// Descrição: Tela de login com foco em acessibilidade,
//            suporte a voz (sintetizador + reconhecimento),
//            feedback auditivo, modo escuro, verificação de sessão,
//            atalho de teclado e reconhecimento facial.
// =====================================================

import React, { useState, useEffect } from 'react';
import './login.css';
import { ReactComponent as UserIcon } from './icons/user.svg';
import { ReactComponent as LockIcon } from './icons/lock.svg';
import * as faceapi from 'face-api.js';

const LoginAcessivel = ({ onLoginSuccess }) => {
  // Estados controlados
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [modoEscuro, setModoEscuro] = useState(false);

  // ========================
  // ACESSIBILIDADE: Leitura inicial da tela ao carregar
  // ========================
  useEffect(() => {
    const boasVindas = `
      Bem-vinda ao sistema de login acessível. 
      Use o campo de usuário e senha ou pressione Control + M para ativar o modo de voz.
      Você também pode fazer login usando o reconhecimento facial.
    `;
    falar(boasVindas);
  }, []);

  // ========================
  // MODO ESCURO: Detecta preferência do sistema ou localStorage
  // ========================
  useEffect(() => {
    const preferenciaSistema = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const modoSalvo = localStorage.getItem('modo_escuro') === 'true';

    if (preferenciaSistema || modoSalvo) {
      document.documentElement.classList.add('dark');
      setModoEscuro(true);
    }
  }, []);

  // ========================
  // SESSÃO: Verifica se o usuário já está logado
  // ========================
  useEffect(() => {
    const logado = sessionStorage.getItem('usuario_logado');
    if (logado === 'true') {
      falar('Olá, Raquel! Que bom te ver aqui novamente.');
      setTimeout(() => onLoginSuccess(), 3000);
    }
  }, [onLoginSuccess]);

  // ========================
  // ATALHO: Ctrl+M ativa reconhecimento de voz
  // ========================
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'm') {
        iniciarReconhecimento();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ========================
  // FACE API: Carrega modelos para reconhecimento facial
  // ========================
  useEffect(() => {
    const carregarModelos = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    };
    carregarModelos();
  }, []);

  // ========================
  // FALA: Usa sintetizador de voz
  // ========================
  const falar = (mensagem) => {
    const fala = new SpeechSynthesisUtterance(mensagem);
    fala.lang = 'pt-BR';
    speechSynthesis.speak(fala);
  };

  // ========================
  // LOGIN: Função principal de login com confirmação por voz
  // ========================
  const fazerLogin = async (e) => {
    e.preventDefault();

    // Validação básica para demonstração
    if (usuario === 'admin' && senha === '1234') {
      // Confirmação por voz antes de logar
      const confirmado = await confirmarPorVoz('Deseja realmente fazer login como admin? Diga sim ou não.');
      if (confirmado) {
        sessionStorage.setItem('usuario_logado', 'true');
        setMensagemErro('');
        falar('Login realizado com sucesso. Seja bem-vinda, Raquel.');
        onLoginSuccess();
      } else {
        falar('Login cancelado.');
      }
    } else {
      const msg = 'Usuário ou senha inválidos.';
      setMensagemErro(msg);
      falar(msg);
    }
  };

  // ========================
  // RECONHECIMENTO DE VOZ: Preenche usuário e senha
  // ========================
  const iniciarReconhecimento = () => {
    const Reconhecimento = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Reconhecimento) {
      falar('Reconhecimento de voz não suportado neste navegador.');
      return;
    }

    const reconhecimento = new Reconhecimento();
    reconhecimento.lang = 'pt-BR';

    reconhecimento.onresult = (event) => {
      const texto = event.results[0][0].transcript;
      const partes = texto.split(' ');
      setUsuario(partes[0] || '');
      setSenha(partes.slice(1).join('') || '');
      falar('Usuário e senha preenchidos com sucesso.');
    };

    reconhecimento.start();
  };

  // ========================
  // CONFIRMAÇÃO DE VOZ: Pergunta "sim ou não" ao usuário
  // ========================
  const confirmarPorVoz = () => {
    return new Promise((resolve) => {
      const Reconhecimento = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!Reconhecimento) {
        falar('Seu navegador não suporta reconhecimento de voz.');
        return resolve(false);
      }

      const reconhecimento = new Reconhecimento();
      reconhecimento.lang = 'pt-BR';

      reconhecimento.onresult = (event) => {
        const resposta = event.results[0][0].transcript.toLowerCase();
        if (resposta.includes('sim')) resolve(true);
        else resolve(false);
      };

      reconhecimento.start();
    });
  };

  // ========================
  // MODO ESCURO: Alterna tema e salva preferência
  // ========================
  const alternarModo = () => {
    const novoModo = !modoEscuro;
    setModoEscuro(novoModo);
    localStorage.setItem('modo_escuro', novoModo);
    document.documentElement.classList.toggle('dark', novoModo);
  };

  // ========================
  // LOGIN FACIAL: Usa webcam e face-api.js
  // ========================
  const iniciarReconhecimentoFacial = async () => {
    const video = document.createElement('video');
    video.style.display = 'none';
    document.body.appendChild(video);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      video.srcObject = stream;
      video.play();

      setTimeout(async () => {
        const detections = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detections) {
          falar('Rosto detectado com sucesso. Login liberado.');
          sessionStorage.setItem('usuario_logado', 'true');
          onLoginSuccess();
        } else {
          falar('Nenhum rosto foi detectado.');
        }

        stream.getTracks().forEach((track) => track.stop());
        document.body.removeChild(video);
      }, 3000);
    } catch (err) {
      falar('Erro ao acessar a câmera.');
    }
  };

  return (
    <div className={`login-container ${modoEscuro ? 'modo-escuro' : ''}`} role="main">
      <h1>Login Acessível</h1>

      <button onClick={alternarModo} className="btn-tema" aria-label="Alternar modo escuro ou claro">
        {modoEscuro ? '☀️ Claro' : '🌙 Escuro'}
      </button>

      <form onSubmit={fazerLogin} aria-label="Formulário de login">
        <label htmlFor="usuario">Usuário:</label>
        <div className="campo-icone">
          <UserIcon className="icone" />
          <input
            id="usuario"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            autoComplete="username"
            aria-label="Campo de entrada de usuário"
          />
        </div>

        <label htmlFor="senha">Senha:</label>
        <div className="campo-icone">
          <LockIcon className="icone" />
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="current-password"
            aria-label="Campo de entrada de senha"
          />
        </div>

        <button type="submit" aria-label="Botão para entrar">Entrar</button>

        <button type="button" onClick={iniciarReconhecimento} aria-label="Login por comando de voz">
          🎤 Login por voz
        </button>

        <button type="button" onClick={iniciarReconhecimentoFacial} aria-label="Login por reconhecimento facial">
          👁️ Login facial
        </button>

        {mensagemErro && (
          <div role="alert" aria-live="assertive" className="mensagem-erro">
            {mensagemErro}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginAcessivel;
