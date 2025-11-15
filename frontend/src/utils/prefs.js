// Centraliza leitura/escrita no localStorage
export const getNomeUsuario = () => {
  try { return localStorage.getItem('nomeUsuario') || ''; } catch { return ''; }
};
export const setNomeUsuario = (nome) => {
  try { localStorage.setItem('nomeUsuario', String(nome || '').trim()); } catch {}
};

export const getAvatarSelecionado = () => {
  try { return localStorage.getItem('avatarSelecionado') || 'victor'; } catch { return 'victor'; }
};
export const setAvatarSelecionado = (id) => {
  try { localStorage.setItem('avatarSelecionado', String(id || 'victor')); } catch {}
};
