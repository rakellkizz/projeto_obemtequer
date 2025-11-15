// ------------------------------
// Arquivo principal App.js
// ------------------------------
// Importa os componentes criados para montar a aplicação

import React from 'react';
import PingBackend from './components/PingBackend';
import FormularioMensagem from './components/FormularioMensagem';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      {/* Título principal */}
      <h1>🌻 O Bem Te Quer</h1>

      {/* Componente que mostra status do backend */}
      <PingBackend />

      {/* Componente que exibe formulário e envia mensagens */}
      <FormularioMensagem />
    </div>
  );
}

export default App;
