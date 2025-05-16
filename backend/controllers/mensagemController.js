// controllers/mensagemController.js

const Mensagem = require('../models/Mensagem');

// Função para salvar uma nova mensagem
const criarMensagem = async (req, res) => {
  try {
    const novaMensagem = new Mensagem(req.body);
    await novaMensagem.save();
    res.status(201).json(novaMensagem);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// Função para listar todas as mensagens
const listarMensagens = async (req, res) => {
  try {
    const mensagens = await Mensagem.find().sort({ data: -1 });
    res.status(200).json(mensagens);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

module.exports = {
  criarMensagem,
  listarMensagens,
};
