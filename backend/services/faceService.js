// faceService.js

// Importação dos módulos necessários
const faceapi = require('face-api.js');
const canvas = require('canvas');
const path = require('path');
const fs = require('fs');

// Monkey patch necessário para rodar o face-api.js no Node.js
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// Caminho onde estão os modelos treinados do face-api.js
const MODEL_PATH = path.join(__dirname, '../models'); // Corrigido para buscar fora da pasta atual

// 🧠 Carrega os modelos uma única vez na memória
async function loadModels() {
  try {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_PATH);
    console.log("✅ Modelos carregados com sucesso.");
  } catch (error) {
    console.error("❌ Erro ao carregar modelos:", error);
  }
}

// 🧬 Recebe uma imagem (em buffer) e retorna seu descritor facial (128 floats)
async function getFaceDescriptor(imageBuffer) {
  try {
    const img = await canvas.loadImage(imageBuffer);
    const detection = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      throw new Error("Nenhum rosto detectado na imagem.");
    }

    return detection.descriptor; // Float32Array com 128 posições
  } catch (error) {
    console.error("❌ Erro ao processar a imagem:", error);
    throw error;
  }
}

// 💾 Salva o descritor facial como JSON, útil para testes ou persistência simples
function saveDescriptor(label, descriptor) {
  try {
    if (!fs.existsSync('./descriptors')) {
      fs.mkdirSync('./descriptors');
    }

    const data = {
      label,
      descriptor: Array.from(descriptor) // Converte Float32Array para array comum
    };

    const filePath = `./descriptors/${label}.json`;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`📁 Descritor salvo com sucesso: ${filePath}`);
  } catch (error) {
    console.error("❌ Erro ao salvar descritor:", error);
  }
}

// 🧮 Calcula a distância Euclidiana entre dois descritores (quanto menor, mais parecido)
function euclideanDistance(d1, d2) {
  if (d1.length !== d2.length) {
    throw new Error("Descritores com tamanhos diferentes.");
  }

  const sum = d1.reduce((acc, val, i) => acc + Math.pow(val - d2[i], 2), 0);
  return Math.sqrt(sum);
}

// Exporta as funções para uso externo
module.exports = {
  loadModels,
  getFaceDescriptor,
  saveDescriptor,
  euclideanDistance
};
