// ------------------------------
// Componente PingBackend.jsx
// ------------------------------
// Responsável por fazer o “ping” no backend e mostrar o status da conexão.
// Usa React hooks para controle de estado e efeito colateral.

import React, { useEffect, useState } from 'react';

export default function PingBackend() {
  // Estado para armazenar a resposta do backend
  const [ping, setPing] = useState('…carregando ping…');

  // useEffect roda uma vez após o componente ser montado
  useEffect(() => {
    // Faz a requisição GET para o endpoint do backend
    fetch('http://localhost:5000/api/mensagem')
      .then((res) => {
        // Verifica se a resposta foi OK (status 200–299)
        if (!res.ok) {
          throw new Error(`Erro HTTP! status: ${res.status}`);
        }
        // Converte a resposta para JSON
        return res.json();
      })
      .then((data) => {
        // Atualiza o estado com a mensagem recebida
        setPing(data.mensagem);
      })
      .catch((err) => {
        // Caso dê erro, loga no console e atualiza a mensagem para o usuário
        console.error('Erro ao buscar ping:', err);
        setPing('Não foi possível conectar ao backend.');
      });
  }, []); // [] garante que esse efeito rode apenas uma vez

  // JSX que renderiza o status do ping
  return (
    <section style={{ marginBottom: '2rem' }}>
      <strong>Ping do backend:</strong> {ping}
    </section>
  );
}
