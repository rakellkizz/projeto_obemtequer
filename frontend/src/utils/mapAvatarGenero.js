// =============================================================================================
// 📄 mapAvatarGenero.js – Mapeia avatar para 'feminino' ou 'masculino'
// =============================================================================================
export function mapAvatarToGenero(avatarNomeOuId) {
  const femininos = ['ana','sofia','maria','luiza','avatar_f','feminino','she','ela'];
  const s = String(avatarNomeOuId || '').toLowerCase();
  return femininos.some(x => s.includes(x)) ? 'feminino' : 'masculino';
}
// =============================================================================================
// FIM – mapAvatarGenero.js
// =============================================================================================
