// ========================================================================================
// 📄 ComponenteXadrez.jsx — Narração sem cortes + IA no ritmo certo + som de peça
// - Visual/temas/botões: INTACTOS
// - Voz fem/masc correta SEMPRE (lê avatar a cada fala)
// - Fila TTS: cancela sobra; espera silêncio ANTES e DEPOIS
// - Normalização SAN → pt-BR (d4→“dê quatro”, O-O→“roque pequeno”, etc.)
// - IA com timer único; fala só depois do lance aparecer no tabuleiro
// - ✅ Anti-fuga: neutraliza transform de ancestrais no drag + remove clones “órfãos”
// - ✅ Som de movimento: pré-carrega, desbloqueia no início e toca em todo lance
// - ✅ Dificuldades reais: Médio (1 lance à frente) | Difícil (minimax p2)
// ========================================================================================

import React, { useEffect, useState, useRef } from 'react';       // React
import { Chess } from 'chess.js';                                 // lógica do jogo
import { Chessboard } from 'react-chessboard';                    // tabuleiro
import movePieceSfx from '../../assets/sounds/move-piece.mp3';   // 🔊 efeito sonoro

import {
  gerarFalaJogadaIA,
  gerarFalaJogadaUsuario,
  gerarFalaFinal,
  falarXeque,
  falarInstrucaoMate
} from '../jogos/falasXadrez';
import '../../global.css';

/* ========================================================================================
   🔧 Anti-fuga (core)
   - Alguns wrappers (ex.: Framer Motion) aplicam CSS transform. Isso quebra o cálculo
     de posição do drag do react-chessboard, fazendo a peça "sair" do tabuleiro.
   - Solução: no início do drag, zera transform nos ancestrais do board; no fim, restaura.
   ======================================================================================= */
function neutralizeAncestorTransforms(el) {
  const changed = [];
  let node = el?.parentElement || null;
  while (node && node !== document.body) {
    try {
      const st = window.getComputedStyle(node);
      if (st && st.transform && st.transform !== 'none') {
        const prev = node.style.transform;
        node.__prevTransform = prev;
        node.style.transform = 'none';
        changed.push(node);
      }
    } catch {}
    node = node.parentElement;
  }
  // devolve função que restaura todos os transforms alterados
  return () => {
    for (const n of changed) {
      try {
        n.style.transform = n.__prevTransform || '';
        delete n.__prevTransform;
      } catch {}
    }
  };
}

/* ===== Ritmo ===== */
const AI_DELAY_MS   = 3200;
const OPENING_DELAY = 1500;

/* ===== Frases de abertura ===== */
const OPENING_LINES = {
  userWhite: 'Você joga de brancas. Faça o primeiro lance.',
  userBlack: 'As brancas começam. Aguarde a jogada.',
};

/* ===== Helpers de armazenamento/local ===== */
const ls = (k, d='') => { try { return localStorage.getItem(k) ?? d; } catch { return d; } };
const currentAvatarId = () => (ls('avatarSelecionado','victor')||'victor').toLowerCase();
const isFemaleAvatar  = () => /camila|luna/.test(currentAvatarId());
const getAvatarIdSan  = () => currentAvatarId().replace('dra. ','').replace('dr. ','').trim();
const getNomeIA = () => ({
  camila: 'Dra. Camila', luna: 'Dra. Luna', fernando: 'Dr. Fernando',
  mauricio: 'Dr. Mauricio', marcos: 'Dr. Marcos', victor: 'Dr. Victor'
}[getAvatarIdSan()] || 'Dr. Victor');

/* ========================================================================================
   🔊 Utils de TTS — preparação mínima e seleção de voz p/ Windows 10 + Chrome
   ======================================================================================= */
async function waitVoices(timeout=3500) {
  const synth = window.speechSynthesis; if (!synth) return;
  if (synth.getVoices?.().length) return;
  await new Promise(res => {
    let done=false; const finish=()=>{ if(!done){done=true;res();} };
    const t=setTimeout(finish, timeout);
    synth.onvoiceschanged = () => { clearTimeout(t); synth.onvoiceschanged=null; finish(); };
    try { synth.getVoices?.(); } catch {}
  });
}
async function warmupTTS() {
  try {
    const synth = window.speechSynthesis; if (!synth) return;
    const ut = new SpeechSynthesisUtterance(' ');
    ut.volume=0; ut.rate=1; ut.pitch=1; ut.lang='pt-BR';
    await new Promise(r => { ut.onend=r; ut.onerror=r; synth.speak(ut); });
  } catch {}
}
function pickVoiceWindowsChrome({ feminine }) {
  const synth = window.speechSynthesis; if (!synth) return null;
  const voices = synth.getVoices?.() || [];
  const hasLang = (v, code) => (v.lang || '').toLowerCase().startsWith(code);
  const byRe = (re) => voices.find(v => re.test(v.name || '') || re.test(v.lang || ''));

  const MS_MARIA  = byRe(/microsoft.*maria.*portugu[eê]s.*(brazil|brasil)/i);
  const MS_FRAN   = byRe(/microsoft.*francisca.*portugu[eê]s.*(brazil|brasil)/i);
  const MS_DANIEL = byRe(/microsoft.*daniel.*portugu[eê]s.*(brazil|brasil)/i);
  const G_PTBR    = byRe(/google.*portugu[eê]s.*(brazil|brasil)/i);
  const PTBR_ANY  = voices.find(v => hasLang(v,'pt-br'));
  const PT_ANY    = voices.find(v => hasLang(v,'pt'));

  return feminine
    ? (MS_MARIA || MS_FRAN || G_PTBR || PTBR_ANY || PT_ANY || voices[0] || null)
    : (MS_DANIEL || G_PTBR || PTBR_ANY || PT_ANY || voices[0] || null);
}

/* ========================================================================================
   🔤 Normalização de SAN → fala natural pt-BR
   ======================================================================================= */
const mapFile = { a:'á', b:'bê', c:'cê', d:'dê', e:'ê', f:'éfe', g:'gê', h:'agá' };
const mapNum  = { '1':'um', '2':'dois', '3':'três', '4':'quatro', '5':'cinco', '6':'seis', '7':'sete', '8':'oito' };
const mapPeca = { K:'rei', Q:'dama', R:'torre', B:'bispo', N:'cavalo' };

function normalizeSANptBR(text) {
  if (!text) return text;
  let s = String(text);

  s = s.replace(/\b(?:O|0)-(?:O|0)-(?:O|0)\b/g, 'roque grande');
  s = s.replace(/\b(?:O|0)-(?:O|0)\b/g, 'roque pequeno');
  s = s.replace(/\be\.p\.\b/gi, 'em passant');

  s = s.replace(/\b([KQRBN])?([a-h])?x?([a-h])([1-8])(=([QRBN]))?([+#])?\b/gi, (_, peca, fromFile, file, rank, _promoAll, promo, check) => {
    const partePeca = peca ? (mapPeca[peca.toUpperCase()] || '') : '';
    const destino   = `${mapFile[file.toLowerCase()]} ${mapNum[rank]}`;
    const captura   = /x/i.test(_) ? ' captura ' : (peca || fromFile ? ' em ' : ' ');
    const promocao  = promo ? ` com promoção para ${mapPeca[promo.toUpperCase()] || promo}` : '';
    const sufixo    = check === '+' ? ', xeque' : (check === '#' ? ', xeque-mate' : '');

    if (peca) return `${partePeca}${captura}${destino}${promocao}${sufixo}`.trim();
    if (fromFile && /x/i.test(_)) return `${mapFile[fromFile.toLowerCase()]} captura ${destino}${sufixo}`.trim();
    return `${destino}${sufixo}`;
  });

  s = s.replace(/\b([a-h])([1-8])\b/g, (_, f, r) => `${mapFile[f.toLowerCase()]} ${mapNum[r]}`);
  return s;
}

/* ========================================================================================
   ✂️ Chunking por pontuação para reduzir cortes no final de frases (Chrome)
   ======================================================================================= */
function splitByPunctuation(text, maxLen=110) {
  const raw = String(text||'').trim();
  if (!raw) return [];
  const parts = raw.split(/(?<=[\.\!\?\:;…])\s+/);
  const out = [];
  for (let p of parts) {
    if (p.length <= maxLen) { out.push(p); continue; }
    let acc = '';
    for (const token of p.split(/(\s+)/)) {
      if (acc.length + token.length > maxLen && acc) {
        out.push(acc.trim()); acc = token.trim();
      } else acc += token;
    }
    if (acc.trim()) out.push(acc.trim());
  }
  return out;
}

/* ========================================================================================
   🔊 Perfis de TTS por dificuldade (rate/pitch + microvariação)
   ======================================================================================= */
const TTSProfile = {
  rateBaseFem: 1.08,   // base feminina
  rateBaseMasc: 1.02,  // base masculina
  rateJitter: 0.03,    // leve variação aleatória
  pitchFem: 1.06,
  pitchMasc: 1.00,
};
function setTTSProfileFromDifficulty(level) {
  // pequenos ajustes no "ânimo" conforme o nível
  if (level === 'facil') {
    TTSProfile.rateBaseFem = 1.06;
    TTSProfile.rateBaseMasc = 1.00;
    TTSProfile.pitchFem = 1.05;
    TTSProfile.pitchMasc = 1.00;
  } else if (level === 'medio') {
    TTSProfile.rateBaseFem = 1.10;
    TTSProfile.rateBaseMasc = 1.04;
    TTSProfile.pitchFem = 1.07;
    TTSProfile.pitchMasc = 1.01;
  } else { // dificil
    TTSProfile.rateBaseFem = 1.12;
    TTSProfile.rateBaseMasc = 1.06;
    TTSProfile.pitchFem = 1.08;
    TTSProfile.pitchMasc = 1.02;
  }
  // jitter constante e suave
  TTSProfile.rateJitter = 0.03;
}

/* ========================================================================================
   🔊 TTSPipeline — intercepta speak, normaliza texto e controla silêncio
   - 🔘 Kill-switch global "enabled": respeita o botão Voz On/Off
   - ✅ Corrige os erros anteriores de sintaxe dentro do JSX
   ======================================================================================= */
const TTSPipeline = (() => {
  let installed=false, nativeSpeak=null;
  let voicesReady=false, waiting=false;
  let speaking=false;
  let femPref=true;

  // 🔘 Kill-switch global: quando false, nada fala. Quando desliga, cancela fila.
  let enabled = true;
  function setEnabled(v) {
    enabled = !!v;
    if (!enabled) cancelAll();
  }

  let preQueue=[]; // utterances que chegam antes das vozes estarem prontas
  let queue=[];    // fila principal (utterances prontas p/ falar)
  const waiters=[];

  const GAP_MS=260;
  const QUIET_STREAK_MS=550;

  const setPreference = (isFem)=>{ femPref=!!isFem; };
  const resolveWaitersIfIdle = () => {
    try {
      const synth = window.speechSynthesis;
      if (!speaking && queue.length===0 && preQueue.length===0 && !synth?.speaking) {
        while (waiters.length) { try { waiters.shift()(); } catch {} }
      }
    } catch {}
  };
  const waitUntilIdle = () => new Promise(res=>{
    const synth = window.speechSynthesis;
    if (!speaking && queue.length===0 && preQueue.length===0 && !synth?.speaking) return res();
    waiters.push(res);
  });

  function applyVoice(ut){
    try {
      const v = pickVoiceWindowsChrome({ feminine: femPref });
      if (v) {
        ut.voice = v;
        ut.lang  = ut.lang || v.lang || 'pt-BR';

        // base por dificuldade + microvariação (±jitter)
        const base   = femPref ? TTSProfile.rateBaseFem : TTSProfile.rateBaseMasc;
        const jitter = (Math.random() * 2 - 1) * TTSProfile.rateJitter; // [-jitter, +jitter]
        const rate   = Math.max(0.85, Math.min(1.30, base + jitter));   // guarda-chuva seguro

        ut.rate  = rate;
        ut.pitch = femPref ? TTSProfile.pitchFem : TTSProfile.pitchMasc;
      }
    } catch {}
  }

  function enqueueFromUtter(ut){
    const texto = normalizeSANptBR(ut.text || '');
    const slices = splitByPunctuation(texto);
    if (!slices.length) { queue.push(ut); return; }
    for (const slice of slices) {
      const p = new SpeechSynthesisUtterance(slice);
      p.lang   = ut.lang || 'pt-BR';
      p.rate   = ut.rate;
      p.pitch  = ut.pitch;
      p.volume = ut.volume;
      queue.push(p);
    }
  }

  function speakNow(ut){
    applyVoice(ut);
    const synth = window.speechSynthesis;
    const origEnd = ut.onend, origErr = ut.onerror;
    let finished=false;

    const safetyMs = Math.min(30000, Math.max(6000, (ut.text||'').length * 85));
    const safety = setTimeout(()=>finish('timeout'), safetyMs);

    function finish(_why, evt){
      if (finished) return;
      finished=true; clearTimeout(safety);
      try { origEnd && origEnd(evt); } catch {}
      speaking=false;
      waitForSilenceThenNext();
    }
    function fail(evt){
      if (finished) return;
      finished=true; clearTimeout(safety);
      try { origErr && origErr(evt); } catch {}
      speaking=false;
      waitForSilenceThenNext();
    }
    ut.onend = finish;
    ut.onerror = fail;
    nativeSpeak(ut);
  }

  function waitForSilenceThenNext(){
    const synth = window.speechSynthesis;
    let quiet=0;
    const tick = () => {
      try {
        if (!synth?.speaking) {
          quiet += 50;
          if (quiet >= QUIET_STREAK_MS) {
            setTimeout(next, GAP_MS);
            return resolveWaitersIfIdle();
          }
        } else quiet=0;
      } catch {}
      setTimeout(tick, 50);
    };
    tick();
  }

  function next(){
    if (speaking) return;
    const u = queue.shift();
    if (!u){ resolveWaitersIfIdle(); return; }
    speaking=true;
    speakNow(u);
  }

  function flushPreToQueue(){
    if (!voicesReady) return;
    if (preQueue.length){
      const list = preQueue; preQueue=[];
      for (const ut of list) enqueueFromUtter(ut);
    }
    if (!speaking) next();
  }

  async function ensureVoices(){
    if (voicesReady || waiting) return;
    waiting=true;
    const synth=window.speechSynthesis;
    if (!synth){ waiting=false; return; }
    if (synth.getVoices?.().length){
      voicesReady=true; waiting=false; flushPreToQueue(); return;
    }
    await new Promise(res=>{
      let done=false; const finish=()=>{ if(!done){done=true;res();} };
      const t=setTimeout(finish, 3500);
      synth.onvoiceschanged=()=>{ clearTimeout(t); synth.onvoiceschanged=null; finish(); };
      try { synth.getVoices?.(); } catch {}
    });
    voicesReady=true; waiting=false; flushPreToQueue();
  }

  function install(){
    const synth = window.speechSynthesis; if (!synth || installed) return;
    nativeSpeak = synth.speak.bind(synth);

    // ⬇️ Override do speak com kill-switch "enabled"
    synth.speak = (utter) => {
      try {
        if (!enabled) return;                      // ⛔ Voz Off: não fala nada
        setPreference(isFemaleAvatar());           // escolhe fem/masc dinamicamente
        if (!voicesReady && (!synth.getVoices || synth.getVoices().length===0)) {
          preQueue.push(utter); ensureVoices(); return;
        }
        enqueueFromUtter(utter);
        if (!speaking) next();
      } catch { nativeSpeak(utter); }
    };

    synth.onvoiceschanged = () => { voicesReady=true; flushPreToQueue(); };
    installed=true; ensureVoices();
  }

  function cancelAll(){
    try { window.speechSynthesis?.cancel?.(); } catch {}
    queue=[]; preQueue=[]; speaking=false;
    resolveWaitersIfIdle();
  }

  function uninstall(){
    try { const synth=window.speechSynthesis; if (synth && nativeSpeak) synth.speak=nativeSpeak; } catch {}
    installed=false; nativeSpeak=null;
    cancelAll();
    voicesReady=false; waiting=false;
  }

  // 🔁 Exporta também o setEnabled para o botão "Voz On/Off"
  return { install, uninstall, waitUntilIdle, ensureVoices, cancelAll, setEnabled };
})();

/* ========================================================================================
   ⏱️ IA scheduler — um único timer
   ======================================================================================= */
function makeAIScheduler(gameRef, getPlayerColor, runIATurn) {
  let timer=null, thinking=false;
  const aiColor = () => (getPlayerColor()==='white' ? 'b' : 'w');
  const isIATurn = () => {
    const jogo = gameRef.current;
    return !!jogo && !jogo.game_over() && getPlayerColor() && jogo.turn() === aiColor();
  };
  const schedule = (delay=AI_DELAY_MS) => {
    if (timer) { clearTimeout(timer); timer=null; }
    if (!isIATurn() || thinking) return;
    timer = setTimeout(()=>{ timer=null; if (isIATurn() && !thinking) runOnce(); }, delay);
  };
  const runOnce = () => {
    const jogo = gameRef.current; if (!jogo || jogo.game_over()) return;
    if (!isIATurn() || thinking) return;
    thinking=true;
    try { runIATurn(); } finally {
      thinking=false;
      if (isIATurn()) schedule(700);
    }
  };
  const cancel = () => { if (timer) { clearTimeout(timer); timer=null; } };
  return { schedule, cancel, isIATurn };
}

/* ========================================================================================
   🖼️ Sincronismo de tabuleiro antes da fala (render + animação)
   ======================================================================================= */
const BOARD_ANIM_MS = 260;   // mantenha igual ao prop animationDuration do Chessboard
const EXTRA_SYNC_MS = 140;   // respiro adicional para a pintura

function wait(ms){ return new Promise(r => setTimeout(r, ms)); }
const nextPaint = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
async function syncBoardBeforeSpeak(extra = EXTRA_SYNC_MS) {
  await nextPaint();
  await wait(BOARD_ANIM_MS + extra);
}

/* ============================================================================
   🧽 FIX VISUAL: remover clones de arrasto “órfãos” fora do tabuleiro
   ============================================================================ */
function cleanupOrphanDragPieces() {
  try {
    const board = document.getElementById('CustomBoard');
    if (!board) return;
    document.querySelectorAll('.piece').forEach((el) => {
      if (!(el instanceof HTMLElement)) return;
      if (!board.contains(el)) el.remove();
    });
  } catch {}
}

/* --- Detecção robusta de fim de jogo (mate, afogamento, etc.) — opcional/auxiliar --- */
function detectGameOver(jogo) {
  if (!jogo) return null;
  if (jogo.in_checkmate()) return { kind: 'mate' };
  const noMoves = jogo.moves().length === 0;
  if (noMoves && !jogo.in_check()) return { kind: 'stalemate' };
  if (jogo.insufficient_material?.())   return { kind: 'insufficient' };
  if (jogo.in_threefold_repetition?.()) return { kind: 'threefold' };
  if (jogo.in_draw?.())                 return { kind: 'draw' };
  return null;
}

/* ========================================================================================
   ♟️ IA: avaliação simples e busca (para níveis Médio/Difícil)
   - Mantém Fácil = aleatório (igual antes)
   - Médio = 1 lance à frente com bônus por xeque
   - Difícil = minimax com poda alpha-beta (profundidade 2 efetiva)
   ======================================================================================= */
const PIECE_VALUES = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 };

function materialScore(game, aiColor) {
  let score = 0;
  for (const row of game.board()) {
    for (const cell of row) {
      if (!cell) continue;
      const val = PIECE_VALUES[cell.type] || 0;
      score += (cell.color === aiColor ? val : -val);
    }
  }
  return score;
}

function evaluatePosition(game, aiColor) {
  if (game.in_checkmate()) {
    return game.turn() === aiColor ? -999999 : 999999;
  }
  if (
    game.in_draw() || game.in_stalemate?.() ||
    game.insufficient_material?.() || game.in_threefold_repetition?.()
  ) {
    return 0;
  }
  const mat = materialScore(game, aiColor);
  const mobility = game.moves().length * 2;
  return mat + (game.turn() === aiColor ? mobility : -mobility);
}

function chooseMoveMedium(game, movesVerbose, aiColor) {
  let best = [];
  let bestScore = -Infinity;
  for (const m of movesVerbose) {
    game.move(m);
    let s = evaluatePosition(game, aiColor);
    if (game.in_check()) s += 40; // pequeno bônus por xeque imediato
    game.undo();
    if (s > bestScore - 1e-6) {
      if (s > bestScore + 1e-6) { best = [m]; bestScore = s; }
      else best.push(m);
    }
  }
  return best[Math.floor(Math.random() * best.length)];
}

function alphaBeta(game, depth, alpha, beta, maximizing, aiColor) {
  if (depth === 0 || game.game_over()) {
    return evaluatePosition(game, aiColor);
  }
  const moves = game.moves({ verbose: true });
  if (maximizing) {
    let value = -Infinity;
    for (const m of moves) {
      game.move(m);
      value = Math.max(value, alphaBeta(game, depth - 1, alpha, beta, false, aiColor));
      game.undo();
      alpha = Math.max(alpha, value);
      if (alpha >= beta) break;
    }
    return value;
  } else {
    let value = Infinity;
    for (const m of moves) {
      game.move(m);
      value = Math.min(value, alphaBeta(game, depth - 1, alpha, beta, true, aiColor));
      game.undo();
      beta = Math.min(beta, value);
      if (alpha >= beta) break;
    }
    return value;
  }
}

function chooseMoveHard(game, movesVerbose, aiColor, depth = 3) {
  // depth=3 aqui ⇒ primeira camada já conta, recursão usa depth-1 ⇒ efetivo ~2 lances
  let best = [];
  let bestScore = -Infinity;
  for (const m of movesVerbose) {
    game.move(m);
    const score = alphaBeta(game, depth - 1, -Infinity, Infinity, false, aiColor);
    game.undo();
    if (score > bestScore - 1e-6) {
      if (score > bestScore + 1e-6) { best = [m]; bestScore = score; }
      else best.push(m);
    }
  }
  return best[Math.floor(Math.random() * best.length)];
}

/* ========================================================================================
   🎮 Componente principal
   ======================================================================================= */
export default function ComponenteXadrez({ vozAtiva = true, onCancelar }) {
  const gameRef = useRef(new Chess());

  // Estados principais de jogo/UI
  const [fen, setFen] = useState(gameRef.current.fen());
  const [corJogador, setCorJogador] = useState(null);
  const [dificuldade, setDificuldade] = useState('facil');
  const [mensagemFinal, setMensagemFinal] = useState('');
  const [vozLigada, setVozLigada] = useState(vozAtiva);
  const [estatisticas, setEstatisticas] = useState(() => {
    const saved = ls('estatisticasXadrez');
    return saved ? JSON.parse(saved) : { vitorias: 0, empates: 0, derrotas: 0 };
  });
  const [historico, setHistorico] = useState([]);
  const [temaTabuleiro, setTemaTabuleiro] = useState('azul');
  const [pecasCapturadasJogador, setPecasCapturadasJogador] = useState([]);
  const [pecasCapturadasIA, setPecasCapturadasIA] = useState([]);
  const [ultimoMovimento, setUltimoMovimento] = useState(null);
  const [quadradosPermitidos, setQuadradosPermitidos] = useState({});
  const [mostrarTabuleiro, setMostrarTabuleiro] = useState(false);
  const [gameId, setGameId] = useState(1);

  // Infra de IA (scheduler) e cor do jogador
  const aiRef = useRef(null);
  const playerColorRef = useRef(null);
  useEffect(()=>{ playerColorRef.current = corJogador; }, [corJogador]);

  // 🔒 guarda função de restauração de transforms aplicada no drag-begin
  const restoreTransformsRef = useRef(null);

  // 🔊 ÁUDIO DE MOVIMENTO — cria, pré-carrega e guarda no ref
  const moveSfxRef = useRef(null);
  useEffect(() => {
    try {
      const el = new Audio(movePieceSfx);
      el.preload = 'auto';
      el.volume = 0.45; // volume padrão (sutil e elegante)
      moveSfxRef.current = el;
      return () => { try { el.pause(); } catch {} };
    } catch {}
  }, []);
  // Toca o efeito (com proteção de erro/autoplay)
  const playMoveSfx = () => {
    const a = moveSfxRef.current;
    if (!a) return;
    try { a.currentTime = 0; a.play(); } catch {}
  };

  // Instala pipeline de TTS uma vez
  useEffect(() => { TTSPipeline.install(); return () => TTSPipeline.uninstall(); }, []);

  // Instala scheduler da IA uma vez
  useEffect(()=>{
    aiRef.current = makeAIScheduler(gameRef, ()=>playerColorRef.current, ()=>fazerJogadaIA());
    return ()=> aiRef.current?.cancel();
  }, []);

  // Ajusta o perfil de voz assim que a dificuldade muda
  useEffect(() => {
    setTTSProfileFromDifficulty(dificuldade);
  }, [dificuldade]);

  const aiColor = () => (playerColorRef.current === 'white') ? 'b' : 'w';
  const isIATurn = () => {
    const jogo = gameRef.current;
    return !!jogo && !jogo.game_over() && playerColorRef.current && jogo.turn() === aiColor();
  };

  /* -------- Iniciar/Resetar novo jogo -------- */
  const iniciarNovoJogo = async (cor) => {
    try { localStorage.removeItem('xadrez_fimDeJogo'); } catch {}
    aiRef.current?.cancel();

    playerColorRef.current = cor;
    setCorJogador(cor);

    const novo = new Chess();
    gameRef.current = novo;
    setFen(novo.fen());
    setMostrarTabuleiro(true);
    setMensagemFinal('');
    setHistorico([]);
    setPecasCapturadasIA([]); setPecasCapturadasJogador([]);
    setUltimoMovimento(null);
    setQuadradosPermitidos({});
    setGameId(id => id + 1);

    // 🔓 Desbloqueia o áudio no primeiro gesto do usuário (política de autoplay)
    try {
      const a = moveSfxRef.current;
      if (a) {
        const prevVol = a.volume;
        a.volume = 0;
        await a.play();
        a.pause();
        a.currentTime = 0;
        a.volume = prevVol;
      }
    } catch {}

    if (vozLigada) {
      TTSPipeline.cancelAll();
      await waitVoices(3500); await warmupTTS();
      await TTSPipeline.waitUntilIdle();

      const texto = (cor === 'black') ? OPENING_LINES.userBlack : OPENING_LINES.userWhite;
      const ut = new SpeechSynthesisUtterance(texto);
      window.speechSynthesis.speak(ut);
      await TTSPipeline.waitUntilIdle();
    }

    if (cor === 'black') aiRef.current?.schedule(OPENING_DELAY);
  };

  /* -------- IA joga -------- */
  async function fazerJogadaIA() {
    const jogo = gameRef.current; if (!jogo || jogo.game_over()) return;
    if (!isIATurn()) return;

    const movimentos = jogo.moves({ verbose: true });
    if (!movimentos.length) return;

    // 💡 DIFICULDADE REAL: escolhe lance conforme nível
    let movimentoIA;
    const aiCol = aiColor(); // 'w' ou 'b'
    if (dificuldade === 'facil') {
      movimentoIA = movimentos[Math.floor(Math.random() * movimentos.length)];
    } else if (dificuldade === 'medio') {
      movimentoIA = chooseMoveMedium(jogo, movimentos, aiCol);
    } else {
      movimentoIA = chooseMoveHard(jogo, movimentos, aiCol, 3); // profundidade efetiva ~2 lances
    }

    const mov = jogo.move(movimentoIA);
    if (!mov) return;

    setFen(jogo.fen());
    setHistorico(h => [...h, typeof mov.san === 'string' ? mov.san : String(mov.san || '')]);
    setUltimoMovimento([mov.from, mov.to]);
    if (mov.captured) setPecasCapturadasJogador(p => [...p, mov.captured.toLowerCase()]);

    // 🔊 som do lance da IA
    playMoveSfx();

    await syncBoardBeforeSpeak();

    if (vozLigada) {
      try {
        await TTSPipeline.waitUntilIdle();
        await gerarFalaJogadaIA(mov, getNomeIA(), true);
        if (jogo.in_check()) await falarXeque(true, getNomeIA(), true);
        if (jogo.moves().some(m => m.includes('#'))) await falarInstrucaoMate(true, true);
      } catch {}
      await TTSPipeline.waitUntilIdle();
    }

    verificarFimDeJogo();
  }

  /* -------- Jogada do usuário (drag & drop) -------- */
  const onDrop = (from, to) => {
    const jogo = gameRef.current; if (!jogo || jogo.game_over()) return false;

    const turnoDoJogador = (playerColorRef.current === 'white') ? 'w' : 'b';
    if (jogo.turn() !== turnoDoJogador) return false;

    const mov = jogo.move({ from, to, promotion: 'q' });
    if (!mov) return false;

    setFen(jogo.fen());
    setHistorico(h => [...h, typeof mov.san === 'string' ? mov.san : String(mov.san || '')]);
    setUltimoMovimento([from, to]);
    if (mov.captured) setPecasCapturadasIA(p => [...p, mov.captured.toLowerCase()]);

    // 🔊 confirma o drop do usuário
    playMoveSfx();

    (async () => {
      if (vozLigada) {
        try {
          await TTSPipeline.waitUntilIdle();
          await syncBoardBeforeSpeak(100);
          const nomeUser = ls('nomeUsuario','Você');
          await gerarFalaJogadaUsuario(mov, nomeUser, true);
          if (jogo.in_check()) await falarXeque(true, nomeUser, true);
          if (jogo.moves().some(m => m.includes('#'))) await falarInstrucaoMate(true, true);
        } catch {}
        await TTSPipeline.waitUntilIdle();
      }

      verificarFimDeJogo();
      if (!jogo.game_over()) aiRef.current?.schedule();
    })();

    return true; // mantém peça fixada no quadrado destino
  };

  /* -------- Fim de jogo -------- */
  const verificarFimDeJogo = () => {
    const jogo = gameRef.current; if (!jogo.game_over()) return;

    try { localStorage.setItem('xadrez_fimDeJogo', 'sim'); } catch {}

    let msg = '';
    const stats = { ...estatisticas };

    if (jogo.in_checkmate()) {
      const perdedor = jogo.turn();
      const ladoJogador = (playerColorRef.current === 'white') ? 'w' : 'b';
      if (perdedor !== ladoJogador) { msg = 'Você venceu! 🎉'; stats.vitorias++; }
      else { msg = 'Você perdeu! 😢 Seu rei foi colocado em xeque-mate.'; stats.derrotas++; }
    } else if (
      jogo.in_draw?.() ||
      jogo.in_stalemate?.() ||
      jogo.insufficient_material?.() ||
      jogo.in_threefold_repetition?.()
    ) {
      msg = 'Empate! 🤝'; stats.empates++;
    } else {
      return;
    }

    setMensagemFinal(msg);
    setEstatisticas(stats);

    if (vozLigada && msg) {
      (async () => {
        try {
          await TTSPipeline.waitUntilIdle();
          await waitVoices(2000); await warmupTTS(); await TTSPipeline.ensureVoices?.();
          await gerarFalaFinal(msg, true);
          await TTSPipeline.waitUntilIdle();
        } catch {}
      })();
    }
  };

  /* -------- Reforço por FEN -------- */
  useEffect(() => {
    if (!playerColorRef.current) return;
    const jogo = gameRef.current; if (!jogo || jogo.game_over()) return;
    if (aiRef.current?.isIATurn()) {
      setTimeout(async () => { await TTSPipeline.waitUntilIdle(); aiRef.current?.schedule(600); }, 0);
    }
  }, [fen, corJogador]);

  /* -------- Limpeza de clones “órfãos” quando FEN/gameId mudam -------- */
  useEffect(() => { cleanupOrphanDragPieces(); }, [fen, gameId]);

  /* ===== UI (mantida fiel ao seu layout) ===== */
  const temas = {
    claro:       { dark: '#b58863', light: '#f0d9b5' },
    escuro:      { dark: '#444',   light: '#999'    },
    floresta:    { dark: '#769656', light: '#eeeed2' },
    azul:        { dark: '#224f7a', light: '#a3c4dc' },
    pretoBranco: { dark: '#000',    light: '#fff'    },
    rosa:        { dark: '#a74982', light: '#fdd0e8' },
    laranja:     { dark: '#d9902f', light: '#f8e3c1' }
  };
  const { dark, light } = temas[temaTabuleiro];

  // 👉 Durante o drag: neutraliza transforms dos ancestrais + highlights
  const onPieceDragBegin = (_piece, sourceSquare) => {
    // limpa qualquer “clone” remanescente de drags anteriores
    cleanupOrphanDragPieces();

    // aplica anti-fuga: zera transform nos wrappers até o <body>
    try {
      const boardEl = document.getElementById('CustomBoard');
      // se já havia um restorer pendurado (drag anterior), garante restauração
      restoreTransformsRef.current?.();
      restoreTransformsRef.current = neutralizeAncestorTransforms(boardEl);
    } catch {}

    // mantém seu highlight dos destinos
    const moves = gameRef.current.moves({ square: sourceSquare, verbose: true });
    const highlight = {};
    moves.forEach(m => {
      highlight[m.to] = { boxShadow: 'inset 0 0 10px 5px rgba(255,255,0,0.6)', borderRadius: '50%' };
    });
    setQuadradosPermitidos(highlight);
  };

  // ✅ Fim do drag: restaura transforms + reseta transform das peças + limpa clones
  const onPieceDragEnd = () => {
    setQuadradosPermitidos({});
    try {
      // restaura transforms alterados no onPieceDragBegin
      restoreTransformsRef.current?.();
      restoreTransformsRef.current = null;

      // evita offsets residuais no DOM das peças
      document.querySelectorAll('#CustomBoard .piece')
        .forEach((p) => { p.style.transform = ''; });
    } catch {}
    cleanupOrphanDragPieces();
  };

  const renderCapturadas = pecas => pecas.map((p, i) => (
    <span key={i} className="inline-block text-xl">{{
      p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚',
      P: '♙', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔'
    }[p] || '?'}</span>
  ));

    if (!corJogador) {
    return (
      <div className="mt-8 text-center">
        <h2 className="mb-4 text-xl font-semibold">⚪⚫ Escolha sua cor para jogar</h2>
        <div className="flex justify-center gap-4">
          <button onClick={() => iniciarNovoJogo('white')} className="btn-primary">⚪ Jogar com Brancas</button>
          <button onClick={() => iniciarNovoJogo('black')} className="btn-primary">⚫ Jogar com Pretas</button>
        </div>
      </div>
    );
  }

  // ========================================================================================
  // 🧩 Render principal
  // ========================================================================================
  return (
    <div className="mt-6 text-center">
      <div className="flex flex-col items-start justify-center w-full max-w-6xl mx-auto mt-4 lg:flex-row">
        {/* Coluna esquerda: status, tabuleiro e botões */}
        <div className="flex flex-col items-center w-full lg:w-2/3">
          <div className="w-full mb-4 text-left rounded">
            <div className="mb-2 text-xl font-semibold text-purple-700">
              🌟 {mensagemFinal || 'Partida em andamento...'}
            </div>

            <div className="flex flex-wrap text-sm text-gray-800 gap-x-6 gap-y-1">
              <div>🧠 <strong>Vitórias:</strong> {estatisticas.vitorias}</div>
              <div>🤝 <strong>Empates:</strong> {estatisticas.empates}</div>
              <div>💔 <strong>Derrotas:</strong> {estatisticas.derrotas}</div>
            </div>

            {/* ================================
                🎯 Legenda de capturas
               ================================ */}
            <div className="mt-2 text-sm text-gray-800">
              <div>
                ♟ <strong>{getNomeIA()} capturou:</strong>{' '}
                <span className="text-red-600">
                  {renderCapturadas(pecasCapturadasJogador)}
                </span>
              </div>

              <div>
                ♙ <strong>{ls('nomeUsuario', 'Você')} capturou:</strong>{' '}
                <span className="text-green-700">
                  {renderCapturadas(pecasCapturadasIA)}
                </span>
              </div>
            </div>

            {/* 👇 Wrapper do tabuleiro com contain para isolar a pintura (não muda estética) */}
            <div
              className="relative mx-auto"
              style={{ width: '435px', height: '435px', overflow: 'hidden', contain: 'layout paint size' }}
            >
              <Chessboard
                key={gameId}
                id="CustomBoard"
                position={fen}
                boardOrientation={corJogador}
                onPieceDrop={onDrop}
                arePiecesDraggable={true}
                animationDuration={BOARD_ANIM_MS}
                boardWidth={435}
                showBoardNotation={true}
                customBoardStyle={{
                  borderRadius: 10,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                  overflow: 'hidden'
                }}
                customDarkSquareStyle={{ backgroundColor: dark }}
                customLightSquareStyle={{ backgroundColor: light }}
                customSquareStyles={quadradosPermitidos}
                onPieceDragBegin={(piece, square) => {
                  setQuadradosPermitidos({});
                  onPieceDragBegin(piece, square);
                }}
                onPieceDragEnd={onPieceDragEnd}
              />
            </div>

            {/* Botões */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <button
                onClick={() => setDificuldade('facil')}
                className={`btn-primary border rounded ${dificuldade === 'facil' ? 'ring-4 ring-yellow-300' : ''}`}
              >
                😺 Fácil
              </button>
              <button
                onClick={() => setDificuldade('medio')}
                className={`btn-primary border rounded ${dificuldade === 'medio' ? 'ring-4 ring-yellow-300' : ''}`}
              >
                🛡️ Médio
              </button>
              <button
                onClick={() => setDificuldade('dificil')}
                className={`btn-primary border rounded ${dificuldade === 'dificil' ? 'ring-4 ring-yellow-300' : ''}`}
              >
                🐲 Difícil
              </button>

              <button onClick={() => iniciarNovoJogo(corJogador)} className="btn-primary">🔁 Reiniciar</button>
              <button onClick={onCancelar} className="btn-primary">🔙 Voltar</button>

              {/* 🔘 Voz On/Off — controla o TTSPipeline.setEnabled */}
              <button
                onClick={async () => {
                  setVozLigada(prev => {
                    const next = !prev;
                    try {
                      TTSPipeline.setEnabled(next);
                      if (!next) {
                        window.speechSynthesis?.cancel?.();
                      } else {
                        (async () => { await waitVoices(2000); await warmupTTS(); })();
                      }
                    } catch {}
                    return next;
                  });
                }}
                className="btn-primary"
              >
                {vozLigada ? '🔊 Voz On' : '🔇 Voz Off'}
              </button>

              <button
                onClick={() => {
                  const jogo = gameRef.current;
                  if (jogo.history().length === 0) return;
                  jogo.undo();
                  const turnoHumano = (playerColorRef.current === 'white') ? 'w' : 'b';
                  if (jogo.history().length > 0 && jogo.turn() !== turnoHumano) jogo.undo();
                  setFen(jogo.fen());
                  setHistorico(h => h.slice(0, Math.max(0, h.length - 2)));
                  setMensagemFinal('');
                  setUltimoMovimento(null);
                }}
                className="btn-primary"
              >
                ↩️ Desfazer
              </button>

              <button
                onClick={() => {
                  const lista = ['claro', 'escuro', 'floresta', 'azul', 'pretoBranco', 'rosa', 'laranja'];
                  setTemaTabuleiro(t => lista[(lista.indexOf(t) + 1) % lista.length]);
                }}
                className="btn-primary"
              >
                🎨 Tema
              </button>
            </div>
          </div>{/* fim do bloco “w-full mb-4 …” */}
        </div>{/* fim da coluna esquerda */}

        {/* Coluna direita: histórico */}
        <div className="w-full p-4 mt-4 bg-white rounded shadow lg:w-1/3 lg:mt-0">
          <h2 className="mb-2 text-xl font-semibold">📜 Histórico de Jogadas</h2>
          <ul className="space-y-1 overflow-y-auto text-gray-700 list-disc list-inside max-h-96">
            {historico.map((mov, i) => <li key={i}>{mov}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
// ========================================================================================
// FIM — Anti-fuga + som de peça + níveis de dificuldade reais, sem alterar estética.
// IA, sincronismo e TTS preservados. Kill-switch de voz implementado e seguro.
// ========================================================================================
