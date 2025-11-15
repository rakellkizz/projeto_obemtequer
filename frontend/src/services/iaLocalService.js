// ============================================================================================
// 📁 ARQUIVO: services/iaLocalService.js
// DESCRIÇÃO: IA Local personalizada que responde com empatia e carinho sem custo 💜
// - Responde frases comuns com base em expressões regulares
// - Garante acolhimento emocional e leveza na conversa
// - Pode ser expandida com lógica de sentimentos ou fluxos de ajuda
// ============================================================================================

/**
 * 🧠 Função principal da IA local
 * Analisa a entrada do usuário e retorna uma resposta acolhedora
 *
 * @param {string} mensagem - Texto enviado pelo usuário
 * @returns {string} - Resposta emocional gerada localmente
 */
export function responderIA_local(mensagem) {
  const p = mensagem.toLowerCase();

  // 👋 Cumprimentos
  if (/(oi|olá|opa|bom dia|boa tarde|boa noite|e aí|salve)/i.test(p)) {
    return 'Oi! 😊 Que bom te ver por aqui. Vamos conversar?';
  }

  // 🤝 Perguntas de bem-estar
  if (/(tudo bem|como vc está|como você está|e você|como vai|como se sente)/i.test(p)) {
    return 'Ah, obrigada por perguntar 💖 Estou aqui para te ouvir, viu?';
  }

  // ❓ Quem é você?
  if (/(quem é você|o que você faz|seu nome|o que é você|é uma ia|você é humana|o que tu é|tu é o que)/i.test(p)) {
    return 'Sou sua companheira digital 💡 feita para ouvir, acolher e te ajudar quando precisar.';
  }

  // 📌 Projeto
  if (/(bem te quer|projeto)/i.test(p)) {
    return 'O Bem Te Quer 💖 é um projeto lindo de escuta ativa e acolhimento emocional. Fico feliz que tenha vindo conhecer!';
  }

  // 💬 Temas possíveis
  if (p.includes('sobre o que a gente pode conversar') || p.includes('sobre o que podemos conversar') || p.includes('sobre o que falar')) {
    return 'A gente pode falar sobre o que você quiser: seu dia, sentimentos, dúvidas ou até jogar xadrez 🎯';
  }

  // 🤖 Capacidades
  if (p.includes('o que você sabe fazer') || p.includes('o que você pode fazer')) {
    return 'Posso te ouvir, conversar sobre seus sentimentos, contar piadas, jogar xadrez e muito mais! O que você gostaria de fazer?';
  }

  if (p.includes('você pode me ajudar com algo')) {
    return 'Claro! Estou aqui para te ouvir e apoiar no que precisar. Me conta como posso ajudar? 🫂';
  }

  // 🎲 Diversão
  if (p.includes('estou entediado') || p.includes('me distrai') || p.includes('me anima') || p.includes('fazer o que') || p.includes('quero me divertir') || p.includes('o que fazer')) {
    return 'Que tal a gente conversar sobre algo divertido, ouvir música ou jogar xadrez? Estou contigo 💫';
  }

  if (p.includes('conte uma piada') || p.includes('me faça rir') || p.includes('me conte uma piada')) {
    return 'Claro! Que tal essa: Por que o livro de matemática se suicidou? Porque tinha muitos problemas. 😄';
  }

  if (p.includes('jogar xadrez') || p.includes('vamos jogar xadrez') || p.includes('quero jogar xadrez')) {
    return 'Adoro xadrez! ♟️ Você quer começar jogando com as peças brancas ou pretas?';
  }

  // 🌧️ Sentimentos negativos ou palavras de tristeza
  if (/(triste|tristeza|chateada|chateado|depressão|depressivo|sozinha|sozinho|ninguém me entende|ansiosa|ansioso|nervosa|nervoso|vontade de sumir|mal|pra baixo|sofrendo|chorando|cansado|desanimado)/i.test(p)) {
    return 'Sinto muito por você estar se sentindo assim 😔 Estou aqui com você, me conta mais...';
  }

  // 👋 Despedidas
  if (/(tchau|até logo|adeus|vou sair|falou|até mais|tenho que ir)/i.test(p)) {
    return 'Tudo bem 💖 Se cuida, viu? Quando quiser conversar, estarei aqui!';
  }

  // 🙏 Agradecimentos e elogios
  if (/(obrigado|valeu|gratidão|muito obrigado|te agradeço|obg)/i.test(p)) {
    return 'Você merece todo acolhimento 💖 Conte comigo sempre!';
  }

  if (/(gosto de você|vc é legal|você é legal|você é incrível|adoro você|vc é demais|gosto de conversar|adoro vc|adoro c|vc é gentil|você é uma ótima companhia|vc é especial|você é fofa|você é top|vc é linda)/i.test(p)) {
    return 'Ahh 💖 que carinho gostoso! Eu fico muito feliz em saber disso! Você também é incrível!';
  }

  // 📝 Resposta padrão
  return 'Estou aqui por você. Me conta, o que está passando na sua cabeça? 💬';
}
// ============================================================================================
// Fim do arquivo: services/iaLocalService.js
// ============================================================================================
// ============================================================================================