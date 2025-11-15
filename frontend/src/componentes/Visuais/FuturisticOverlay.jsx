// =====================================================================================
// 📄 FuturisticOverlay.jsx – Overlay futurista com scanner animado e brilho pulsante
// Projeto: O Bem Te Quer 💜 – Acessibilidade + Visual Luxuoso ✨
// =====================================================================================

import React from 'react';

export default function FuturisticOverlay({ box }) {
  // ❌ Não renderiza se não houver rosto detectado
  if (!box) return null;

  // 🎯 Extrai coordenadas da face
  const { x, y, width, height } = box;

  // 💎 Estilo do contorno com efeitos internos e externos
  const estiloOverlay = {
    position: 'absolute',
    top: y,
    left: x,
    width,
    height,
    border: '3px solid rgba(0, 255, 255, 0.8)',
    borderRadius: '20px',
    backdropFilter: 'blur(2px)',
    overflow: 'hidden',
    zIndex: 20,
    boxShadow: `
      0 0 20px rgba(0, 255, 255, 0.6),         /* 💠 Brilho externo */
      0 0 10px rgba(0, 255, 255, 0.25) inset   /* 🌌 Sombra interna */
    `,
    animation: 'pulsarBorda 2s infinite ease-in-out'
  };

  // 🌈 Scanner animado atravessando o retângulo
  const scannerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, transparent 40%, rgba(0,255,255,0.25) 50%, transparent 60%)',
    animation: 'scannerMover 2.5s infinite linear',
    zIndex: 21,
  };

  return (
    <>
      {/* 🔁 Animações CSS: scanner e pulsação da borda */}
      <style>
        {`
          @keyframes scannerMover {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }

          @keyframes pulsarBorda {
            0%, 100% {
              box-shadow:
                0 0 20px rgba(0, 255, 255, 0.6),
                0 0 10px rgba(0, 255, 255, 0.25) inset;
            }
            50% {
              box-shadow:
                0 0 30px rgba(0, 255, 255, 0.8),
                0 0 14px rgba(0, 255, 255, 0.35) inset;
            }
          }
        `}
      </style>

      {/* 🧊 Overlay visual aplicado sobre a face */}
      <div style={estiloOverlay}>
        <div style={scannerStyle}></div>
      </div>
    </>
  );
}
