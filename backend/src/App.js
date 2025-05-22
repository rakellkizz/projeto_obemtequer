// ------------------------------
// ARQUIVO: App.js (FRONTEND)
// ------------------------------
// Componente principal do React que:
// 1. Faz “ping” no backend para verificar se está online.
// 2. Exibe um formulário para enviar novas mensagens ao servidor.
// 3. Mostra status de envio ao usuário.

// Importação dos hooks do React para estado e efeitos colaterais
import React, { useEffect, useState } from 'react';

function App() {
  // ------------------------------
  // 1. ESTADOS DO COMPONENTE
  // ------------------------------
  // Armazena a resposta de “ping” do backend
  const [ping, setPing] = useState('…carregando ping…');
  // Campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  // Mensagem de status após tentativa de envio
  const [statusEnvio, setStatusEnvio] = useState('');

  // ------------------------------
  // 2. EFEITO DE “PING” AO BACKEND
  // ------------------------------
  // Executa uma vez após o primeiro render
  useEffect(() => {
    fetch('http://localhost:5000/api/mensagem')            // URL de teste no backend
      .then((res) => {
        if (!res.ok) {                                      // Se o status não for 2xx
          throw new Error(`Erro HTTP! status: ${res.status}`);
        }
        return res.json();                                  // Converte resposta em JSON
      })
      .then((data) => {
        setPing(data.mensagem);                             // Coloca a mensagem no estado
      })
      .catch((err) => {
        console.error('Erro ao buscar ping:', err);
        setPing('Não foi possível conectar ao backend.');
      });
  }, []); // Array vazio = executa apenas uma vez

  // ------------------------------
  // 3. HANDLER DE ENVIO DO FORMULÁRIO
  // ------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();                                     // Impede reload automático
    setStatusEnvio('Enviando…');                            // Feedback inicial

    try {
      // Monta requisição POST para criar nova mensagem
      const res = await fetch('http://localhost:5000/api/mensagens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },    // JSON no corpo
        body: JSON.stringify({ nome, email, mensagem })
      });

      if (!res.ok) {                                        // Erro de servidor ou validação
        throw new Error(`Status ${res.status}`);
      }

      await res.json();                                     // Pega resposta (objeto da mensagem criada)
      setStatusEnvio('Mensagem enviada com sucesso! 🎉');  // Feedback positivo

      // Limpa campos após sucesso
      setNome('');  
      setEmail('');  
      setMensagem('');
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      setStatusEnvio('Falha ao enviar mensagem. Tente novamente.');
    }
  };

  // ------------------------------
  // 4. RENDERIZAÇÃO DO COMPONENTE
  // ------------------------------
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      {/* Título */}
      <h1>🌻 O Bem Te Quer</h1>

      {/* Seção de ping */}
      <section style={{ marginBottom: '2rem' }}>
        <strong>Ping do backend:</strong> {ping}
      </section>

      {/* Seção de formulário */}
      <section>
        <h2>Envie sua mensagem</h2>
        <form onSubmit={handleSubmit}
              style={{
                display: 'grid',
                gap: '1rem',
                maxWidth: '400px'
              }}
        >
          {/* Campo Nome */}
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          {/* Campo E‑mail */}
          <input
            type="email"
            placeholder="Seu e‑mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Campo Mensagem */}
          <textarea
            placeholder="Sua mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            rows={4}
            required
          />

          {/* Botão de Enviar */}
          <button type="submit">Enviar</button>
        </form>

        {/* Status do envio */}
        {statusEnvio && (
          <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
            {statusEnvio}
          </p>
        )}
      </section>
    </div>
  );
}

export default App;
