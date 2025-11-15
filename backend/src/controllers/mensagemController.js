// =======================================================================================
// 📁 ARQUIVO: controllers/mensagemController.js
// DESCRIÇÃO: Controlador das mensagens trocadas com o chatbot
// - Salva mensagens no MongoDB
// - Lista mensagens com ordenação
// - Utiliza tratamento centralizado de erros com createHttpError
// =======================================================================================

const Mensagem = require('../models/Mensagem');               // 🧩 Modelo Mongoose de mensagem
const createHttpError = require('../utils/createHttpError'); // ⚠️ Utilitário de erro customizado

// =======================================================================================
// 📌 POST /api/mensagens – Criação de nova mensagem
// =======================================================================================
/**
 * Cria e armazena uma nova mensagem no banco de dados
 *
 * @route   POST /api/mensagens
 * @access  Público
 */
const criarMensagem = async (req, res, next) => {
  try {
    const { conteudo, autor, data } = req.body;

    // ✅ Validação básica: conteúdo e autor obrigatórios
    if (!conteudo || !autor) {
      throw createHttpError(400, 'Conteúdo e autor são obrigatórios.');
    }

    // 🏗️ Instancia nova mensagem com fallback para data atual
    const novaMensagem = new Mensagem({
      conteudo,
      autor,
      data: data || new Date()
    });

    await novaMensagem.save(); // 💾 Salva no MongoDB

    res.status(201).json(novaMensagem); // ✅ Retorna com status de criado

  } catch (err) {
    next(err); // 🔁 Envia erro para o middleware global
  }
};

// =======================================================================================
// 📌 GET /api/mensagens – Listagem de mensagens salvas
// =======================================================================================
/**
 * Lista todas as mensagens armazenadas, ordenadas da mais recente para a mais antiga
 *
 * @route   GET /api/mensagens
 * @access  Público
 */
const listarMensagens = async (req, res, next) => {
  try {
    const mensagens = await Mensagem.find().sort({ data: -1 }); // 🕒 Mais recente primeiro

    if (!mensagens || mensagens.length === 0) {
      throw createHttpError(404, 'Nenhuma mensagem encontrada.');
    }

    res.status(200).json(mensagens); // ✅ Sucesso com lista de mensagens

  } catch (err) {
    next(err); // 🔁 Tratamento centralizado
  }
};

// ✅ Exporta as funções do controlador
module.exports = {
  criarMensagem,
  listarMensagens,
};
