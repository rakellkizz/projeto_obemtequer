// ============================================================================
// 📁 avatarData.js – Dicionário centralizado dos avatares disponíveis
// Projeto: O Bem Te Quer 💜
// ============================================================================

// 📸 Importa imagens dos avatares disponíveis no sistema
import avatarVictor from '../assets/avatar/Victor.png';
import camila from '../assets/avatar/camila.png';
import luna from '../assets/avatar/luna.png';
import fernando from '../assets/avatar/fernando.png';
import mauricio from '../assets/avatar/mauricio.png';
import marcos from '../assets/avatar/marcos.png';

// 🧠 Dicionário com nome e imagem de cada avatar
const avatares = {
  victor: { nome: 'Dr. Victor', imagem: avatarVictor },
  camila: { nome: 'Dra. Camila', imagem: camila },
  luna: { nome: 'Dra. Luna', imagem: luna },
  fernando: { nome: 'Dr. Fernando', imagem: fernando },
  mauricio: { nome: 'Dr. Mauricio', imagem: mauricio },
  marcos: { nome: 'Dr. Marcos', imagem: marcos },
};

// 📤 Exporta para uso nos componentes (ex: Chatbot.jsx)
export default avatares;
