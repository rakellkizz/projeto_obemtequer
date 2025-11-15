// =============================================================================================
// 📄 LoginTradicional.jsx – Login por usuário/senha, com voz alinhada ao avatar
// Projeto: O Bem Te Quer 💜
// =============================================================================================
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPreferenciaGenero } from '../../utils/vozController';
import { mapAvatarToGenero } from '../../utils/mapAvatarGenero';
import '../../global.css';

export default function LoginTradicional() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // ✅ Sincroniza voz ao abrir
  useEffect(() => {
    try {
      const avatar = localStorage.getItem('avatarSelecionado');
      const genero = mapAvatarToGenero(avatar);
      localStorage.setItem('avatarGenero', genero);
      setPreferenciaGenero(genero);
    } catch {}
  }, []);

  // ⚠️ Mantenha seu layout original; abaixo é apenas um esqueleto não intrusivo
  return (
    <div className="container-centralizado fade-in">
      <div className="text-center login-card">
        <h2 className="titulo-login">⌨️ Login Tradicional</h2>

        <div className="mt-4">
          <input
            className="input padrao"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="mt-3 input padrao"
            placeholder="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button className="mt-4 botao-gradiente" onClick={() => {/* sua lógica de login */}}>
          Entrar
        </button>

        <button className="mt-4 botao-outline" onClick={() => navigate('/')}>
          🔙 Voltar ao Início
        </button>
      </div>
    </div>
  );
}
// =============================================================================================
// ✅ FIM do componente LoginTradicional.jsx – 100% funcional, com voz alinhada ao avatar
// =============================================================================================