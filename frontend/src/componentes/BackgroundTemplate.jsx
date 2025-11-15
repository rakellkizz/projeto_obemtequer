// =============================================================================================
// 📄 BackgroundTemplate.jsx – Fundo visual luxuoso com papel de parede oficial
// Projeto: O Bem Te Quer 💜
// Descrição: Componente reutilizável que aplica o fundo oficial + camada de conteúdo centralizada
// =============================================================================================

import React from 'react';
import '../global.css'; // 🌍 Importa estilos globais com temas e visual

function BackgroundTemplate({ children }) {
  return (
    // 🖼️ Fundo com papel de parede oficial do projeto
    <div className="relative w-full h-screen overflow-hidden tema-wallpaper-oficial">

      {/* 🎨 Camada de escurecimento para melhor contraste com o conteúdo */}
      <div className="absolute inset-0 z-10 bg-black bg-opacity-10" />

      {/* 🎯 Área centralizada para exibir o conteúdo acima do fundo */}
      <div className="relative z-20 flex items-center justify-center h-full p-4 fade-in">
        {children}
      </div>
    </div>
  );
}

export default BackgroundTemplate;
