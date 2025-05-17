// ------------------------------
// ARQUIVO: mensagemRoutes.js
// ------------------------------
// Define as rotas para manipulação das mensagens

const express = require('express'); // Framework Express
const router = express.Router();    // Instância do roteador do Express
const Mensagem = require('../models/Mensagem'); // Modelo de Mensagem, interage com o MongoDB
const validarMensagem = require('../validators/mensagemValidator'); // Validador dos campos
const { validationResult } = require('express-validator'); // Utilitário para capturar erros de validação

// ------------------------------
// ROTA POST PARA ENVIAR UMA NOVA MENSAGEM
// ------------------------------
router.post('/', validarMensagem, async (req, res) => {
  // ------------------------------
  // Verifica se houve erro nas validações
  // ------------------------------
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Retorna os erros ao frontend
  }

  try {
    // Cria uma nova mensagem com os dados recebidos no corpo da requisição
    const novaMensagem = new Mensagem(req.body);

    // Salva a nova mensagem no banco de dados MongoDB
    await novaMensagem.save();

    // Retorna a mensagem salva com status 201 (Created)
    res.status(201).json(novaMensagem);
  } catch (err) {
    // Caso ocorra um erro durante o processo de salvar a mensagem
    res.status(500).json({ erro: err.message }); // Retorna erro com status 500 (Internal Server Error)
  }
});

// ------------------------------
// ROTA GET PARA LISTAR TODAS AS MENSAGENS
// ------------------------------
router.get('/', async (req, res) => {
  try {
    // Busca todas as mensagens, ordenadas pela data (mais recentes primeiro)
    const mensagens = await Mensagem.find().sort({ data: -1 });

    // Retorna as mensagens encontradas com status 200 (OK)
    res.status(200).json(mensagens);
  } catch (err) {
    // Caso ocorra um erro durante a busca das mensagens
    res.status(500).json({ erro: err.message }); // Retorna erro com status 500 (Internal Server Error)
  }
});

// ------------------------------
// EXPORTAÇÃO DAS ROTAS PARA O ARQUIVO PRINCIPAL (index.js)
// ------------------------------
module.exports = router;
