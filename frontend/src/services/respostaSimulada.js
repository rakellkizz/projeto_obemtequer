// ========================================================================================
// 📄 respostaSimulada.js – Respostas empáticas (com variações) para fallback do Chatbot
// Projeto: O Bem Te Quer 💖
// Uso: import respostaSimulada from '../.../respostaSimulada'
//      const texto = respostaSimulada(mensagemDoUsuario)
// ========================================================================================

/** Escolhe um item aleatório de um array (com fallback seguro) */
function pick(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return "";
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Tenta pegar o nome do avatar ou um apelido simpático para personalizar a fala */
function saudacaoNome() {
  try {
    const mapa = {
      camila: 'Dra. Camila',
      luna: 'Dra. Luna',
      fernando: 'Dr. Fernando',
      mauricio: 'Dr. Mauricio',
      marcos: 'Dr. Marcos',
      victor: 'Dr. Victor',
    };
    const id = (localStorage.getItem('avatarSelecionado') || '').toLowerCase();
    return mapa[id] || null;
  } catch {
    return null;
  }
}

/** Frases por intenção – mantenha aqui o "tom" do seu produto */
const F = {
  saudacao: [
    "Oi! 😊 Que bom te ver por aqui. Vamos conversar?",
    "Olá! ✨ Estava aguardando você. Sobre o que quer falar?",
    "E aí! 🙌 Bora bater um papo gostoso?",
    "Oi, oi! 💜 Tô por aqui pra te ouvir.",
    "Olá! 🌸 Como posso te acolher hoje?"
  ],

  acolhimento: [
    "Obrigada por perguntar 💖 Estou aqui pra te ouvir, viu?",
    "Que cuidado lindo 🫶 Eu tô bem e pronta pra te ajudar.",
    "Valeu pela gentileza! 💫 Conta como você está.",
    "Tô contigo! 💜 Me diz como tem se sentido."
  ],

  assunto: [
    "Podemos falar do seu dia, sentimentos, dúvidas… ou até jogar xadrez 🎯 Você escolhe.",
    "Quer conversar sobre algo leve, desabafar um pouco, ou explorar ideias? Tô aqui 💬",
    "Topa falarmos de autocuidado, rotina, sonhos… ou brincar um pouco? ✨",
    "A pauta é sua: vida, estudos, trabalho, amor ou só risadas. Vamos? 🙂"
  ],

  desabafoLeve: [
    "Sinto que isso pesa em você 😔 Se quiser, me conta com calma. Eu tô aqui.",
    "Obrigada por confiar 💜 Fala comigo… o que tá doendo mais?",
    "Você não tá só, combinado? 🫂 Vamos por partes. O que aconteceu?",
    "Respira comigo 🌬️ Tô aqui pra te acolher. Quer me dizer um pouco mais?"
  ],

  desabafoForte: [
    "Sinto muito que esteja enfrentando isso 😞 Você não está sozinha(o). Quer me contar com detalhes?",
    "Obrigada por dividir algo tão difícil 💜 Fala comigo, sem pressa. Tô aqui.",
    "Eu tô aqui com você agora 🫂 Vamos passo a passo. O que aconteceu primeiro?",
    "Se quiser, a gente pode organizar os sentimentos em pequenos blocos. Topa tentar?"
  ],

  ausencia: [
    "Sim, tô aqui! 👋 Pode falar comigo quando quiser.",
    "Tô por aqui 💜 Conta comigo.",
    "Não sumi não! 🙂 O que você precisa agora?",
    "Oi! ✨ Tô aqui te ouvindo."
  ],

  despedida: [
    "Tudo bem 💖 Se cuida. Quando quiser conversar, eu tô aqui.",
    "Foi bom falar com você 🌟 Volta quando sentir vontade.",
    "Vai com carinho por você mesma(o) 💜 Até logo!",
    "Obrigada pela conversa 🙏 Estarei aqui quando precisar."
  ],

  gratidao: [
    "Você merece todo acolhimento 💖 Conte comigo sempre!",
    "Imagina! 🫶 Tô aqui pra isso.",
    "Que bom poder te ajudar ✨",
    "Eu que agradeço a confiança 💜"
  ],

  elogio: [
    "Ahh 💖 que carinho gostoso! Fico muito feliz em saber disso.",
    "Obrigada! 🌸 Você também é incrível.",
    "Seu carinho significa muito 💜",
    "Own! 🥰 Você é uma pessoa especial."
  ],

  entretenimento: [
    "Bora tirar um sorriso? Podemos conversar, ouvir ideias ou jogar xadrez 🎲",
    "Que tal uma rodada de xadrez ou um papo leve? ✨",
    "Topa um joguinho de xadrez ou preferir um papo descontraído? 😄",
    "Temos xadrez, bate-papo e afeto. O que anima mais agora? 💫"
  ],

  curiosidade: [
    "Sou sua companheira digital 💡 feita para ouvir, acolher e te apoiar.",
    "Eu sou uma IA amiga 💜 aqui pra estar com você e somar no que precisar.",
    "Pensa em mim como uma presença acolhedora do seu lado, tá? 🤗",
    "Minha função é te ouvir e caminhar junto — no seu ritmo. ✨"
  ],

  projeto: [
    "O projeto O Bem Te Quer 💖 nasceu pra você nunca se sentir só.",
    "O Bem Te Quer é um espaço de acolhimento e cuidado — sempre perto de você 💜",
    "Criamos o O Bem Te Quer para apoiar, ouvir e incentivar o seu bem-estar 🌱"
  ],

  xadrez: [
    "Claro! ♟️ Quer que eu abra o tabuleiro agora?",
    "Adoro! 😄 Posso iniciar uma partida de xadrez aqui mesmo.",
    "Bora pro tabuleiro? É só falar que eu abro ♟️",
    "Topa uma partida leve pra aliviar a mente? Eu preparo tudo!"
  ],

  neutro: [
    "Tô aqui por você 💬 O que você sente que precisa agora?",
    "Pode contar comigo. Sobre o que você gostaria de falar?",
    "Vamos com calma e carinho 💜 Me diz por onde começamos.",
    "Se quiser, a gente pode organizar seus pensamentos juntinhos ✨"
  ]
};
/** Regras (regex → intenção) em ordem de checagem */
const REGRAS = [
  { key: 'saudacao',      re: /(oi|olá|ola|opa|bom dia|boa tarde|boa noite|e aí|eai|salve)\b/i },
  { key: 'acolhimento',   re: /(tudo bem|como vc está|como você está|e você|como vai|como se sente)/i },
  { key: 'assunto',       re: /(sobre o que|conversar o que|tema|assunto)/i },
  { key: 'desabafoForte', re: /(depressiv[ao]|crise|pânico|panico|chorei muito|sofrendo demais|não aguento|nao aguento|desespero)/i },
  { key: 'desabafoLeve',  re: /(estou triste|ansios[ao]|angustiad[ao]|mal|pra baixo|sofrendo|chorando|cansad[ao]|desanimad[ao]|sofrimento)/i },
  { key: 'ausencia',      re: /(está aí|esta ai|sumiu|cadê você|cade você|me responde|alô|alo|ei|tá por aí|ta por ai)/i },
  { key: 'despedida',     re: /(tchau|até logo|ate logo|adeus|vou sair|falou|até mais|ate mais|tenho que ir)/i },
  { key: 'gratidao',      re: /(obrigad[oa]|valeu|gratid[aã]o|te agradeço|obg)/i },
  { key: 'elogio',        re: /(gosto de você|vc é legal|você é legal|você é incrível|adoro você|vc é demais|gosto de conversar|adoro vc|vc é gentil|ótima companhia|vc é especial|você é fofa|você é top|vc é linda)/i },
  { key: 'entretenimento',re: /(estou entediad[oa]|me distrai|me anima|fazer o que|quero me divertir|o que fazer)/i },
  { key: 'curiosidade',   re: /(quem é você|quem é vc|o que você faz|seu nome|o que é você|é uma ia|voce é humana|voce é humana|o que tu é|tu é o que)/i },
  { key: 'projeto',       re: /(bem te quer|o bem te quer|projeto)/i },
  { key: 'xadrez',        re: /(xadrez|jogar|partida|tabuleiro|rei|rainha|torre|pe[ãa]o|xadrez comigo)/i },
];

/** Opcional: incrementa levemente as falas com o nome do avatar (se houver) */
function comAssinaturaAvatar(fala) {
  const nome = saudacaoNome();
  if (!nome) return fala;
  // Ex.: “Olá! ✨ Estava aguardando você.” → “Olá! ✨ Estava aguardando você. – {Dra. Camila}”
  return `${fala} – ${nome}`;
}

/** API principal */
export default function respostaSimulada(mensagem = "") {
  const texto = String(mensagem || "").trim();

  // 1) se vier vazio, devolve uma acolhida rápida
  if (!texto) return pick(F.neutro);

  // 2) roteamento por intenção
  for (const regra of REGRAS) {
    if (regra.re.test(texto)) {
      const pool = F[regra.key] || F.neutro;
      const resposta = pick(pool);
      // Personaliza saudações e despedidas com assinatura suave do avatar
      if (regra.key === 'saudacao' || regra.key === 'despedida') {
        return comAssinaturaAvatar(resposta);
      }
      return resposta;
    }
  }

  // 3) fallback neutro
  return pick(F.neutro);
}

// ========================================================================================
// 📝 FIM – respostaSimulada.js (com variações profissionais e tom acolhedor)
// ========================================================================================
