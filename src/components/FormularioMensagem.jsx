// ------------------------------
// Componente FormularioMensagem.jsx
// ------------------------------
// Formulário para enviar uma nova mensagem ao backend.
// Controla os inputs, valida e envia via POST, mostrando status.

import React, { useState } from 'react';

export default function FormularioMensagem() {
  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  // Estado para mostrar status do envio ao usuário
  const [statusEnvio, setStatusEnvio] = useState('');

  // Função executada ao enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita reload da página
    setStatusEnvio('Enviando…'); // Feedback inicial

    try {
      // Envia os dados via POST para o backend
      const res = await fetch('http://localhost:5000/api/mensagens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, mensagem }),
      });

      // Se o status não for 2xx, lança um erro
      if (!res.ok) {
        throw new Error(`Status ${res.status}`);
      }

      await res.json(); // Recebe a resposta do backend (não usado aqui)
      setStatusEnvio('Mensagem enviada com sucesso! 🎉'); // Feedback sucesso

      // Limpa os campos após envio
      setNome('');
      setEmail('');
      setMensagem('');
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      setStatusEnvio('Falha ao enviar mensagem. Tente novamente.');
    }
  };

  // JSX que renderiza o formulário e o status
  return (
    <section>
      <h2>Envie sua mensagem</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gap: '1rem',
          maxWidth: '400px',
        }}
      >
        <input
          type="text"
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Seu e‑mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Sua mensagem"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          rows={4}
          required
        />
        <button type="submit">Enviar</button>
      </form>
      {statusEnvio && (
        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{statusEnvio}</p>
      )}
    </section>
  );
}
