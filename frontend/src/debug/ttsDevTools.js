// Atalhos de TTS/ASR no console do navegador (apenas para debug)
import {
  listarVozesDisponiveis,
  setVozPreferidaPorNome,
  limparVozPreferida,
  falar,
  setPreferenciaGenero,
} from "../utils/vozController";

if (typeof window !== "undefined") {
  // listar vozes
  window.tts_list = () => listarVozesDisponiveis();
  // fixar voz feminina/masculina por NOME
  window.tts_setFem = (nome) => setVozPreferidaPorNome("feminino", nome);
  window.tts_setMasc = (nome) => setVozPreferidaPorNome("masculino", nome);
  // limpar preferências salvas
  window.tts_clearFem = () => limparVozPreferida("feminino");
  window.tts_clearMasc = () => limparVozPreferida("masculino");
  // definir gênero atual (o falar() lê isso)
  window.tts_genero = (g) => setPreferenciaGenero(g); // 'feminino' | 'masculino'
  // falar direto do console
  window.tts_say = (texto) => falar(texto);
  console.log(
    "[ttsDevTools] Pronto! Use no console: tts_list(), tts_setFem('NOME'), tts_genero('feminino'), tts_say('oi')."
  );
}
// =============================================================================================
// ✅ Fim do ttsDevTools.js – Atalhos de voz para debug no console do navegador
// =============================================================================================