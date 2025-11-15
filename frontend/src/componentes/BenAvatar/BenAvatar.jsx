// src/componentes/BenAvatar/BenAvatar.jsx
import React from 'react';
import "./BenAvatar.css"; // Estilos visuais do avatar

const BenAvatar = () => {
  return (
    <div className="ben-avatar-container">
      <img
        src="/ben.png"  // Certifique-se de que está em /public/ben.png
        alt="Avatar do Ben, o companheiro de acolhimento"
        className="ben-avatar-image"
      />
      <p className="ben-avatar-msg">Oi! Eu sou o Ben. Posso te ouvir e te ajudar. 💬</p>
    </div>
  );
};

export default BenAvatar;
