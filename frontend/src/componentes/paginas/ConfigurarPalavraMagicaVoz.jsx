// ============================================================================================
// 📄 ConfigurarPalavraMagicaVoz.jsx – Configuração 100% por Voz da Palavra Mágica 🧙
// Projeto: O Bem Te Quer 💜 – Inclusivo, mágico e acessível com ajuda, retorno e estilo PCD
// ============================================================================================

import React, { useEffect, useState } from 'react'; // 🧙 Importa React e hooks necessários
import { useNavigate } from 'react-router-dom'; // 🧭 Navegação entre páginas
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; // 🎤 Reconhecimento de voz
import { falar, iniciarEscuta, pararEscuta } from '../../utils/vozController'; // 🔊 Controlador de fala
import { FrasesVoz } from "../Acessibilidade/frasesVoz"; // 🧠 Frases padronizadas para voz
import ParticulasMagicas from '../Visuais/ParticulasMagicas'; // ✨ Efeito visual mágico
import '../../global.css';

export default function ConfigurarPalavraMagicaVoz() {
  const navigate = useNavigate();

  // 🎯 Estado principal do processo de voz: 'esperando' → 'confirmando' → 'salvo'
  const [estado, setEstado] = useState('esperando');

  // 🧠 Armazena a frase mágica falada
  const [frase, setFrase] = useState('');

  // 💬 Texto exibido para o usuário na tela
  const [mensagem, setMensagem] = useState(FrasesVoz.iniciarConfiguracao);

  // 🎙️ Impede conflitos entre fala e escuta
  const [vozFalando, setVozFalando] = useState(false);

  // 🎤 Hook de escuta por voz
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // ▶️ Ao iniciar o componente
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert('Este navegador não suporta reconhecimento de voz.');
      return;
    }

    document.body.className = 'tema-login-magico'; // Aplica tema mágico
    resetTranscript();

    // ⏳ Aguarda e inicia saudação por voz
    setTimeout(() => {
      setVozFalando(true);
      falar(FrasesVoz.iniciarConfiguracao, () => setVozFalando(false));
    }, 600);

    iniciarEscuta(() => {}); // Começa escuta contínua

    return () => pararEscuta(); // Limpa ao sair
  }, []);

  // 🧠 Processa comandos reconhecidos
  useEffect(() => {
    const comando = transcript.toLowerCase().trim();
    if (!comando || vozFalando) return;

    // 🔙 Voltar ao menu
    if (comando.includes('voltar')) {
      falar(FrasesVoz.voltarInicio, () => navigate('/'));
      return;
    }

    // 🆘 Ajuda verbal
    if (comando.includes('ajuda')) {
      setMensagem(FrasesVoz.ajudaConfiguracao);
      falar(FrasesVoz.ajudaConfiguracao);
      resetTranscript();
      return;
    }

    // 📜 Mostrar histórico
    if (comando.includes('mostrar histórico')) {
      const historico = JSON.parse(localStorage.getItem('palavrasMagicasHistorico')) || [];
      const texto = historico.length
        ? `${FrasesVoz.historicoIntro} ${historico.join(', ')}.`
        : FrasesVoz.historicoVazio;
      setMensagem(texto);
      falar(texto);
      resetTranscript();
      return;
    }

    // ❌ Deletar histórico
    if (comando.includes('deletar')) {
      localStorage.removeItem('palavraMagicaPersonalizada');
      localStorage.removeItem('palavrasMagicasHistorico');
      setMensagem(FrasesVoz.deletado);
      falar(FrasesVoz.deletado);
      setEstado('esperando');
      resetTranscript();
      return;
    }

    // 🎤 Etapa 1: ouvir nova frase
    if (estado === 'esperando') {
      setFrase(comando);
      const confirmacao = `${FrasesVoz.confirmarFrasePrefixo} ${comando}. ${FrasesVoz.confirmarFraseSufixo}`;
      setMensagem(confirmacao);
      setEstado('confirmando');
      falar(confirmacao);
      resetTranscript();
      return;
    }

    // ✅ Etapa 2: confirmação da frase
    if (estado === 'confirmando') {
      if (comando.includes('confirmar')) {
        salvarPalavraMagica(frase);
        setMensagem(FrasesVoz.fraseSalva);
        setEstado('salvo');
        falar(FrasesVoz.fraseSalvaFinal, () => navigate('/'));
        return;
      }

      if (comando.includes('cancelar')) {
        setMensagem(FrasesVoz.repetir);
        setFrase('');
        setEstado('esperando');
        falar(FrasesVoz.repetir);
        resetTranscript();
        return;
      }

      // 🔁 Caso indeciso
      falar(FrasesVoz.reforcarConfirmacao);
      resetTranscript();
    }
  }, [transcript]);

  // 💾 Armazena a frase mágica e atualiza histórico local
  const salvarPalavraMagica = (nova) => {
    const atual = nova.toLowerCase();
    localStorage.setItem('palavraMagicaPersonalizada', atual);

    const historico = JSON.parse(localStorage.getItem('palavrasMagicasHistorico')) || [];
    const novoHistorico = [atual, ...historico.filter(p => p !== atual)].slice(0, 3);
    localStorage.setItem('palavrasMagicasHistorico', JSON.stringify(novoHistorico));
  };

  // 🎨 Layout mágico e acessível
  return (
    <>
      <ParticulasMagicas />
      <div className="container-centralizado fade-in">
        <div className="text-center text-white border login-card bg-zinc-900/80 border-cyan-600 backdrop-blur-xl">
          <h2 className="titulo-login">🔮 Configurar Palavra Mágica por Voz</h2>

          {/* 🧙 Texto falado na tela */}
          <p className="mensagem-login">{mensagem}</p>

          {/* 📢 Instruções extras para o usuário */}
          <p className="mt-4 text-sm italic text-indigo-300">
            Diga sua frase mágica com clareza. Ex: “O bem me quer”, “abrir portal”, etc.
          </p>

          <p className="mt-2 text-xs text-indigo-400">
            Comandos: "confirmar", "cancelar", "mostrar histórico", "deletar", "ajuda", "voltar"
          </p>
        </div>
      </div>
    </>
  );
}
// ============================================================================================
// 🪄 Fim da configuração de palavra mágica por voz – O Bem Te Quer
// Esta página é parte do projeto O Bem Te Quer 💜, que visa criar uma experiência
// acessível, mágica e acolhedora para todos os usuários. A configuração da palavra
// mágica é feita 100% por voz, com feedback claro e histórico de palavras.
// A interface é limpa, com partículas mágicas para manter a atmosfera encantadora,
// mas sem fumaça ou distrações visuais. O objetivo é proporcionar uma experiência  
// fluida e intuitiva, respeitando o tempo do usuário e garantindo que ele se sinta
// confortável e seguro. A voz ativa guia o usuário de forma empática, sem distrações
// visuais, focando na configuração da palavra mágica. A interface é limpa, com
// partículas mágicas para manter a atmosfera encantadora, mas sem fumaça ou distrações. 
// O objetivo é proporcionar uma experiência fluida e intuitiva, respeitando o tempo
// do usuário e garantindo que ele se sinta confortável e seguro.
// ============================================================================================
// ========================================================================================
// 🪄 Fim da página de ajuda guiada por voz – O Bem Te Que
// =======================================================================================
