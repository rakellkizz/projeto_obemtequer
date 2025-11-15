// ========================================================================================
// 📄 chat.js – Rota da IA com uso de variável do .env para definir modelo padrão
// Projeto: O Bem Te Quer 💜
// ========================================================================================

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { mensagem } = req.body;

  if (!mensagem) {
    return res.status(400).json({ erro: 'Mensagem não fornecida' });
  }

  // 🌟 Usa modelo do .env como padrão, ou o enviado no body
  const modelo = process.env.MODELO_PADRAO || req.body.modelo || 'openai';

  try {
    let resposta = '';

    if (modelo === 'openai') {
      // 🔮 Simula resposta da OpenAI
      resposta = `🔮 (Resposta simulada da OpenAI para: "${mensagem}")`;
    } else if (modelo === 'gemini') {
      // 🌟 Simula resposta da Gemini
      resposta = `🌟 (Resposta simulada do Gemini para: "${mensagem}")`;
    } else {
      return res.status(400).json({ erro: 'Modelo inválido' });
    }

    res.status(200).json({ resposta });
  } catch (error) {
    console.error('❌ Erro ao processar mensagem da IA:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}
