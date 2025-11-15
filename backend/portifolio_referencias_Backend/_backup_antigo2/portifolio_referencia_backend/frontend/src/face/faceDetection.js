// ------------------------------
// src/face/faceDetection.js
// ------------------------------
// Lógica de webcam + detecção de rosto

import * as faceapi from 'face-api.js';

export async function carregarModelos() {
  await faceapi.nets.tinyFaceDetector.load('/models/');
  console.log('✅ Modelos carregados');
}

export async function iniciarDeteccao(videoElement) {
  await carregarModelos();

  const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
  videoElement.srcObject = stream;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
    detectarRosto(videoElement);
  };
}

async function detectarRosto(video) {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.appendChild(canvas);

  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(
      video,
      new faceapi.TinyFaceDetectorOptions()
    );
    const resized = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resized);
  }, 100);
}
