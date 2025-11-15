// =====================================================================================
// 📄 TelaXadrez.jsx – Tela com integração do ComponenteXadrez modular
// Projeto: O Bem Te Quer 💜 – Conecta menu com jogo de xadrez acessível
// =====================================================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ComponenteXadrez from "./ComponenteXadrez";   // ✅ Caminho ajustado conforme seu projeto
import '../../global.css';

export default function TelaXadrez() {
  const navigate = useNavigate();

  // 🔁 Ação de retorno ao menu
  const voltarAoMenu = () => {
    navigate('/menu-principal');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-transparent">
      {/* 🔘 Botão de retorno ao menu principal */}
      <button
        onClick={voltarAoMenu}
        className="px-4 py-2 mb-6 text-white transition bg-purple-600 rounded-xl hover:bg-purple-700"
      >
        ⬅️ Voltar ao Menu Principal
      </button>

      {/* ♟️ Componente de Xadrez com IA embutida */}
      <ComponenteXadrez onCancelar={voltarAoMenu} vozAtiva={true} />
    </div>
  );
}
  // =====================================================================================
      {/* 🕹️ Componente de Xadrez com IA */ }
      // ComponenteXadrez.jsx
// =====================================================================================  
