// ========================================================================================
// 📄 FumacaMagica.jsx – Efeito de fumaça flutuante com visual mágico e automático
// Projeto: O Bem Te Quer 💜 – Adicionado ao Login Mágico para imersão encantada
// ========================================================================================

import React, { useEffect } from 'react';

export default function FumacaMagica() {
  useEffect(() => {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = 0;
    container.style.left = 0;
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = 4;
    container.style.overflow = 'hidden';
    document.body.appendChild(container);

    for (let i = 0; i < 10; i++) {
      const fumaça = document.createElement('div');
      fumaça.style.position = 'absolute';
      fumaça.style.bottom = `${Math.random() * 20}%`;
      fumaça.style.left = `${Math.random() * 100}%`;
      fumaça.style.width = '150px';
      fumaça.style.height = '150px';
      fumaça.style.background = 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 80%)';
      fumaça.style.borderRadius = '50%';
      fumaça.style.filter = 'blur(20px)';
      fumaça.style.animation = `subirFumaca ${8 + Math.random() * 5}s linear infinite`;
      container.appendChild(fumaça);
    }

    return () => container.remove();
  }, []);

  return null;
}

// CSS sugerido no global.css:
// @keyframes subirFumaca {
//   0%   { transform: translateY(0) scale(1); opacity: 0.5; }
//   50%  { transform: translateY(-100px) scale(1.1); opacity: 0.3; }
//   100% { transform: translateY(-200px) scale(1.2); opacity: 0; }
// }
