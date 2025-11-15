// ============================================================================
// 📄 TestaTailwind.jsx – Teste visual do Tailwind no projeto
// Projeto: O Bem Te Quer 💜
// Função: Verificar se as classes Tailwind estão sendo aplicadas corretamente
// ============================================================================

import React from 'react'; // 🧙 Importa React para criar componentes
import '../global.css'; // 🌍 Garante que o estilo global esteja aplicado

function TestaTailwind() {
  return (
    <div className="app-container">
      <div className="testar-tailwind">
        Tailwind funcionando com sucesso! 🎉
      </div>
    </div>
  );
}

export default TestaTailwind;
