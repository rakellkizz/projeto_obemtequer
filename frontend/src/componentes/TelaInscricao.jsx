// ========================================================================================
// 📄 TelaInscricao.jsx — captura nome do usuário e avatar, salva no localStorage
// ========================================================================================
import React, { useState, useEffect } from 'react';
import { setNomeUsuario, setAvatarSelecionado, getNomeUsuario, getAvatarSelecionado } from '../utils/prefs';

const AVATARES = [
  { id: 'camila',   label: 'Dra. Camila'   },
  { id: 'luna',     label: 'Dra. Luna'     },
  { id: 'fernando', label: 'Dr. Fernando'  },
  { id: 'mauricio', label: 'Dr. Mauricio'  },
  { id: 'marcos',   label: 'Dr. Marcos'    },
  { id: 'victor',   label: 'Dr. Victor'    },
];

export default function TelaInscricao({ onConfirmar }) {
  const [nome, setNome] = useState('');
  const [avatar, setAvatar] = useState('victor');

  useEffect(() => {
    // Prefill se já existir
    const n = getNomeUsuario(); if (n) setNome(n);
    const a = getAvatarSelecionado(); if (a) setAvatar(a);
  }, []);

  function handleContinuar() {
    if (!nome || nome.trim().length < 2) {
      alert('Digite seu nome para continuar 😊');
      return;
    }
    setNomeUsuario(nome.trim());
    setAvatarSelecionado(avatar);
    onConfirmar?.(); // entrega o fluxo para App.jsx
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-white to-purple-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-2xl">
        <h1 className="mb-4 text-2xl font-semibold text-purple-700">💜 O Bem Te Quer</h1>
        <p className="mb-4 text-gray-600">Diga seu nome e escolha quem será sua IA no xadrez.</p>

        <label className="block mb-1 text-sm font-medium text-gray-700">Seu nome</label>
        <input
          type="text"
          className="w-full px-4 py-2 mb-4 border border-purple-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Ex.: Kell"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <label className="block mb-1 text-sm font-medium text-gray-700">Avatar da IA</label>
        <select
          className="w-full px-3 py-2 mb-6 border border-purple-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        >
          {AVATARES.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
        </select>

        <button
          onClick={handleContinuar}
          className="w-full px-4 py-2 font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
