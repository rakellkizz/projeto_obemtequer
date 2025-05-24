// app.jsx
// Componente principal da aplicação "O Bem Te Quer"
// Exibe um formulário de login acessível e, após login bem-sucedido, mostra o avatar animado do Ben.

import React, { useState } from 'react';
import BenAvatar from './componentes/BenAvatar/BenAvatar';

/**
 * Componente funcional para o formulário de login acessível.
 * Permite login por texto e por voz, com feedback falado.
 *
 * Props:
 *  - onLoginSuccess: função callback chamada quando o login é realizado com sucesso.
 */
const LoginAcessivel = ({ onLoginSuccess }) => {
  // Estado para armazenar o usuário digitado
  const [usuario, setUsuario] = useState('');
  // Estado para armazenar a senha digitada
  const [senha, setSenha] = useState('');
  // Estado para armazenar mensagens de erro exibidas ao usuário
  const [mensagemErro, setMensagemErro] = useState('');

  /**
   * Função para sintetizar voz com a mensagem passada.
   * Utiliza a API Web Speech para leitura de texto.
   *
   * @param {string} mensagem - Texto a ser falado.
   */
  const falar = (mensagem) => {
    const fala = new SpeechSynthesisUtterance(mensagem);
    speechSynthesis.speak(fala);
  };

  /**
   * Função chamada ao submeter o formulário de login.
   * Realiza validação simples e chama callback em caso de sucesso.
   *
   * @param {Event} e - Evento de submissão do formulário.
   */
  const fazerLogin = (e) => {
    e.preventDefault();

    // Validação básica: usuário 'admin' e senha '1234' são aceitos
    if (usuario === 'admin' && senha === '1234') {
      setMensagemErro('');
      falar('Login realizado com sucesso.');
      onLoginSuccess(); // Notifica o componente pai que login foi bem-sucedido
    } else {
      const msg = 'Usuário ou senha inválidos.';
      setMensagemErro(msg);
      falar(msg);
    }
  };

  /**
   * Função para iniciar o reconhecimento de voz.
   * Preenche os campos usuário e senha com o texto reconhecido,
   * assumindo que o usuário fale "usuario senha".
   */
  const iniciarReconhecimento = () => {
    // Detecta a API SpeechRecognition conforme o navegador
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      falar('Reconhecimento de voz não suportado neste navegador.');
      setMensagemErro('Seu navegador não suporta reconhecimento de voz.');
      return;
    }

    const reconhecimento = new SpeechRecognition();
    reconhecimento.lang = 'pt-BR';

    reconhecimento.onresult = (event) => {
      // Obtém o texto falado
      const texto = event.results[0][0].transcript.trim();
      // Divide em partes assumindo "usuario senha"
      const partes = texto.split(' ');
      // Atualiza os campos de input
      setUsuario(partes[0] || '');
      setSenha(partes.slice(1).join('') || '');
      falar('Usuário e senha preenchidos com sucesso.');
    };

    reconhecimento.onerror = (event) => {
      setMensagemErro('Erro no reconhecimento de voz: ' + event.error);
      falar('Erro no reconhecimento de voz.');
    };

    reconhecimento.start();
  };

  return (
    <div className="login-container">
      <h1>Login Acessível</h1>
      <form onSubmit={fazerLogin} aria-describedby="mensagem-erro">
        <label htmlFor="usuario">Usuário:</label>
        <input
          id="usuario"
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          autoComplete="username"
          aria-required="true"
        />

        <label htmlFor="senha">Senha:</label>
        <input
          id="senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="current-password"
          aria-required="true"
        />

        <button type="submit">Entrar</button>
        <button type="button" onClick={iniciarReconhecimento} aria-label="Login por voz">
          🎤 Login por voz
        </button>

        <div
          id="mensagem-erro"
          role="alert"
          aria-live="assertive"
          style={{ color: 'red', marginTop: '1em' }}
        >
          {mensagemErro}
        </div>
      </form>
    </div>
  );
};

/**
 * Componente principal da aplicação.
 * Controla o estado de autenticação para mostrar
 * o login ou o avatar animado do Ben.
 */
const App = () => {
  const [logado, setLogado] = useState(false);

  // Renderiza o avatar se logado, ou o formulário de login se não
  return logado ? (
    <BenAvatar />
  ) : (
    <LoginAcessivel onLoginSuccess={() => setLogado(true)} />
  );
};

export default App;
