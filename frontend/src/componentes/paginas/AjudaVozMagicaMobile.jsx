// ========================================================================================
// 📄 AjudaVozMagicaMobile.jsx – Ajuda Rápida para Celular (sem fumaça)
// Projeto: O Bem Te Quer 💜 – Compacto, encantador e acessível
// ========================================================================================

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticulasMagicas from '../Visuais/ParticulasMagicas'; // ✨ Partículas flutuantes mágicas
import '../../global.css'; // 🌍 Estilos globais com acessibilidade e temas

export default function AjudaVozMagicaMobile() {
  const navigate = useNavigate();

  // 🔊 Função de fala com voz brasileira
  const falar = (mensagem) => {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(mensagem);
    utter.lang = 'pt-BR';
    window.speechSynthesis.speak(utter);
  };

  useEffect(() => {
    // 🎨 Ativa tema mágico ao carregar
    document.body.className = 'tema-login-magico';

    // 🗣️ Fala a explicação simplificada para celulares
    falar(`
      Ajuda rápida ativada.
      Diga: Gravar agora.
      Depois, diga sua palavra.
      Confirme dizendo sim ou não.
      Você será redirecionada em breve.
    `);

    // ⏳ Redireciona automaticamente após 15 segundos (tempo menor que desktop)
    const timer = setTimeout(() => {
      navigate('/configurar-palavra-voz');
    }, 15000);

    // 🧹 Limpa o redirecionamento se sair da tela
    return () => clearTimeout(timer);
  }, []);

  // ======================================================================================
  // 💫 Interface compacta, mágica e responsiva para celulares
  // ======================================================================================
  return (
    <>
      {/* ✨ Partículas visuais encantadoras (sem fumaça) */}
      <ParticulasMagicas />

      {/* 📱 Conteúdo centralizado com visual responsivo */}
      <div className="text-center container-centralizado fade-in login-card">
        <h2 className="text-lg titulo-login sm:text-xl">📱 Ajuda Rápida</h2>
        <p className="mt-4 text-base text-indigo-200 mensagem-login">
          A voz está te explicando o processo...
        </p>
        <p className="mt-2 text-sm text-indigo-300">
          Em segundos, você será redirecionada.
        </p>
      </div>
    </>
  );
}
