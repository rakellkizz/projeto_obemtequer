// ======================================================================================
// 📁 avatarUtils.js – Utilitário para salvar e carregar avatar selecionado pelo usuário
// Projeto: O Bem Te Quer 💜 – Gerencia o nome do avatar no localStorage
// ======================================================================================

/**
 * 🔐 Salva o nome do avatar escolhido no localStorage
 * @param {string} nomeAvatar - Nome do avatar (ex: 'victor', 'camila', etc)
 */
export function salvarAvatarLocal(nomeAvatar) {
  try {
    localStorage.setItem('avatar_nome', nomeAvatar);
  } catch (erro) {
    console.error('Erro ao salvar avatar:', erro);
  }
}

/**
 * 🔍 Recupera o nome do avatar salvo no localStorage
 * @returns {string|null} nome do avatar ou null se não existir
 */
export function obterAvatarLocal() {
  try {
    return localStorage.getItem('avatar_nome') || 'victor'; // Padrão: Victor
  } catch (erro) {
    console.error('Erro ao carregar avatar:', erro);
    return 'victor';
  }
}
