// ============================================================================
// 📁 useAvatarSelecionado.js – Hook personalizado para salvar avatar escolhido
// Projeto: O Bem Te Quer 💜 – Avatar com persistência no localStorage
// ============================================================================

import { useState, useEffect } from 'react';

/**
 * 🎣 Hook que controla o avatar selecionado e salva no localStorage
 * @returns [avatarSelecionado, setAvatarSelecionado]
 */
export function useAvatarSelecionado() {
  // 📦 Lê o avatar salvo ao iniciar (ou usa 'victor' como padrão)
  const [avatarSelecionado, setAvatarSelecionado] = useState(() => {
    return localStorage.getItem('avatar_nome') || 'victor';
  });

  // 💾 Atualiza o localStorage sempre que o avatar mudar
  useEffect(() => {
    localStorage.setItem('avatar_nome', avatarSelecionado);
  }, [avatarSelecionado]);

  return [avatarSelecionado, setAvatarSelecionado];
}
