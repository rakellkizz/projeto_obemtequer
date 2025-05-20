// pages/api/chat/chat.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { mensagem, modelo } = req.body;

  if (!mensagem || !modelo) {
    return res.status(400).json({ erro: 'Mensagem ou modelo não fornecido' });
  }

  try {
    let resposta = '';

    if (modelo === 'openai') {
      // Lógica para chamar o ChatGPT (OpenAI)
      resposta = `🔮 (Resposta simulada da OpenAI para: "${mensagem}")`;
    } else if (modelo === 'gemini') {
      // Lógica para chamar o Gemini (Google)
      resposta = `🌟 (Resposta simulada do Gemini para: "${mensagem}")`;
    } else {
      return res.status(400).json({ erro: 'Modelo inválido' });
    }

    res.status(200).json({ resposta });
  } catch (error) {
    console.error('Erro ao processar:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}
