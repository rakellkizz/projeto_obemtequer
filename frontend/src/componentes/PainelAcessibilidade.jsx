// =============================================================================================
// 📄 PainelAcessibilidade.jsx – Painel flutuante com temas visuais e upload de papel de parede
// Projeto: O Bem Te Quer 💜 – Ultra Comentado, com botão de upload restaurado 💾
// =============================================================================================

import React, { useEffect } from 'react';   // 🧙 Importa React e hooks necessários
import papelDeParede from '../assets/fundos/papel_de_parede_projeto_obemtequer_2.png'; // 🖼️ Wallpaper fixo oficial

export default function PainelAcessibilidade() {
  // 🔁 Ao montar o componente, aplica o tema salvo previamente no localStorage
  useEffect(() => {
    const tema = localStorage.getItem('tema-aplicado'); // 🧠 Recupera o tema atual
    const imagemBase64 = localStorage.getItem('imagem-wallpaper-personalizado'); // 💾 Recupera imagem personalizada
    limparTemas(); // 🧹 Limpa qualquer tema anterior aplicado

    switch (tema) {
      case 'tema-wallpaper-arquivo':
        aplicarFundo(papelDeParede);
        document.body.classList.add('tema-wallpaper-arquivo');
        break;
      case 'tema-wallpaper-personalizado':
        if (imagemBase64) aplicarFundo(imagemBase64);
        document.body.classList.add('tema-wallpaper-personalizado');
        break;
      case 'tema-relaxamento':
        document.body.classList.add('tema-relaxamento');
        document.body.style.backgroundImage = ''; // Remove fundo
        break;
      case 'tema-claro':
      case 'tema-escuro':
      case 'tema-daltonismo':
      case 'tema-alto-contraste':
      case 'tema-leitura':
        document.body.classList.add(tema);
        document.body.style.backgroundImage = ''; // Remove fundo
        break;
      default:
        aplicarFundo(papelDeParede);
        document.body.classList.add('tema-wallpaper-arquivo');
        break;
    }
  }, []);

  // 🖼️ Aplica o fundo de imagem com configurações elegantes e fixas
  const aplicarFundo = (imagem) => {
    document.body.style.backgroundImage = `url(${imagem})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed'; // Fixa o fundo
  };

  // 🧽 Remove todas as classes de tema do body
  const limparTemas = () => {
    document.body.classList.remove(
      'tema-claro', 'tema-escuro', 'tema-tdah', 'tema-daltonismo',
      'tema-alto-contraste', 'tema-leitura',
      'tema-wallpaper-arquivo', 'tema-wallpaper-personalizado', 'tema-relaxamento'
    );
  };

  // 💾 Salva e aplica o tema escolhido
  const aplicarTema = (tema) => {
    localStorage.setItem('tema-aplicado', tema);
    limparTemas();

    if (tema === 'tema-wallpaper-arquivo') {
      aplicarFundo(papelDeParede);
      document.body.classList.add('tema-wallpaper-arquivo');
    } else if (tema === 'tema-wallpaper-personalizado') {
      const imagemBase64 = localStorage.getItem('imagem-wallpaper-personalizado');
      if (imagemBase64) aplicarFundo(imagemBase64);
      document.body.classList.add('tema-wallpaper-personalizado');
    } else if (tema === 'tema-relaxamento') {
      document.body.classList.add('tema-relaxamento');
      document.body.style.backgroundImage = '';
    } else {
      document.body.classList.add(tema);
      document.body.style.backgroundImage = '';
    }
  };

  // 📂 Permite ao usuário escolher uma imagem do seu computador como wallpaper
  const selecionarImagem = (event) => {
    const arquivo = event.target.files[0];
    if (!arquivo) return;

    const leitor = new FileReader(); // 📖 Lê o arquivo como Base64
    leitor.onloadend = () => {
      const base64 = leitor.result;
      localStorage.setItem('imagem-wallpaper-personalizado', base64); // 💾 Salva no navegador
      aplicarTema('tema-wallpaper-personalizado'); // ✨ Aplica automaticamente
    };
    leitor.readAsDataURL(arquivo);
  };

  // 🎛️ Interface visual do painel com botões de escolha de temas
  return (
    <div className="fixed z-50 p-2 space-x-2 bg-white border shadow-lg top-4 right-4 dark:bg-zinc-800 rounded-xl">
      {/* 🎨 Temas visuais de acessibilidade */}
      {[ 
        ['Claro ☀️', 'tema-claro'],
        ['Escuro 🌙', 'tema-escuro'],
        ['Daltonismo 🎨', 'tema-daltonismo'],
        ['Contraste ⚡', 'tema-alto-contraste'],
        ['Leitura 📖', 'tema-leitura'],
        ['Relaxar 🌌', 'tema-relaxamento']
      ].map(([label, tema]) => (
        <button
          key={tema}
          onClick={() => aplicarTema(tema)}
          className="px-2 py-1 text-xs bg-indigo-100 rounded hover:bg-indigo-300 dark:bg-indigo-800 dark:hover:bg-indigo-600"
        >
          {label}
        </button>
      ))}

      {/* 🖼️ Wallpaper fixo padrão */}
      <button
        onClick={() => aplicarTema('tema-wallpaper-arquivo')}
        className="px-2 py-1 text-xs font-semibold text-white rounded bg-gradient-to-r from-indigo-500 to-cyan-600 hover:from-indigo-400 hover:to-cyan-500"
      >
        Wallpaper Padrão 🖼️
      </button>

      {/* 💻 Upload de imagem personalizada */}
      <label className="px-2 py-1 text-xs font-semibold text-white rounded cursor-pointer bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500">
        Escolher Imagem 💻
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={selecionarImagem}
          className="hidden"
        />
      </label>
    </div>
  );
}
