// =======================================================================================
// 📁 ARQUIVO: src/utils/reconhecimento.js
// DESCRIÇÃO: Utilitário centralizado para reconhecimento de voz via Web Speech API
// =======================================================================================

/**
 * 🔊 Inicia o reconhecimento de voz e dispara callback quando um comando for detectado.
 *
 * @param {function} comandosReconhecidos - Função de callback que receberá o texto falado.
 *
 * ✅ Exemplo de uso:
 * iniciarReconhecimentoVoz((comando) => {
 *   if (comando === 'iniciar') navigate('/menu');
 * });
 */
export const iniciarReconhecimentoVoz = (comandosReconhecidos) => {
  // 🎤 Compatibilidade com diferentes navegadores
  const reconhecimento =
    new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  if (!reconhecimento) {
    console.warn('🚫 Reconhecimento de voz não suportado neste navegador.');
    return;
  }

  // 🌍 Define idioma e comportamento
  reconhecimento.lang = 'pt-BR';            // Idioma: Português do Brasil
  reconhecimento.continuous = false;        // Escuta 1 comando por vez
  reconhecimento.interimResults = false;    // Ignora resultados parciais

  // ✅ Quando uma voz é reconhecida com sucesso
  reconhecimento.onresult = (event) => {
    const texto = event.results[0][0].transcript.toLowerCase().trim(); // Normaliza o texto
    console.log('🎤 Comando reconhecido:', texto);

    // Chama a função enviada pelo componente que chamou este utilitário
    comandosReconhecidos(texto);
  };

  // ⚠️ Trata erros comuns como falta de permissão do microfone
  reconhecimento.onerror = (event) => {
    console.error('❌ Erro no reconhecimento de voz:', event.error);
  };

  // ▶️ Inicia o reconhecimento
  reconhecimento.start();
};
