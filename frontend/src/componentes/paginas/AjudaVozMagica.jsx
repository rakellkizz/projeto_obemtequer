// =============================================================================================
// 📄 AjudaVozMagica.jsx – Orientações para a Palavra Mágica (acessível por voz)
// Projeto: O Bem Te Quer 💜
// =============================================================================================
import React, { useEffect } from 'react';
import { setPreferenciaGenero } from '../../utils/vozController';
import { mapAvatarToGenero } from '../../utils/mapAvatarGenero';
import '../../global.css';

export default function AjudaVozMagica() {

  // ✅ Sincroniza voz (gênero) com avatar ao abrir a tela
  useEffect(() => {
    try {
      const avatar = localStorage.getItem('avatarSelecionado');
      const genero = mapAvatarToGenero(avatar);
      localStorage.setItem('avatarGenero', genero);
      setPreferenciaGenero(genero);
    } catch {}
  }, []);

  // ⚠️ Mantém o que você já tinha de layout/ajuda aqui:
  return (
    <div className="container-centralizado fade-in">
      <div className="text-center login-card">
        <h2 className="titulo-login">✨ Ajuda do Login por Voz</h2>
        <p className="mensagem-login">
          Aqui você encontra orientações para configurar e usar sua Palavra Mágica.
        </p>
        {/* Coloque aqui seus cards/itens de instrução atuais */}
      </div>
    </div>
  );
}
