// ----------------------------------------------------------
// ARQUIVO: controllers/mensagemController.js
// ----------------------------------------------------------
// ✅ OBJETIVO:
// Controlar a lógica de criação e listagem de mensagens do chatbot.
// Aplica boas práticas com tratamento de erros centralizado usando createHttpError.
// ----------------------------------------------------------

const Mensagem = require('../models/Mensagem');                  // Modelo Mongoose para mensagens
const createHttpError = require('../utils/createHttpError');    // Utilitário para erros HTTP

/**
 * @desc Cria e salva uma nova mensagem no banco de dados
 * @route POST /api/mensagens
 * @access Público
 */
const criarMensagem = async (req, res, next) => {
  try {
    const { conteudo, autor, data } = req.body;

    // Validação básica (além dos validadores externos)
    if (!conteudo || !autor) {
      throw createHttpError(400, 'Conteúdo e autor são obrigatórios.');
    }

    const novaMensagem = new Mensagem({
      conteudo,
      autor,
      data: data || new Date()
    });

    await novaMensagem.save();
    res.status(201).json(novaMensagem);

  } catch (err) {
    next(err); // Encaminha para o middleware de erro global
  }
};

/**
 * @desc Retorna a lista de todas as mensagens salvas
 * @route GET /api/mensagens
 * @access Público
 */
const listarMensagens = async (req, res, next) => {
  try {
    const mensagens = await Mensagem.find().sort({ data: -1 });

    if (!mensagens || mensagens.length === 0) {
      throw createHttpError(404, 'Nenhuma mensagem encontrada.');
    }

    res.status(200).json(mensagens);
  } catch (err) {
    next(err); // Encaminha para o middleware de erro global
  }
};

module.exports = {
  criarMensagem,
  listarMensagens,
};
