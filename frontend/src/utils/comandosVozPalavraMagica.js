// ========================================================================================
// 📄 comandosVozPalavraMagica.js – Comandos de voz centralizados para palavra mágica 🧙
// Projeto: O Bem Te Quer 💜 – Centraliza e organiza os fluxos da palavra mágica por voz
// ========================================================================================

const comandosPalavraMagica = ({
  transcript,
  setEstado,
  setMensagem,
  falar,
  tentarNovamente,
  navegarParaConfigurar,
  navegarParaHistorico,
  navegarParaHome // 🆕 Nova função que vem do LoginAcessivel para ir até /home com transição
}) => {
  const comando = transcript.trim().toLowerCase();
  const palavraAtual = localStorage.getItem('palavraMagicaPersonalizada')?.toLowerCase() || 'o bem me quer';

  // 1️⃣ Palavra mágica correta
  if (comando === palavraAtual) {
    // 🧠 Atualiza histórico (no máximo 3 palavras)
    const historico = JSON.parse(localStorage.getItem('palavrasMagicasHistorico')) || [];
    const atualizado = [palavraAtual, ...historico.filter(p => p !== palavraAtual)].slice(0, 3);
    localStorage.setItem('palavrasMagicasHistorico', JSON.stringify(atualizado));

    falar('✨ Palavra mágica correta. Acessando o sistema.');
    setTimeout(() => {
      if (typeof navegarParaHome === 'function') {
        navegarParaHome(); // ✅ Usando navegação do React Router
      } else {
        window.location.href = '/home'; // fallback
      }
    }, 1500);
    return;
  }

  // 2️⃣ "Esqueci" → redirecionar para reconfigurar
  if (comando.includes('esqueci')) {
    falar('Tudo bem! Vamos configurar uma nova palavra mágica agora.');
    setTimeout(() => navegarParaConfigurar(), 1500);
    return;
  }

  // 3️⃣ "Mostrar histórico" → listar palavras anteriores
  if (comando.includes('mostrar histórico')) {
    const historico = JSON.parse(localStorage.getItem('palavrasMagicasHistorico')) || [];

    if (historico.length === 0) {
      falar('Você ainda não cadastrou nenhuma palavra mágica anterior.');
    } else {
      const lista = historico.join(', ');
      falar(`Suas palavras mágicas anteriores foram: ${lista}`);
    }
    return;
  }

  // 4️⃣ "Deletar palavra mágica"
  if (comando.includes('deletar palavra')) {
    localStorage.removeItem('palavraMagicaPersonalizada');
    falar('Palavra mágica deletada. Diga "esqueci" para cadastrar uma nova.');
    return;
  }

  // 5️⃣ Qualquer outro comando → tentativa incorreta
  tentarNovamente();
};

export default comandosPalavraMagica;
