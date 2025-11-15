// ========================================================================================
// 📄 ParticulasMagicas.jsx – Efeito visual encantado com partículas flutuantes (✨)
// Projeto: O Bem Te Quer 💜 – Componente decorativo para criar um clima mágico e leve
// ========================================================================================

import React, { useEffect } from 'react';

export default function ParticulasMagicas() {
  useEffect(() => {
    const quantidade = 25; // 🌟 Número de partículas mágicas
    const container = document.createElement('div'); // 📦 Container invisível

    // 🎯 Posicionamento e estilo base do container
    container.style.position = 'fixed';
    container.style.top = 0;
    container.style.left = 0;
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none'; // ❌ Não interfere em cliques
    container.style.zIndex = 5;
    container.classList.add('fundo-planeta-animado'); // (opcional) camada decorativa
    document.body.appendChild(container);

    // ✨ Cria as partículas individualmente
    for (let i = 0; i < quantidade; i++) {
      const particula = document.createElement('div');
      particula.classList.add('particula-magica');

      // 🌈 Estilo visual da partícula
      particula.style.position = 'absolute';
      particula.style.width = '6px';
      particula.style.height = '6px';
      particula.style.borderRadius = '50%';
      particula.style.background = 'rgba(255, 255, 255, 0.6)';
      particula.style.top = `${Math.random() * 100}%`;
      particula.style.left = `${Math.random() * 100}%`;

      // 🌀 Animação flutuante com tempo aleatório
      particula.style.animation = `flutuar ${5 + Math.random() * 10}s infinite ease-in-out`;
      container.appendChild(particula);
    }

    // 🧹 Remove as partículas ao desmontar o componente
    return () => container.remove();
  }, []);

  // ⛔ Nada visível diretamente via JSX
  return null;
}
