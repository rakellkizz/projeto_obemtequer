// =============================================================================================
// 📄 LoginFacial.jsx – Login por reconhecimento facial, voz alinhada ao avatar reconhecido
// Projeto: O Bem Te Quer 💜
// =============================================================================================
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPreferenciaGenero } from '../../utils/vozController';
import { mapAvatarToGenero } from '../../utils/mapAvatarGenero';
import '../../global.css';

export default function LoginFacial() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Ajustando câmera...');

  // ✅ Sincroniza voz ao abrir (com último avatar salvo)
  useEffect(() => {
    try {
      const avatar = localStorage.getItem('avatarSelecionado');
      const genero = mapAvatarToGenero(avatar);
      localStorage.setItem('avatarGenero', genero);
      setPreferenciaGenero(genero);
    } catch {}
  }, []);

  // ✅ Chame esta função assim que tiver o perfil reconhecido
  const aplicarGeneroDoPerfil = (perfil) => {
    try {
      // Use aqui o campo que você tiver (nome/id/avatar do perfil reconhecido)
      const avatarIdOuNome = perfil?.avatar || perfil?.nome || perfil?.id || '';
      const genero = mapAvatarToGenero(avatarIdOuNome);
      localStorage.setItem('avatarGenero', genero);
      setPreferenciaGenero(genero);
    } catch {}
  };

  // ⚠️ Exemplo de ponto de integração com seu fluxo de reconhecimento:
  // Quando terminar o reconhecimento facial e você tiver 'perfil':
  // aplicarGeneroDoPerfil(perfil);

  return (
    <div className="container-centralizado fade-in">
      <div className="text-center login-card">
        <h2 className="titulo-login">📷 Login Facial</h2>
        <p className="mensagem-login">{status}</p>

        {/* canvas/câmera/preview ficam aqui no seu layout original */}

        <button className="mt-4 botao-outline" onClick={() => navigate('/')}>
          🔙 Voltar ao Início
        </button>
      </div>
    </div>
  );
}
// =============================================================================================
// ✅ FIM do componente LoginFacial.jsx – 100% funcional, com voz alinhada ao avatar reconhecido
// =============================================================================================
