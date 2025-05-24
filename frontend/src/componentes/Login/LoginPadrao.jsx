// LoginAcessivel.jsx
// Componente de login com suporte a voz, acessível e inclusivo
// Faz parte do projeto "O Bem Te Quer"

import React, { useState } from 'react';
import './login.css'; // Estilos específicos do formulário de login

/**
 * Componente de Login com acessibilidade e reconhecimento de voz.
 * Permite entrada de usuário e senha por voz e fornece feedback auditivo.
 *
 * Props:
 * - onLoginSuccess: função a ser executada ao login bem-sucedido
 */
const LoginAcessivel = ({ onLoginSuccess }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  /**
   * Fala a mensagem usando a API de síntese de voz do navegador
   * @param {string} mensagem
   */
  const falar = (mensagem) => {
    const fala = new SpeechSynthesisUtterance(mensagem);
    speechSynthesis.speak(fala);
  };

  /**
   * Lida com envio do formulário e validação das credenciais
   * @param {Event} e
   */
  const fazerLogin = (e) => {
    e.preventDefault();

    // Simulação de login com usuário fixo
    if (usuario === 'admin' && senha === '1234') {
      setMensagemErro('');
      falar('Login realizado com sucesso!');
      onLoginSuccess(); // Executa callback passada via props
    } else {
      const erro = 'Usuário ou senha inválidos.';
      setMensagemErro(erro);
      falar(erro);
    }
  };

  /**
   * Ativa o reconhecimento de voz para preencher usuário e senha
   */
  const iniciarReconhecimento = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Seu navegador não suporta reconhecimento de voz.');
      return;
    }

    const reconhecimento = new SpeechRecognition();
    reconhecimento.lang = 'pt-BR';

    reconhecimento.onresult = (event) => {
      const texto = event.results[0][0].transcript;
      const palavras = texto.trim().split(' ');
      setUsuario(palavras[0] || '');
      setSenha(palavras.slice(1).join('') || '');
      falar('Usuário e senha preenchidos com sucesso.');
    };

    reconhecimento.onerror = () => {
      falar('Houve um erro no reconhecimento de voz.');
    };

    reconhecimento.start();
  };

  return (
    <div className="login-container" role="main" aria-label="Área de login com acessibilidade">
      <h1>Login Acessível</h1>
      <form onSubmit={fazerLogin}>
        <label htmlFor="usuario">Usuário:</label>
        <input
          id="usuario"
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          autoComplete="username"
          aria-label="Campo de usuário"
        />

        <label htmlFor="senha">Senha:</label>
        <input
          id="senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="current-password"
          aria-label="Campo de senha"
        />

        <button type="submit">Entrar</button>
        <button type="button" onClick={iniciarReconhecimento}>
          🎤 Login por voz
        </button>

        {mensagemErro && (
          <div className="mensagem-erro" role="alert" aria-live="assertive">
            {mensagemErro}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginAcessivel;
