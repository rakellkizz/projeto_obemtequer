// src/utils/reconhecimento.js
// Utilitário para reconhecimento de voz (comandos falados pelos usuários)

export const iniciarReconhecimentoVoz = (comandosReconhecidos) => {
  const reconhecimento = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  reconhecimento.lang = 'pt-BR';
  reconhecimento.continuous = false; // parar após um comando
  reconhecimento.interimResults = false;

  reconhecimento.onresult = (event) => {
    const texto = event.results[0][0].transcript.toLowerCase().trim();
    console.log('🎤 Comando reconhecido:', texto);
    comandosReconhecidos(texto);
  };

  reconhecimento.onerror = (event) => {
    console.error('❌ Erro no reconhecimento de voz:', event.error);
  };

  reconhecimento.start();
};
