// BenAvatar.jsx
// Componente de avatar animado do Ben
// Exibe a imagem do personagem com efeito flutuante e responsivo

import React from 'react';
import BenAvatar from './componentes/BenAvatar/BenAvatar';// Importação do estilo com animação

/**
 * Componente funcional que exibe o avatar animado do Ben.
 */
const BenAvatar = () => {
  return (
    <div className="ben-avatar-container">
      <img
        src="/images/ben-avatar.png"
        alt="Avatar do Ben - O Bem Te Quer"
        className="ben-avatar-image"
      />
    </div>
  );
};

export default BenAvatar;
