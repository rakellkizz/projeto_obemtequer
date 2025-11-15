// src/components/BenAvatar.jsx
import React from 'react';
import './BenAvatar.css';

const BenAvatar = () => {
  return (
    <div className="ben-avatar-container">
      <img
        src="/assets/ben.png"
        alt="Avatar do Ben, o companheiro de acolhimento"
        className="ben-avatar-image"
      />
    </div>
  );
};

export default BenAvatar;
