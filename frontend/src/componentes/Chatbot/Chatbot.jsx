// ========================================================================================
// 📄 Chatbot.jsx – Chat empático com emojis refinados + avatares, voz, temas e xadrez
// Projeto: O Bem Te Quer 💜 – Estética acessível, luxuosa e completa
// ========================================================================================

import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rnd } from 'react-rnd';
import '../../global.css';

import {
  falar,
  gerarFalaJogadaIA,
  gerarFalaJogadaUsuario,
  gerarFalaFinal,
  falarTutorial,
} from '../Jogos/falasXadrez.js';

import { enviarMensagemParaBot } from '../../services/conexao';
import respostaSimulada from '../../services/respostaSimulada.js';
import ComponenteXadrez from '../jogos/ComponenteXadrez';

import avatarVictor from '../../assets/avatar/Victor.png';
import camila from '../../assets/avatar/camila.png';
import luna from '../../assets/avatar/luna.png';
import fernando from '../../assets/avatar/fernando.png';
import mauricio from '../../assets/avatar/mauricio.png';
import marcos from '../../assets/avatar/marcos.png';

const avatares = {
  camila:   { nome: 'Dra. Camila',   imagem: camila,   genero: 'feminino' },
  luna:     { nome: 'Dra. Luna',     imagem: luna,     genero: 'feminino' },
  fernando: { nome: 'Dr. Fernando',  imagem: fernando, genero: 'masculino' },
  mauricio: { nome: 'Dr. Mauricio',  imagem: mauricio, genero: 'masculino' },
  marcos:   { nome: 'Dr. Marcos',    imagem: marcos,   genero: 'masculino' },
  victor:   { nome: 'Dr. Victor',    imagem: avatarVictor, genero: 'masculino' },
};

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [mostrarEmojiPicker, setMostrarEmojiPicker] = useState(false);
  const [vozAtiva, setVozAtiva] = useState(true);
  const [mostrarXadrez, setMostrarXadrez] = useState(false);
  const [messages, setMessages] = useState([]);
  const [vozSelecionada, setVozSelecionada] = useState(() => localStorage.getItem('vozSelecionada') || '');
  const [listaVozes, setListaVozes] = useState([]);

  const [avatarSelecionado, setAvatarSelecionado] = useState(() => {
    return localStorage.getItem('avatarSelecionado') || 'victor';
  });

  const [avatarPos, setAvatarPos] = useState(() => {
    return JSON.parse(localStorage.getItem('avatarPosition')) || { x: 20, y: 120 };
  });

  const [avatarSize, setAvatarSize] = useState(() => {
    return JSON.parse(localStorage.getItem('avatarSize')) || { width: 500, height: 500 };
  });

  const alternarEmojiPicker = () => setMostrarEmojiPicker(prev => !prev);

  useEffect(() => {
    localStorage.setItem('avatarSelecionado', avatarSelecionado);
    localStorage.setItem('avatarPosition', JSON.stringify(avatarPos));
    localStorage.setItem('avatarSize', JSON.stringify(avatarSize));
    localStorage.setItem('vozSelecionada', vozSelecionada);
  }, [avatarSelecionado, avatarPos, avatarSize, vozSelecionada]);

  // Carrega vozes do navegador (pt)
  useEffect(() => {
    const carregarVozes = () => {
      const vozes = window.speechSynthesis.getVoices();
      const vozesPT = vozes.filter(v => (v.lang || '').toLowerCase().startsWith('pt'));
      setListaVozes(vozesPT);
      if (!vozSelecionada && vozesPT.length) {
        setVozSelecionada(vozesPT[0].name);
      }
    };
    carregarVozes();
    window.speechSynthesis.onvoiceschanged = carregarVozes;
  }, []);

  // Remove emojis da fala de TTS
  const removerEmojis = (texto) => {
    return texto.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])+|[\u2600-\u26FF]+/g, '').trim();
  };

  // Ajusta voz pelo gênero + preferência (Maria quando Camila/Luna se existir)
  useEffect(() => {
    const genero = avatares[avatarSelecionado]?.genero;
    const nomeLower = avatarSelecionado.toLowerCase();

    // Preferência: se avatar é Camila/Luna e existir "Microsoft Maria", usa ela
    const maria = listaVozes.find(v => v.name === 'Microsoft Maria - Portuguese (Brazil)');
    if ((nomeLower === 'camila' || nomeLower === 'luna') && maria) {
      setVozSelecionada(maria.name);
      return;
    }

    // Caso geral: escolhe a 1ª voz que pareça do gênero
    const vozesPreferidas = listaVozes.filter(v => {
      const nome = (v.name || '').toLowerCase();
      return genero === 'feminino'
        ? nome.includes('maria') || nome.includes('female') || nome.includes('femin')
        : nome.includes('daniel') || nome.includes('male')  || nome.includes('masc');
    });
    if (vozesPreferidas.length) {
      setVozSelecionada(vozesPreferidas[0].name);
    }
  }, [avatarSelecionado, listaVozes]);

  // --- helpers mínimos (não mudam seu fluxo/visual) -----------------------------

  // Tenta IA; se falhar ou vier vazio/indicação de offline → respostaSimulada
  const pedirResposta = async (texto) => {
    try {
      let r = await enviarMensagemParaBot(texto);
      if (!r || typeof r !== 'string' || /offline|erro|falhou/i.test(r)) {
        return respostaSimulada(texto);
      }
      return r;
    } catch {
      return respostaSimulada(texto);
    }
  };

  // Fala com TTS, sem quebrar UI se algo der errado
  const falarSeguro = (texto) => {
    try {
      if (!vozAtiva) return;
      const utterance = new SpeechSynthesisUtterance(removerEmojis(texto));
      utterance.lang = 'pt-BR';
      const voz = listaVozes.find(v => v.name === vozSelecionada);
      if (voz) utterance.voice = voz;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } catch { /* silencioso */ }
  };

  // --------------------------------------------------------------------------------

  const handleSend = async () => {
    if (!input.trim()) return;
    const novaMensagem = { remetente: 'usuario', texto: input };
    setMessages((prev) => [...prev, novaMensagem]);
    const textoUsuario = input;
    setInput('');

    // pede resposta (real → fallback simulado)
    const resposta = await pedirResposta(textoUsuario);
    const respostaTratada = resposta || 'Estou aqui por você. Me conta, o que está passando na sua cabeça? 💬';

    const respostaIA = { remetente: 'ia', texto: respostaTratada };
    setMessages((prev) => [...prev, respostaIA]);

    if ((textoUsuario + ' ' + respostaTratada).toLowerCase().includes('xadrez')) {
      setMostrarXadrez(true);
    }

    falarSeguro(respostaTratada);
  };

  return (
    <div className="relative flex items-start justify-center w-full max-w-full gap-6 p-4 mx-auto bg-transparent">
      <Rnd
        bounds="body"
        style={{ position: 'fixed', zIndex: 50 }}
        enableResizing={{ bottomRight: true }}
        size={avatarSize}
        position={avatarPos}
        onDragStop={(e, d) => setAvatarPos({ x: d.x, y: d.y })}
        onResizeStop={(e, dir, ref, delta, pos) => {
          setAvatarSize({ width: ref.offsetWidth, height: ref.offsetHeight });
          setAvatarPos(pos);
        }}
      >
        <motion.div
          className="flex items-center justify-center w-full h-full overflow-visible"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <img
            src={avatares[avatarSelecionado].imagem}
            alt={`Avatar de ${avatares[avatarSelecionado].nome}`}
            className="object-contain w-full h-full cursor-move pointer-events-auto select-none"
          />
        </motion.div>
      </Rnd>

      <div className="flex flex-col flex-1 p-3 border shadow-md backdrop-blur-sm bg-white/5 rounded-xl border-white/10 min-h-[480px] max-w-[720px]">
        <div className="p-2 mb-4 overflow-y-auto rounded-md h-72 bg-white/10 backdrop-blur-md">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-3 rounded-lg text-sm max-w-[80%] ${
                msg.remetente === 'usuario'
                  ? 'bg-indigo-300 self-end text-right'
                  : 'bg-emerald-200 self-start'
              }`}
            >
              {msg.texto}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-2">
          <select
            value={avatarSelecionado}
            onChange={(e) => setAvatarSelecionado(e.target.value)}
            className="px-2 py-1 text-sm border rounded-md"
          >
            {Object.entries(avatares).map(([nome, dados]) => (
              <option key={nome} value={nome}>{dados.nome}</option>
            ))}
          </select>

          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          />

          <button
            onClick={alternarEmojiPicker}
            className="flex items-center justify-center w-10 h-10 text-xl transition-all duration-150 bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md hover:bg-indigo-100"
          >
            😊
          </button>

          <button
            onClick={handleSend}
            className="px-4 py-2 text-white transition bg-indigo-500 rounded-md hover:bg-indigo-600"
          >
            Enviar
          </button>

          <button
            onClick={() => setVozAtiva(!vozAtiva)}
            className={`px-3 py-2 rounded-full text-sm transition ${vozAtiva ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-800'}`}
          >
            {vozAtiva ? '🔊 Voz ON' : '🔇 Voz OFF'}
          </button>
        </div>

        <AnimatePresence>
          {mostrarEmojiPicker && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-20 right-4 bg-white rounded-xl shadow-xl p-2 z-50 border border-indigo-300 w-[280px]"
            >
              <EmojiPicker
                onEmojiClick={(emojiData) => setInput((prev) => prev + emojiData.emoji)}
                theme="light"
                height={320}
                width={260}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!mostrarXadrez && (
          <button
            onClick={() => setMostrarXadrez(true)}
            className="px-6 py-2 mt-4 text-white transition bg-indigo-700 rounded-md hover:bg-indigo-800"
          >
            ♟️ Jogar Xadrez
          </button>
        )}

        {mostrarXadrez && (
          <div className="w-full mt-6">
            <ComponenteXadrez
              vozAtiva={vozAtiva}
              nomeIA={avatares[avatarSelecionado].nome}
              onCancelar={() => setMostrarXadrez(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ========================================================================================
// 📝 FIM do arquivo Chatbot.jsx
// ========================================================================================
