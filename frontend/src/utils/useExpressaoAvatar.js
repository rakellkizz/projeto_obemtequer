// ======================================================================================
// 📁 useExpressaoAvatar.js – Hook que analisa a resposta do bot e define a expressão
// Projeto: O Bem Te Quer 💜 – Avatar empático que reage às emoções do texto
// ======================================================================================

/**
 * 🧠 Função que define a expressão do avatar com base na resposta do bot
 * - Usa palavras-chave para determinar o tipo de emoção
 */
function analisarExpressao(texto) {
  const msg = texto.toLowerCase();

  // 😊 Palavras positivas
  const positivas = ['feliz', 'ótimo', 'bom', 'legal', 'parabéns', 'conseguiu'];
  if (positivas.some(palavra => msg.includes(palavra))) return 'alegre';

  // 😢 Palavras negativas
  const negativas = ['triste', 'ruim', 'sofrer', 'chorar', 'depressivo', 'angustiado'];
  if (negativas.some(palavra => msg.includes(palavra))) return 'triste';

  // 🤔 Reflexão ou dúvida
  const pensativas = ['pensar', 'duvidar', 'refletir', 'talvez', 'difícil'];
  if (pensativas.some(palavra => msg.includes(palavra))) return 'pensativa';

  return 'normal'; // 😐 Expressão padrão
}

/**
 * 🔄 Hook exportado para uso nos componentes
 */
export default function useExpressaoAvatar() {
  return {
    atualizarExpressao: analisarExpressao,
  };
}
