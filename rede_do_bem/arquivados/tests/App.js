// ------------------------------
// IMPORTAÇÃO DE RECURSOS
// ------------------------------

import './App.css'; // Importa os estilos globais
import React from 'react';

// ------------------------------
// COMPONENTE PRINCIPAL
// ------------------------------

/**
 * Interface inicial com design futurista e profissional.
 * Ideal para destacar o propósito do projeto com estilo moderno.
 */
function App() {
  return (
    <div className="App futuristic-background">
      {/* Container centralizado */}
      <header className="App-header card-glass">
        {/* Título com efeito futurista */}
        <h1 className="neon-text">O Bem Te Quer</h1>

        {/* Subtítulo com mensagem acolhedora */}
        <p className="subtext">Tecnologia com empatia, acolhimento e propósito 💛</p>

        {/* Botão futurista (pode ser vinculado a futuras ações) */}
        <button className="btn-glow">Começar Jornada</button>
      </header>
    </div>
  );
}

// ------------------------------
// EXPORTAÇÃO DO COMPONENTE
// ------------------------------

export default App;
