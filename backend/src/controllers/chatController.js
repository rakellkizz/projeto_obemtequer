// ============================================================================================
// 📁 ARQUIVO: controllers/chatController.js
// DESCRIÇÃO: Controlador de mensagens com IA LOCAL empática e gratuita 💜
// - Recebe mensagens do frontend
// - Valida a entrada
// - Encaminha para o serviço local de IA responder com empatia
// - Retorna a resposta gerada
// ============================================================================================

import createHttpError from '../utils/createHttpError.js';              // ⚠️ Tratamento de erros customizado
import { responderIA_local } from '../services/iaLocalService.js';     // 🤖 Serviço de IA local

/**
 * 📌 processarMensagemIA
 * Rota: POST /api/chat
 * Corpo esperado: { mensagem: 'Texto do usuário' }
 * Retorno: { resposta: 'Texto emocional da IA local' }
 */
export const processarMensagemIA = async (req, res, next) => {
  try {
    const { mensagem } = req.body;

    // 🔍 Validação: garante que a mensagem seja um texto válido
    if (!mensagem || typeof mensagem !== 'string' || mensagem.trim() === '') {
      throw createHttpError(400, '⚠️ A mensagem é obrigatória e deve ser um texto válido.');
    }

    // 💡 Gera a resposta empática com base no conteúdo
    const resposta = responderIA_local(mensagem);

    // ✅ Retorna ao frontend com status 200
    res.status(200).json({ resposta });

  } catch (erro) {
    console.error('❌ Erro ao processar a mensagem na IA local:', erro.message || erro);

    // 🔁 Retorna fallback padrão mesmo em caso de erro
    res.status(200).json({
      resposta: '⚠️ Ocorreu um problema ao responder agora. Pode tentar de novo? 💜'
    });
  }
};
// ============================================================================================
// Fim do arquivo: controllers/chatController.js
// ============================================================================================
// ============================================================================================