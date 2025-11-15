// ========================================================================================
// 📄 falasXadrez.js – Falas narradas do jogo de Xadrez com voz feminina/masculina automática
// Projeto: O Bem Te Quer 💜 – Narração com empatia e escolha de voz baseada no avatar
// ========================================================================================

/**
 * 🎤 Fala com voz automática (feminina para Dra. Camila e Dra. Luna, masculina para os demais)
 * @param {string} texto - Texto a ser narrado
 * @param {boolean} usarVoz - Define se a fala deve ocorrer (permite desligar voz)
 */
export async function falar(texto, usarVoz = true) {
  if (!usarVoz || !window.speechSynthesis || !texto) return;
  if (localStorage.getItem('xadrez_fimDeJogo') === 'sim') return;

  // 🔇 Interrompe qualquer fala anterior
  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(texto);
  utter.lang = 'pt-BR';
  utter.rate = 0.95;
  utter.pitch = 1;

  // 👤 Obtém o avatar atual salvo
  const avatar = (localStorage.getItem('avatarSelecionado') || 'victor').toLowerCase();
  const usarVozFeminina = avatar.includes('camila') || avatar.includes('luna');

  // 🎙️ Espera as vozes carregarem
  const esperarVozes = new Promise(resolve => {
    let vozes = speechSynthesis.getVoices();
    if (vozes.length) return resolve();
    speechSynthesis.onvoiceschanged = resolve;
  });
  await esperarVozes;

  const todasVozes = speechSynthesis.getVoices();

  // 🔎 Seleciona uma voz apropriada (feminina ou masculina)
  const vozEscolhida = todasVozes.find(v =>
    usarVozFeminina
      ? v.name.toLowerCase().includes('feminina') || v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('br')
      : v.name.toLowerCase().includes('masculina') || v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('br')
  );

  if (vozEscolhida) utter.voice = vozEscolhida;

  // 🗣️ Fala o texto com a voz escolhida
  speechSynthesis.speak(utter);

  // ⏳ Aguarda a fala finalizar antes de liberar a próxima
  await new Promise(resolve => {
    utter.onend = resolve;
  });
}

// ========================================================================================
// 🧑‍💼 Narração da jogada do usuário com elogios e variações
// ========================================================================================
export async function gerarFalaJogadaUsuario(movimento, nomeUsuario = 'Você', usarVoz = true) {
  if (!movimento || !movimento.to || !movimento.from || localStorage.getItem('xadrez_fimDeJogo') === 'sim') return;

  const elogios = [
    'Excelente jogada!',
    'Boa leitura de tabuleiro!',
    'Você está jogando muito bem!',
    'Continue assim, você está dominando!',
    'Sua estratégia está funcionando!'
  ];

  const frasesMovimento = [
    `${nomeUsuario} moveu uma peça de ${movimento.from} para ${movimento.to}.`,
    `Movimento elegante! ${nomeUsuario} posicionou em ${movimento.to}.`,
    `${nomeUsuario} pensa rápido e avança para ${movimento.to}.`
  ];

  const frasesCaptura = [
    `Parabéns! ${nomeUsuario} capturou uma peça em ${movimento.to}.`,
    `Jogada forte! ${nomeUsuario} elimina uma ameaça em ${movimento.to}.`,
    `Boa estratégia! ${nomeUsuario} conquista ${movimento.to}.`
  ];

  const fraseMovimento = movimento.captured
    ? frasesCaptura[Math.floor(Math.random() * frasesCaptura.length)]
    : frasesMovimento[Math.floor(Math.random() * frasesMovimento.length)];

  const elogio = elogios[Math.floor(Math.random() * elogios.length)];

  await new Promise(resolve => setTimeout(resolve, 200));
  await falar(`${fraseMovimento} ${elogio}`, usarVoz);
}

// ========================================================================================
// 🤖 Narração da jogada da IA com tom profissional e estratégico
// ========================================================================================
export async function gerarFalaJogadaIA(movimentoIA, nomeIA = 'Doutor Victor', usarVoz = true) {
  if (!movimentoIA || !movimentoIA.to || !movimentoIA.from || localStorage.getItem('xadrez_fimDeJogo') === 'sim') return;

  const frasesMoveIA = [
    `${nomeIA} posiciona sua peça em ${movimentoIA.to}.`,
    `${nomeIA} reage com calma e ocupa ${movimentoIA.to}.`,
    `${nomeIA} prepara uma resposta tática para ${movimentoIA.to}.`
  ];

  const frasesCapturaIA = [
    `${nomeIA} captura com precisão em ${movimentoIA.to}.`,
    `Cuidado! ${nomeIA} elimina sua peça em ${movimentoIA.to}.`,
    `${nomeIA} avança com confiança e captura em ${movimentoIA.to}.`
  ];

  const frase = movimentoIA.captured
    ? frasesCapturaIA[Math.floor(Math.random() * frasesCapturaIA.length)]
    : frasesMoveIA[Math.floor(Math.random() * frasesMoveIA.length)];

  await new Promise(resolve => setTimeout(resolve, 700));
  await falar(frase, usarVoz);
}

// ========================================================================================
// 🏁 Narração final do jogo com reforço emocional adaptativo
// ========================================================================================
export async function gerarFalaFinal(mensagemFinal, usarVoz = true) {
  if (!mensagemFinal || localStorage.getItem('xadrez_fimDeJogo') === 'sim') return;
  localStorage.setItem('xadrez_fimDeJogo', 'sim');

  let reforco = '';
  if (mensagemFinal.includes('venceu')) {
    reforco = 'Parabéns pela vitória! Você jogou com sabedoria.';
  } else if (mensagemFinal.includes('perdeu')) {
    reforco = 'Não desanime. Cada derrota é uma lição. Tente novamente!';
  } else {
    reforco = 'Empates também mostram equilíbrio. Muito bem!';
  }

  await falar(`Fim de jogo. ${mensagemFinal} ${reforco}`, usarVoz);
}

// ========================================================================================
// ⚠️ Alerta de xeque ao jogador
// ========================================================================================
export function falarXeque(emXeque, nomeUsuario = 'Você', usarVoz = true) {
  if (emXeque && localStorage.getItem('xadrez_fimDeJogo') !== 'sim') {
    falar(`${nomeUsuario}, seu rei está em perigo! Proteja-se agora.`, usarVoz);
  }
}

// ========================================================================================
// 💡 Dica empática quando o jogador está perto de levar xeque-mate
// ========================================================================================
export function falarInstrucaoMate(emAmeacaMate = false, usarVoz = true) {
  if (!emAmeacaMate || localStorage.getItem('xadrez_fimDeJogo') === 'sim') return;

  const dicas = [
    'Tente proteger o rei com outra peça ou movê-lo para uma casa segura.',
    'Você pode bloquear o ataque ou capturar a peça agressora.',
    'Evite pressa. Foque em manter seu rei protegido.',
    'Concentre-se na defesa. Ainda dá tempo de reverter o jogo!'
  ];

  const frase = dicas[Math.floor(Math.random() * dicas.length)];
  falar(frase, usarVoz);
}

// ========================================================================================
// 🎓 Tutorial narrado opcional (chamado manualmente se desejar)
// ========================================================================================
export async function falarTutorial(usarVoz = true) {
  if (localStorage.getItem('xadrez_fimDeJogo') === 'sim') return;

  const tutorial = [
    'Olá! Bem-vindo ao jogo de xadrez do projeto O Bem Te Quer.',
    'Você joga com as peças brancas, do lado inferior do tabuleiro.',
    'Para mover uma peça, clique e arraste até a posição desejada.',
    'Seu objetivo é proteger seu rei e tentar dar xeque-mate no adversário.',
    'Boa sorte e divirta-se com seu assistente empático!'
  ];

  for (const frase of tutorial) {
    if (!usarVoz) break;
    await falar(frase, true);
    await new Promise(resolve => setTimeout(resolve, 2500));
  }
}

// ========================================================================================
// ✅ FIM DO ARQUIVO falasXadrez.js – Narração com voz automática inteligente
// ========================================================================================
