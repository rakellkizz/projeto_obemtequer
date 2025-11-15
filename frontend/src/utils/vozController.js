// ========================================================================================
// 🔊 vozController.js – Fala (TTS) + Escuta (ASR) com VOZ definida por avatarGenero ou por NOME
// Projeto: O Bem Te Quer 💜
// Regra de escolha da voz (em falar()):
//  1) Lê avatarGenero ('feminino' | 'masculino') do localStorage (padrão 'masculino').
//  2) Se existir uma voz preferida salva por NOME p/ esse gênero, usa ela.
//     - chaves: 'vozPreferida_ptBR_feminino' | 'vozPreferida_ptBR_masculino'
//  3) Senão, tenta heurística pt-BR por gênero (nomes comuns).
//  4) Senão, 1ª pt-BR disponível. Fallback final: 1ª voz da lista.
// ========================================================================================

import SpeechRecognition from 'react-speech-recognition';

let voicesCache = [];
let voicesReady = false;
let DEBUG = false; // mude para true p/ ver logs no console

function log(...args) { if (DEBUG) console.log('[vozController]', ...args); }

function carregarVozes() {
  return new Promise((resolve) => {
    const tentar = () => {
      const v = window.speechSynthesis?.getVoices?.() || [];
      if (v && v.length) {
        voicesCache = v;
        voicesReady = true;
        resolve(voicesCache);
      } else {
        setTimeout(() => resolve(tentar()), 120);
      }
    };
    tentar();
  });
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    voicesCache = window.speechSynthesis.getVoices();
    voicesReady = true;
    log('onvoiceschanged ->', voicesCache.map(v => `${v.name} (${v.lang})`));
  };
}

// -------------------------------
// Preferências
// -------------------------------
export function setPreferenciaGenero(genero) {
  if (genero === 'feminino' || genero === 'masculino') {
    try { localStorage.setItem('avatarGenero', genero); } catch {}
  }
}

function getGenero() {
  try {
    const ls = localStorage.getItem('avatarGenero');
    if (ls === 'feminino' || ls === 'masculino') return ls;
  } catch {}
  return 'masculino';
}

// Preferência por NOME de voz (opcional, mas recomendado p/ ser determinístico)
export function setVozPreferidaPorNome(genero, nomeExato) {
  if (!nomeExato || (genero !== 'feminino' && genero !== 'masculino')) return;
  try { localStorage.setItem(`vozPreferida_ptBR_${genero}`, nomeExato); } catch {}
}

export function limparVozPreferida(genero) {
  try {
    if (genero === 'feminino' || genero === 'masculino') {
      localStorage.removeItem(`vozPreferida_ptBR_${genero}`);
    } else {
      localStorage.removeItem('vozPreferida_ptBR_feminino');
      localStorage.removeItem('vozPreferida_ptBR_masculino');
    }
  } catch {}
}

function getVozPreferidaNome(genero) {
  try { return localStorage.getItem(`vozPreferida_ptBR_${genero}`) || null; } catch {}
  return null;
}

// -------------------------------
// Utilidades p/ inspeção
// -------------------------------
export function listarVozesDisponiveis() {
  const voces = voicesCache?.length ? voicesCache : (window.speechSynthesis?.getVoices?.() || []);
  return voces.map(v => ({ name: v.name, lang: v.lang, voiceURI: v.voiceURI }));
}

// -------------------------------
// Seleção da voz
// -------------------------------
function encontrarVozPorNome(nome) {
  const voces = voicesCache?.length ? voicesCache : (window.speechSynthesis?.getVoices?.() || []);
  return voces.find(v => v.name === nome) || null;
}

function escolherVozHeuristicaPtBR(genero) {
  const voces = voicesCache?.length ? voicesCache : (window.speechSynthesis?.getVoices?.() || []);
  if (!voces.length) return null;

  const pt = voces.filter(v => (v.lang || '').toLowerCase().startsWith('pt-br'));
  const cand = pt.length ? pt : voces;

  // Heurísticas por nomes comuns em pt-BR
  const femPats = [/maria/i, /camila/i, /helo[ií]sa/i, /luciana/i, /vit[óo]ria|victoria/i, /female|feminina|mulher/i];
  const mascPats = [/jo[aã]o/i, /carlos/i, /ricardo/i, /pedro/i, /male|masculina|homem/i];

  const ok = (v, pats) => pats.some(re => re.test(v.name) || re.test(v.voiceURI));

  if (genero === 'feminino') {
    const v1 = cand.find(v => ok(v, femPats));
    if (v1) return v1;
  } else {
    const v1 = cand.find(v => ok(v, mascPats));
    if (v1) return v1;
  }
  return cand[0] || null;
}

function escolherVoz(genero) {
  // 1) preferida por nome (se houver)
  const preferida = getVozPreferidaNome(genero);
  if (preferida) {
    const v = encontrarVozPorNome(preferida);
    if (v) { log('Usando preferida por nome:', preferida); return v; }
    log('Preferida por nome não encontrada, caindo na heurística…');
  }

  // 2) heurística pt-BR por gênero
  const heur = escolherVozHeuristicaPtBR(genero);
  if (heur) return heur;

  // 3) fallback geral
  const voces = voicesCache?.length ? voicesCache : (window.speechSynthesis?.getVoices?.() || []);
  return voces[0] || null;
}

// ------------------------------------
// 🎙️ Falar (TTS)
// ------------------------------------
export async function falar(texto, onend) {
  if (!window.speechSynthesis) {
    if (typeof onend === 'function') onend();
    return;
  }

  if (!voicesReady || !voicesCache.length) {
    await carregarVozes().catch(() => {});
  }

  const genero = getGenero(); // 'feminino' | 'masculino'
  const voz = escolherVoz(genero);
  if (voz) log('Voz escolhida:', voz.name, voz.lang);

  const utt = new SpeechSynthesisUtterance(texto ?? '');
  if (voz) utt.voice = voz;

  // ajustes finos
  utt.lang  = (voz && voz.lang) || 'pt-BR';
  utt.rate  = genero === 'feminino' ? 1.06 : 1.0;
  utt.pitch = genero === 'feminino' ? 1.10 : 0.98;
  utt.volume = 1.0;

  utt.onend = () => { if (typeof onend === 'function') onend(); };

  try { window.speechSynthesis.cancel(); } catch {}
  window.speechSynthesis.speak(utt);
}

export function pararFala() {
  try { window.speechSynthesis.cancel(); } catch {}
}

// ------------------------------------
// 🎧 Escuta (ASR)
// ------------------------------------
export function iniciarEscuta(options = {}) {
  const { continuous = true, language = 'pt-BR' } = options;
  try { SpeechRecognition.startListening({ continuous, language }); } catch {}
}

export function pararEscuta() {
  try { SpeechRecognition.stopListening(); } catch {}
}

export function retomarEscuta(options = {}) {
  const { continuous = true, language = 'pt-BR' } = options;
  try { SpeechRecognition.startListening({ continuous, language }); } catch {}
}

// ⏸️ Pausar/retomar escuta
let __pauseTimer = null;
export function pausarEscutaTemporariamente(ms = 2000, options = {}) {
  const { retomar = true, language = 'pt-BR', continuous = true } = options;

  try { SpeechRecognition.stopListening(); } catch {}

  if (__pauseTimer) { clearTimeout(__pauseTimer); __pauseTimer = null; }

  if (retomar) {
    __pauseTimer = setTimeout(() => {
      try { SpeechRecognition.startListening({ continuous, language }); } catch {}
      __pauseTimer = null;
    }, ms);
  }
}

// ========================================================================================
// FIM – vozController.js
// ========================================================================================
