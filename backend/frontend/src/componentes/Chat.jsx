import React, { useState } from 'react';

export default function Chat() {
  // Estado da mensagem que o usuário digita
  const [mensagem, setMensagem] = useState('');
  // Estado da resposta da IA
  const [resposta, setResposta] = useState('');
  // Estado do modelo selecionado (openai ou gemini)
  const [modelo, setModelo] = useState('gemini');
  // Estado para mostrar carregando enquanto espera resposta
  const [loading, setLoading] = useState(false);

  // Função para enviar a mensagem para o backend
  async function enviarMensagem() {
    if (!mensagem.trim()) return alert('Por favor, digite uma mensagem.');

    setLoading(true);
    setResposta('');

    try {
      // Faz a requisição POST para o backend com mensagem e modelo selecionado
      const res = await fetch('/api/chat/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensagem, modelo }),
      });

      if (!res.ok) throw new Error('Erro na resposta da API');

      const data = await res.json();

      // Atualiza o estado com a resposta da IA
      setResposta(data.resposta);
    } catch (error) {
      alert('Erro ao se comunicar com a IA: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Chat com IA - Gemini / OpenAI</h2>

      {/* Campo para digitar mensagem */}
      <textarea
        rows={5}
        style={{ width: '100%', padding: 10, fontSize: 16 }}
        placeholder="Digite sua mensagem aqui..."
        value={mensagem}
        onChange={e => setMensagem(e.target.value)}
      />

      {/* Botões para escolher o modelo */}
      <div style={{ margin: '1rem 0' }}>
        <label>
          <input
            type="radio"
            name="modelo"
            value="gemini"
            checked={modelo === 'gemini'}
            onChange={() => setModelo('gemini')}
          />
          Gemini
        </label>
        <label style={{ marginLeft: 20 }}>
          <input
            type="radio"
            name="modelo"
            value="openai"
            checked={modelo === 'openai'}
            onChange={() => setModelo('openai')}
          />
          OpenAI
        </label>
      </div>

      {/* Botão para enviar */}
      <button
        onClick={enviarMensagem}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: 16,
          cursor: loading ? 'not-allowed' : 'pointer',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: 4,
        }}
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </button>

      {/* Área para mostrar resposta */}
      {resposta && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            backgroundColor: '#f1f1f1',
            borderRadius: 4,
            whiteSpace: 'pre-wrap',
          }}
        >
          <strong>Resposta:</strong>
          <p>{resposta}</p>
        </div>
      )}
    </div>
  );
}
