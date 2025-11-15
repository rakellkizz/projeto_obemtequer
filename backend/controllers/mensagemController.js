// =====================================================================================
// 📁 ARQUIVO: controllers/mensagemController.js
// DESCRIÇÃO: Controlador responsável por gerenciar mensagens trocadas com o chatbot
//            Inclui criação e listagem de mensagens com acesso ao MongoDB (Mongoose)
// =====================================================================================

// 📦 Importa o modelo da mensagem (Mongoose)
const Mensagem = require('../models/Mensagem');

// 🔧 Importa função para erros HTTP personalizados
const createHttpError = require('../utils/createHttpError');

/**
 * =====================================================================================
 * @função criarMensagem
 * @rota   POST /api/mensagens
 * @desc   Cria e armazena uma nova mensagem no banco MongoDB
 * @acesso Público
 * =====================================================================================
 */
const criarMensagem = async (req, res, next) => {
  try {
    const { conteudo, autor, data } = req.body;

    // 🚨 Validação mínima dos campos obrigatórios
    if (!conteudo || !autor) {
      throw createHttpError(400, '❗ Campos obrigatórios ausentes: "conteúdo" e "autor"');
    }

    // 🧱 Cria instância do modelo com os dados recebidos
    const novaMensagem = new Mensagem({
      conteudo: conteudo.trim(), // Remove espaços em branco desnecessários
      autor: autor.trim(),
      data: data || new Date(), // Usa data atual se não for fornecida
    });

    // 💾 Salva no MongoDB
    await novaMensagem.save();

    // ✅ Retorna resposta com status de criação
    res.status(201).json(novaMensagem);

  } catch (err) {
    // ❌ Encaminha erros para o middleware global
    next(err);
  }
};

/**
 * =====================================================================================
 * @função listarMensagens
 * @rota   GET /api/mensagens
 * @desc   Lista todas as mensagens armazenadas, da mais recente para a mais antiga
 * @acesso Público
 * =====================================================================================
 */
const listarMensagens = async (req, res, next) => {
  try {
    // 🔄 Busca todas as mensagens ordenadas por data decrescente
    const mensagens = await Mensagem.find().sort({ data: -1 });

    // ⚠️ Se não houver nenhuma, lança erro 404
    if (!mensagens || mensagens.length === 0) {
      throw createHttpError(404, '📭 Nenhuma mensagem encontrada.');
    }

    // ✅ Retorna lista das mensagens encontradas
    res.status(200).json(mensagens);

  } catch (err) {
    next(err); // ❌ Encaminha erro para tratamento centralizado
  }
};

// =====================================================================================
// EXPORTAÇÃO DAS FUNÇÕES DO CONTROLLER
// =====================================================================================
module.exports = {
  criarMensagem,
  listarMensagens,
};
