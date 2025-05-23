// -------------------------------------------------------------
// ARQUIVO: controllers/userController.js
// -------------------------------------------------------------
// Controller responsável por lidar com ações relacionadas a usuários,
// como busca, registro e login.
// No exemplo abaixo, usamos um array em memória (usuariosFake) como
// banco de dados simulado. Em produção, substitua por integração com
// banco de dados real e modelos (como Mongoose, Sequelize etc).
// -------------------------------------------------------------

const createHttpError = require('../utils/createHttpError'); // Utilitário para criar erros HTTP personalizados
const bcrypt = require('bcryptjs'); // Biblioteca para criptografia de senhas
const jwt = require('jsonwebtoken'); // Biblioteca para gerar e verificar tokens JWT

// -------------------------------------------------------------
// Base de dados simulada em memória (em produção, usar banco real)
// -------------------------------------------------------------
const usuariosFake = [
  { id: '1', nome: 'Raquel', email: 'raquel@email.com', senha: bcrypt.hashSync('123456', 8) }
];

// -------------------------------------------------------------
// @desc    Busca e retorna um usuário pelo ID
// @route   GET /api/usuarios/:id
// @access  Público (apenas exemplo, poderia ser privado com token)
// -------------------------------------------------------------
const buscarUsuarioPorId = async (req, res, next) => {
  try {
    const { id } = req.params; // Pega o ID da rota
    const usuario = usuariosFake.find(u => u.id === id); // Procura o usuário pelo ID

    if (!usuario) {
      // Se não encontrar, lança erro 404
      return next(createHttpError(404, 'Usuário não encontrado'));
    }

    // Remove a senha antes de retornar os dados
    const { senha, ...dadosUsuario } = usuario;
    res.status(200).json(dadosUsuario); // Retorna o usuário sem a senha
  } catch (err) {
    next(err); // Envia o erro para o middleware de tratamento
  }
};

// -------------------------------------------------------------
// @desc    Registra um novo usuário
// @route   POST /api/usuarios/register
// @access  Público
// -------------------------------------------------------------
const registrarUsuario = async (req, res, next) => {
  try {
    const { nome, email, senha } = req.body; // Extrai dados da requisição

    // Verifica se todos os campos foram preenchidos
    if (!nome || !email || !senha) {
      return next(createHttpError(400, 'Nome, email e senha são obrigatórios'));
    }

    // Verifica se o email já está cadastrado
    const existente = usuariosFake.find(u => u.email === email);
    if (existente) {
      return next(createHttpError(400, 'Email já está em uso'));
    }

    // Criptografa a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Cria novo usuário com ID incremental
    const novoUsuario = {
      id: String(usuariosFake.length + 1),
      nome,
      email,
      senha: senhaCriptografada
    };

    // Adiciona o novo usuário à "base"
    usuariosFake.push(novoUsuario);

    // Remove a senha antes de retornar
    const { senha: _, ...usuarioSemSenha } = novoUsuario;

    res.status(201).json({
      mensagem: 'Usuário registrado com sucesso',
      usuario: usuarioSemSenha
    });
  } catch (err) {
    next(err);
  }
};

// -------------------------------------------------------------
// @desc    Realiza login do usuário
// @route   POST /api/usuarios/login
// @access  Público
// -------------------------------------------------------------
const loginUsuario = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    // Verifica se os campos foram preenchidos
    if (!email || !senha) {
      return next(createHttpError(400, 'Email e senha são obrigatórios'));
    }

    // Busca o usuário pelo email
    const usuario = usuariosFake.find(u => u.email === email);
    if (!usuario) {
      return next(createHttpError(401, 'Credenciais inválidas'));
    }

    // Compara a senha digitada com a senha criptografada
    const senhaConfere = await bcrypt.compare(senha, usuario.senha);
    if (!senhaConfere) {
      return next(createHttpError(401, 'Credenciais inválidas'));
    }

    // Gera o token JWT com ID do usuário
    const token = jwt.sign(
      { id: usuario.id }, // Payload
      'seu_segredo_jwt',   // Segredo para assinar o token (usar variáveis de ambiente!)
      { expiresIn: '1h' }  // Expiração do token
    );

    // Retorna o token e dados básicos do usuário
    res.status(200).json({
      mensagem: 'Login realizado com sucesso',
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (err) {
    next(err);
  }
};

// -------------------------------------------------------------
// Exporta os métodos para uso em rotas
// -------------------------------------------------------------
module.exports = {
  buscarUsuarioPorId,
  registrarUsuario,
  loginUsuario
};
