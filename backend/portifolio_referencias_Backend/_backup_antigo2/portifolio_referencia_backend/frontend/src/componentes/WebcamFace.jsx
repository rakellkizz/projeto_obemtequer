// ------------------------------
// src/components/WebcamFace.jsx
// ------------------------------
// Componente que exibe o vídeo da webcam e botão para ativar detecção facial via face-api.js
// Usa referência React para controlar o elemento de vídeo e iniciar a captura quando o usuário clicar

import React, { useRef } from 'react';
import { iniciarDeteccao } from '../face/faceDetection';

export default function WebcamFace() {
  // Referência ao elemento <video> para manipulação direta da webcam
  const videoRef = useRef(null);

  // Função chamada ao clicar no botão, inicia a detecção facial
  const handleClick = () => {
    if (videoRef.current) {
      iniciarDeteccao(videoRef.current);
    } else {
      console.warn('Elemento de vídeo não está disponível');
    }
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '30px' }}>
      {/* Título da seção */}
      <h2>🎥 Detecção Facial com IA</h2>

      {/* Elemento de vídeo onde a webcam será exibida */}
      <video
        ref={videoRef}
        width="480"
        height="360"
        style={{ border: '2px solid #888', borderRadius: '8px' }}
        autoPlay
        muted
      />

      <br />

      {/* Botão para iniciar a câmera e detecção facial */}
      <button
        onClick={handleClick}
        style={{
          marginTop: '15px',
          padding: '10px 20px',
          cursor: 'pointer',
          borderRadius: '6px',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          fontSize: '1rem',
        }}
      >
        Ativar Câmera
      </button>
    </div>
  );
}
