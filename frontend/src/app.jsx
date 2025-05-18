// App.jsx
// Componente raiz da aplicação "O Bem Te Quer"
// Implementa interface principal com escolha de modelo (Gemini/OpenAI),
// campo para envio de mensagens e exibição das respostas da IA.

/**
 * Importações principais da biblioteca React e hooks.
 */
import React, { useState } from 'react';

/**
 * Importação de estilos globais e específicos do chatbot.
 */
import './styles/global.css';
import './styles/chatbot.css';

/**
 * Componente funcional do Chatbot.
 * Controla o fluxo da conversa, seleção do modelo de IA e comunicação com backend.
 */
const Chatbot = () => {
  // Estado para armazenar as mensagens da conversa (usuário e bot)
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Olá! Eu sou o Bem, seu companheiro de acolhimento. 💛' }
  ]);

  // Estado do campo de input do usuário
  const [input, setInput] = useState('');

  // Estado para controlar o modelo selecionado: 'gemini' ou 'openai'
  const [modelo, setModelo] = useState('gemini');

  // Estado para mostrar status de envio/resposta
  const [loading, setLoading] = useState(false);

  /**
   * Função para enviar a mensagem do usuário para o backend
   * e receber a resposta da IA conforme o modelo selecionado.
   */
  const sendMessage = async () => {
    const texto = input.trim();
    if (!texto) return;

    // Adiciona mensagem do usuário ao histórico
    const userMessage = { id: Date.now(), type: 'user', text: texto };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Requisição POST para backend enviando a mensagem e modelo escolhido
      const response = await fetch('/api/chat/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensagem: texto, modelo }),
      });

      if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
      }

      // Recebe a resposta JSON com a mensagem gerada pela IA
      const data = await response.json();

      // Adiciona resposta da IA ao histórico de mensagens
      const botMessage = { id: Date.now() + 1, type: 'bot', text: data.resposta };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      // Mensagem de erro visível para o usuário
      const errorMessage = { id: Date.now() + 1, type: 'bot', text: 'Ops! Houve um problema ao conectar com a IA.' };
      setMessages(prev => [...prev, errorMessage]);
      console.error('Erro ao chamar API:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Cabeçalho */}
      <div className="chatbot-header">
        O Bem Te Quer 🤖💛
      </div>

      {/* Seleção do modelo de IA */}
      <div className="chatbot-model-select" style={{ marginBottom: '1rem' }}>
        <label>
          <input
            type="radio"
            name="modelo"
            value="gemini"
            checked={modelo === 'gemini'}
            onChange={() => setModelo('gemini')}
          />
          Gemini (Google)
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            name="modelo"
            value="openai"
            checked={modelo === 'openai'}
            onChange={() => setModelo('openai')}
          />
          OpenAI (ChatGPT)
        </label>
      </div>

      {/* Área de mensagens */}
      <div className="chatbot-messages" style={{ minHeight: '300px', overflowY: 'auto', border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`chatbot-message ${msg.type}`}
            style={{
              backgroundColor: msg.type === 'user' ? '#DCF8C6' : '#FFF',
              textAlign: msg.type === 'user' ? 'right' : 'left',
              padding: '0.5rem 1rem',
              margin: '0.3rem 0',
              borderRadius: '12px',
              maxWidth: '75%',
              alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="chatbot-message bot" style={{ fontStyle: 'italic' }}>Pensando...</div>}
      </div>

      {/* Campo de entrada e botão de enviar */}
      <div className="chatbot-input" style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="Escreva sua mensagem..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          disabled={loading}
          style={{ flexGrow: 1, padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #ccc' }}
          aria-label="Campo de mensagem para enviar ao chatbot"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            padding: '0 1.5rem',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: '#ffcc00',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
          }}
          aria-label="Enviar mensagem"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

/**
 * Componente principal da aplicação.
 * Renderiza o chatbot e outros elementos visuais ou funcionais do app.
 */
function App() {
  return (
    <div className="App" style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      {/* Aqui você pode colocar um avatar, header ou qualquer outra coisa */}
      <h1 style={{ textAlign: 'center', color: '#ffcc00' }}>O Bem Te Quer</h1>

      {/* Componente Chatbot */}
      <Chatbot />
    </div>
  );
}

/**
 * Exporta o componente principal para renderização no index.js.
 */
export default App;
