// ========================================================================================
// ARQUIVO: FaceRecognition.jsx
// 📸 Tela de reconhecimento facial ao vivo com face-api.js
// Função: Captura vídeo da webcam, detecta rosto, landmarks e gera descritor facial
// Acessível, moderno, responsivo, integrado ao projeto "O Bem Te Quer" 💜
// ========================================================================================

import React, { useEffect, useRef } from 'react'; // 🧙 Importa React e hooks necessários
import * as faceapi from 'face-api.js'; // Biblioteca de IA para detecção facial

export default function FaceRecognition() {
  // 🔁 Referências ao <video> e <canvas> para renderizar imagem e sobrepor pontos
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 🔄 Função que ativa a câmera do usuário
  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error('❌ Erro ao acessar webcam:', err);
      alert('⚠️ Não foi possível acessar a webcam. Verifique as permissões.');
    }
  };

  // 📦 Carrega modelos de detecção facial da pasta /models
  const loadModels = async () => {
    const MODEL_URL = '/models';
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]);
    console.log('✅ Modelos carregados!');
  };

  // 🚀 Efeito para iniciar modelos e ativar câmera quando o componente é montado
  useEffect(() => {
    const run = async () => {
      await loadModels();
      await startVideo();
    };
    run();

    // 🎯 Inicia detecção facial após o vídeo carregar
    videoRef.current?.addEventListener('play', () => {
      const canvas = canvasRef.current;
      const displaySize = {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      };
      faceapi.matchDimensions(canvas, displaySize);

      const interval = setInterval(async () => {
        if (!videoRef.current) return;

        const detection = await faceapi
          .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (detection) {
          const resized = faceapi.resizeResults(detection, displaySize);
          faceapi.draw.drawDetections(canvas, resized);
          faceapi.draw.drawFaceLandmarks(canvas, resized);

          console.log('🧬 Descritor facial:', detection.descriptor);
        }
      }, 100);

      return () => clearInterval(interval); // Limpa ao desmontar
    });
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center max-w-4xl p-6 mx-auto overflow-hidden bg-white shadow-2xl dark:bg-gray-800 rounded-xl">
      <h1 className="mb-4 text-2xl font-bold text-center text-blue-800 dark:text-yellow-400">
        🧠 Reconhecimento Facial com IA
      </h1>

      {/* Container do vídeo e canvas */}
      <div className="relative w-full max-w-[720px] aspect-video border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="object-cover w-full h-full rounded-lg"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
      </div>

      <p className="max-w-xl mt-6 text-center text-gray-600 dark:text-gray-200">
        👁️‍🗨️ Aponte seu rosto para a câmera. A IA irá detectar automaticamente suas feições
        e desenhar pontos estratégicos em tempo real. Experiência inclusiva e segura. 💜
      </p>
    </section>
  );
}
