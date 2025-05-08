// src/components/Chatbot.jsx

import React, { useState } from 'react';
import './App.css'; // Estilização global da aplicação
import { enviarMensagemParaBot } from '../services/conexao'; // Módulo responsável pelas respostas do bot

/**
 * Componente Chatbot
 * Interface de conversa acolhedora e empática com o usuário.
 * Modularizado para futuras integrações com APIs de IA reais.
 */
function Chatbot() {
  // Armazena o histórico de mensagens da conversa
  const [messages, setMessages] = useState([]);

  // Armazena a mensagem digitada no campo de entrada
  const [currentMessage, setCurrentMessage] = useState('');

  /**
   * Atualiza o estado à medida que o usuário digita
   * @param {Event} event - Evento do input
   */
  const handleInputChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  /**
   * Envia a mensagem do usuário e obtém a resposta do bot
   * A resposta é gerada via função externa simulada (conexao.js)
   */
  const handleSendMessage = async () => {
    if (currentMessage.trim() === '') return;

    const userMsg = {
      text: currentMessage,
      sender: 'user',
    };

    try {
      const resposta = await enviarMensagemParaBot(currentMessage);

      const botMsg = {
        text: resposta.resposta,
        sender: 'bot',
      };

      // Atualiza o histórico de mensagens com a pergunta e a resposta
      setMessages((prevMessages) => [...prevMessages, userMsg, botMsg]);
    } catch (error) {
      console.error('Erro ao gerar resposta do bot:', error);
    }

    // Limpa o campo de entrada
    setCurrentMessage('');
  };

  return (
    <div className="chatbot">
      {/* Título carinhoso do chatbot */}
      <h2 className="chatbot-title">
        Converse com o <span className="highlight">Bem Te Quer</span> 💖
      </h2>

      {/* Lista de mensagens da conversa */}
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Campo de entrada e botão de envio */}
      <div className="chatbot-input">
        <input
          type="text"
          value={currentMessage}
          onChange={handleInputChange}
          placeholder="Como você está se sentindo hoje?"
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
}

export default Chatbot;
