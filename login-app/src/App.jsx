// Importa o hook useState do React
import { useState } from 'react'

// Função principal do componente App
function App() {
  // Declara dois estados: email e password, usados para armazenar os valores digitados no formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    // Container principal com altura da tela inteira, centralização e fundo cinza claro
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      {/* Caixa branca com sombra, bordas arredondadas, padding e largura máxima */}
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        
        {/* Título centralizado com fonte grande e espaçamento abaixo */}
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login no sistema
        </h1>

        {/* Início do formulário */}
        <form className="space-y-4">
          
          {/* Campo de e-mail */}
          <div>
            {/* Label para o campo */}
            <label className="block text-sm font-medium text-gray-700">
              E-mail
            </label>

            {/* Campo de input do tipo email com estilização do Tailwind Forms */}
            <input
              type="email"
              value={email} // Valor atual do input
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado quando digita
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="seuemail@email.com"
              required // Campo obrigatório
            />
          </div>

          {/* Campo de senha */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              value={password} // Valor atual do input
              onChange={(e) => setPassword(e.target.value)} // Atualiza o estado quando digita
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Digite sua senha"
              required
            />
          </div>

          {/* Botão de enviar o formulário */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

// Exporta o componente para uso em outros arquivos
export default App;
