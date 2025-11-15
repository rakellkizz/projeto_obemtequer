// src/App.jsx

import React from 'react';

// Importa o componente do Avatar animado do Ben
import BenAvatar from './componentes/BenAvatar/BenAvatar';

// Importa o componente que captura a face pela webcam usando face-api.js
import WebcamFace from './componentes/WebcamFace';

/**
 * Componente raiz da aplicação React.
 * Aqui organizamos os principais componentes da página inicial,
 * incluindo o avatar animado e a captura da webcam para reconhecimento facial.
 */
function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        fontFamily: "'Segoe UI', sans-serif",
        gap: '1.5rem',
      }}
    >
      {/* Exibe o avatar animado do Ben */}
      <BenAvatar />

      {/* Componente que ativa a webcam e captura a face */}
      <WebcamFace />

      {/* Aqui você pode adicionar outros componentes do chatbot */}
    </div>
  );
}

export default App;
