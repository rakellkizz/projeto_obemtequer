// App.jsx
// Componente raiz da aplicação "O Bem Te Quer"
// Estrutura a interface principal, integrando o Avatar e o Chatbot com estilos globais e organização modular.

/**
 * Importações principais da biblioteca React.
 */
import React from 'react';

/**
 * Importação de estilos globais.
 */
// Importação de estilos globais e específicos
import './styles/global.css';     // Estilos base + reset + componentes
import './styles/chatbot.css';    // Estilos específicos do Chatbot
import Avatar from './componentes/avatar'; // Componente Avatar

/**
 * Componente funcional do Chatbot.
 * Representa o assistente empático que conversa com o usuário.
 */
const Chatbot = () => {
  const [messages, setMessages] = React.useState([
    { id: 1, type: 'bot', text: 'Olá! Eu sou o Bem, seu companheiro de acolhimento. 💛' }
  ]);
  const [input, setInput] = React.useState('');

  /**
   * Envia mensagem do usuário e resposta simulada do bot.
   */
  const sendMessage = () => {
    if (!input.trim()) return;

    // Adiciona mensagem do usuário
    const newMessage = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Simula resposta automática do bot
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: 'Estou aqui para ouvir você. Conte comigo!'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        O Bem Te Quer 🤖💛
      </div>

      <div className="chatbot-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`chatbot-message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Escreva sua mensagem..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

/**
 * Componente principal da aplicação.
 * Renderiza o avatar e o chatbot com acessibilidade e design amigável.
 */
function App() {
  return (
    <div className="App">
      {/* Avatar representando o assistente virtual */}
      <div style={{ margin: '1rem' }}>
        <Avatar
          src=""
          alt="Avatar do assistente Bem"
          size="avatar-md"
          fallback="Bem"
        />
      </div>

      {/* Componente do chatbot */}
      <Chatbot />
    </div>
  );
}

/**
 * Exporta o componente principal para renderização.
 */
export default App;
