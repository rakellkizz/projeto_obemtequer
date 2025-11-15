// Importa o hook useState do React para gerenciar estado
import { useState } from 'react';

// Importa as imagens dos logos do React e Vite
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

// Importa o CSS global (onde está configurado o Tailwind)
import './App.css';

// Função principal do componente App
function App() {
  // Estado chamado count, que começa com 0
  const [count, setCount] = useState(0);

  // Retorno do JSX (estrutura da interface)
  return (
    // Div principal que ocupa toda a tela, com gradiente azul de fundo
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-blue-200">

      {/* ================= NAVBAR ================= */}
      <header className="w-full bg-blue-600 text-white shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          {/* Título do site */}
          <h1 className="text-2xl font-bold">Obemquetequer</h1>

          {/* Menu de navegação */}
          <nav className="flex gap-6">
            <a href="#" className="hover:underline">Início</a>
            <a href="#" className="hover:underline">Sobre</a>
            <a href="#" className="hover:underline">Contato</a>
          </nav>
        </div>
      </header>

      {/* ================= CONTEÚDO PRINCIPAL ================= */}
      <main className="flex-grow flex flex-col items-center justify-center text-center">
        
        {/* Logos do Vite e React com animação no hover */}
        <div className="flex gap-8 mb-6">
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img
              src={viteLogo}
              className="w-24 hover:scale-110 transition-transform"
              alt="Vite logo"
            />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img
              src={reactLogo}
              className="w-24 hover:scale-110 transition-transform"
              alt="React logo"
            />
          </a>
        </div>

        {/* Título principal */}
        <h1 className="text-5xl font-extrabold text-blue-800 mb-4">
          Vite + React + Tailwind
        </h1>

        {/* ================= CARD CENTRAL ================= */}
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          {/* Texto explicativo */}
          <p className="text-lg mb-4">Clique no botão para contar:</p>

          {/* Botão que incrementa o contador */}
          <button
            onClick={() => setCount(count + 1)} // A cada clique, soma +1 no count
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Contagem: {count}
          </button>

          {/* Texto pequeno abaixo do botão */}
          <p className="mt-4 text-sm text-gray-500">
            Edit <code className="bg-gray-100 px-1 rounded">src/App.jsx</code> e salve para testar HMR.
          </p>
        </div>
      </main>

      {/* ================= RODAPÉ ================= */}
      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>© 2025 Obemquetequer. Todos os direitos reservados.</p>
      </footer>

    </div> // Fecha a div principal
  );
}

// Exporta o componente App para ser usado no projeto
export default App;
