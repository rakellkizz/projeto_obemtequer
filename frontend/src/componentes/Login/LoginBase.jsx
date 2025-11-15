// =============================================================================================
// 📄 COMPONENTE: LoginBase.jsx
// Projeto: O Bem Te Quer 💜 – Login luxuoso, acessível, com imagem de fundo ou degradê elegante
// Finalidade: Reutilizável para todas telas de login com suporte a papel de parede
// =============================================================================================

import React from 'react';
import '../../global.css'; // 🌍 Estilos globais com Tailwind + @apply personalizados

// =============================================================================================
// 🌟 COMPONENTE: LoginBase
// Props esperadas:
// - titulo (string): Texto principal exibido no topo (ex: "Login Facial")
// - icone (JSX): Ícone visual ao lado do título
// - children (JSX): Todo conteúdo dinâmico da tela (inputs, botões, mensagens etc.)
// =============================================================================================
export default function LoginBase({ titulo, children, icone }) {
  // 🔍 Tenta obter a imagem de fundo salva no localStorage (se existir)
  const imagemDeFundo =
    typeof window !== 'undefined' ? localStorage.getItem('papel-pcd') : null;

  return (
    // =========================================================================================
    // 🧱 CONTAINER EXTERNO – Tela completa com fundo (imagem ou degradê fallback)
    // =========================================================================================
    <div
      className="flex items-center justify-center min-h-screen p-6 bg-center bg-cover fade-in"
      style={{
        backgroundImage: imagemDeFundo
          ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${imagemDeFundo})`
          : 'linear-gradient(to bottom right, #09090b, #000000, #18181b)', // fallback elegante
      }}
    >

      {/* =====================================================================================
          💎 CARTÃO CENTRAL – Caixa branca (ou escura no tema dark), com sombra, vidro fosco e bordas suaves
      ===================================================================================== */}
      <div className="w-full max-w-md p-8 space-y-6 transition-all duration-300 border shadow-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border-zinc-200 dark:border-zinc-700 rounded-3xl">

        {/* =====================================================================================
            📝 TÍTULO COM ÍCONE – Texto central com ícone opcional e destaque visual
        ===================================================================================== */}
        {titulo && (
          <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-center text-purple-700 dark:text-purple-300">
            {icone && <span>{icone}</span>}
            {titulo}
          </h2>
        )}

        {/* =====================================================================================
            🎯 ÁREA DINÂMICA – Tudo que vem como "children" do componente
        ===================================================================================== */}
        {children}
      </div>
    </div>
  );
}
