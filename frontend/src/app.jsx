// ============================================================================
// 📄 App.jsx – Estrutura principal da aplicação com rotas, animações e acessibilidade
// Projeto: O Bem Te Quer 💜 – Um sistema empático, moderno e inclusivo
// ============================================================================

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './global.css';

import PainelAcessibilidade from './componentes/PainelAcessibilidade';

// 🧩 Páginas
import TelaInicialVoz from './componentes/paginas/TelaInicialVoz';
import MenuPrincipal from './componentes/paginas/MenuPrincipal';
import MenuEscolhaLogin from './componentes/paginas/MenuEscolhaLogin';
import Home from './componentes/paginas/Home';

// ✨ Voz mágica e ajuda
import ConfigurarPalavraMagica from './componentes/paginas/ConfigurarPalavraMagica';
import AjudaVozMagica from './componentes/paginas/AjudaVozMagica';
import AjudaVozMagicaMobile from './componentes/paginas/AjudaVozMagicaMobile';

// 🔐 Modos de login
import LoginAcessivel from './componentes/Login/LoginAcessivel';
import LoginFacial from './componentes/Login/LoginFacial';
import LoginTradicional from './componentes/Login/LoginTradicional';
import LoginMagico from './componentes/Login/LoginMagico';

// 🤖 Chat
import Chatbot from './componentes/Chatbot/Chatbot';

// ♟️ Xadrez
import TelaXadrez from './componentes/Jogos/TelaXadrez';

// ==========================================================================================
// 🧱 Layout base com o painel de acessibilidade
// ==========================================================================================
function LayoutBase({ children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        console.log('🔐 ESC pressionado – pode fechar modais, se houver.');
      }
      if (e.key === 'Tab') document.body.classList.add('usando-teclado');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4">
      <PainelAcessibilidade />
      {children}
    </div>
  );
}

// ==========================================================================================
// 🎬 Rotas com animação
// ==========================================================================================
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* ⭐ Agora o portal (Home.jsx) é a página inicial */}
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />

        {/* Tela de ativação por voz inicial (mantida, mas em rota própria) */}
        <Route path="/tela-voz" element={<PageWrapper><TelaInicialVoz /></PageWrapper>} />

        {/* Menus */}
        <Route path="/menu-escolha" element={<PageWrapper><MenuEscolhaLogin /></PageWrapper>} />
        <Route path="/menu-principal" element={<PageWrapper><MenuPrincipal /></PageWrapper>} />

        {/* ✨ Voz mágica e ajuda */}
        <Route path="/configurar-palavra" element={<PageWrapper><ConfigurarPalavraMagica /></PageWrapper>} />
        <Route path="/ajuda-voz-magica" element={<PageWrapper><AjudaVozMagica /></PageWrapper>} />
        {/* Mantida rota alternativa, se você já usava este slug */}
        <Route path="/ajuda-palavra" element={<PageWrapper><AjudaVozMagica /></PageWrapper>} />
        <Route path="/ajuda-voz-magica-mobile" element={<PageWrapper><AjudaVozMagicaMobile /></PageWrapper>} />

        {/* 🔐 Modos de login */}
        <Route path="/login-acessivel" element={<PageWrapper><LoginAcessivel /></PageWrapper>} />
        <Route path="/login-facial" element={<PageWrapper><LoginFacial /></PageWrapper>} />
        <Route path="/login-tradicional" element={<PageWrapper><LoginTradicional /></PageWrapper>} />
        <Route path="/login-magico" element={<PageWrapper><LoginMagico /></PageWrapper>} />

        {/* 🤖 Chat & ♟️ Xadrez */}
        <Route path="/chatbot" element={<PageWrapper><Chatbot /></PageWrapper>} />
        <Route path="/xadrez" element={<PageWrapper><TelaXadrez /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

// ==========================================================================================
// 🌈 Wrapper de animação para cada página
// ==========================================================================================
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

// ==========================================================================================
// 🚀 App principal
// ==========================================================================================
export default function App() {
  return (
    <Router>
      <LayoutBase>
        <AnimatedRoutes />
      </LayoutBase>
    </Router>
  );
}
