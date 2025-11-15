// -------------------------------------------------------------
// ARQUIVO: controllers/userController.js
// -------------------------------------------------------------
// Controller responsável por ações de usuário:
// - Registro
// - Login
// - Busca por ID
// -------------------------------------------------------------

const bcrypt = require('bcryptjs');                           // Para criptografar senhas
const jwt = require('jsonwebtoken');                          // Para geração de tokens JWT
const createHttpError = require('../utils/createHttpError');  // Utilitário de erro HTTP

// Simulação temporária de "banco de dados"
const usuariosFake = []; // Exemplo: [{ id: '1', nome: 'Raquel', email: 'raquel@email.com', senhaHash: '...' }]

// Função auxiliar para gerar tokens
const gerarToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '1d' // Token válido por 1 dia
  });
};

/**
 * ---------------------------------------------------------
 * @desc    Registra um novo usuário
 * @route   POST /api/usuarios/registrar
 * @access  Público
 * ---------------------------------------------------------
 */
const registrarUsuario = async (req, res, next) => {
  try {
    const { nome, email, senha } = req.body;

    // Validação básica
    if (!nome || !email || !senha) {
      return next(createHttpError(400, 'Nome, email e senha são obrigatórios'));
    }

    // Verifica se o usuário já existe
    const jaExiste = usuariosFake.find(u => u.email === email);
    if (jaExiste) {
      return next(createHttpError(409, 'E-mail já registrado'));
    }

    // Cria um hash seguro da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Simula criação do usuário e adiciona ao "banco"
    const novoUsuario = {
      id: String(usuariosFake.length + 1),
      nome,
      email,
      senhaHash
    };
    usuariosFake.push(novoUsuario);

    // Gera token JWT
    const token = gerarToken(novoUsuario.id);

    res.status(201).json({
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      token
    });

  } catch (err) {
    next(err);
  }
};

/**
 * ---------------------------------------------------------
 * @desc    Realiza login do usuário
 * @route   POST /api/usuarios/login
 * @access  Público
 * ---------------------------------------------------------
 */
const loginUsuario = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    // Verificação de campos
    if (!email || !senha) {
      return next(createHttpError(400, 'E-mail e senha são obrigatórios'));
    }

    // Busca usuário no "banco"
    const usuario = usuariosFake.find(u => u.email === email);
    if (!usuario) {
      return next(createHttpError(401, 'Credenciais inválidas'));
    }

    // Verifica a senha com bcrypt
    const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);
    if (!senhaCorreta) {
      return next(createHttpError(401, 'Credenciais inválidas'));
    }

    // Gera token JWT
    const token = gerarToken(usuario.id);

    res.status(200).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      token
    });

  } catch (err) {
    next(err);
  }
};

/**
 * ---------------------------------------------------------
 * @desc    Retorna dados de um usuário por ID
 * @route   GET /api/usuarios/:id
 * @access  Público (exemplo)
 * ---------------------------------------------------------
 */
const buscarUsuarioPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = usuariosFake.find(u => u.id === id);

    if (!usuario) {
      return next(createHttpError(404, 'Usuário não encontrado'));
    }

    res.status(200).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    });

  } catch (err) {
    next(err);
  }
};

// -------------------------------------------------------------
// EXPORTAÇÃO DAS FUNÇÕES DO CONTROLLER
// -------------------------------------------------------------
module.exports = {
  registrarUsuario,
  loginUsuario,
  buscarUsuarioPorId
};
