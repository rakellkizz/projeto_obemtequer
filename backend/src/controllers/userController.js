// ===================================================================================
// 📁 ARQUIVO: controllers/userController.js
// DESCRIÇÃO: Controlador principal de autenticação e usuários
// Utiliza MongoDB + Mongoose, bcrypt para senhas e JWT para autenticação
// ===================================================================================

import bcrypt from 'bcrypt';                   // 🔐 Criptografia de senhas
import jwt from 'jsonwebtoken';               // 🔑 Geração e verificação de token JWT
import dotenv from 'dotenv';                  // 🌱 Carrega variáveis de ambiente
dotenv.config();

import User from '../models/User.js';         // 📦 Modelo de usuário no MongoDB
import createHttpError from '../utils/createHttpError.js'; // 🎯 Função para lançar erros personalizados

// ===================================================================================
// 📌 GET /api/usuarios/:id – Buscar usuário por ID
// ===================================================================================
export const buscarUsuarioPorId = async (req, res, next) => {
  try {
    const { id } = req.params;

    // 🔍 Busca o usuário e remove o campo 'senha'
    const usuario = await User.findById(id).select('-senha');

    if (!usuario) {
      return next(createHttpError(404, 'Usuário não encontrado ⚠️'));
    }

    res.status(200).json(usuario);
  } catch (err) {
    next(err); // 🛠️ Delega erro ao middleware global
  }
};

// ===================================================================================
// 📌 POST /api/usuarios/registrar – Registrar novo usuário
// ===================================================================================
export const registrarUsuario = async (req, res, next) => {
  try {
    const { nome, email, senha, idade, tipoDeLogin, acessibilidade } = req.body;

    // 🧪 Validação básica
    if (!nome || !email || !senha) {
      return next(createHttpError(400, 'Nome, email e senha são obrigatórios ❗'));
    }

    // 📬 Verifica se o email já está em uso
    const existente = await User.findOne({ email });
    if (existente) {
      return next(createHttpError(409, 'Email já está em uso 🚫'));
    }

    // 🔐 Criptografa a senha antes de salvar
    const senhaCriptografada = await bcrypt.hash(senha, 10); // 10 = salt rounds

    // 🏗️ Cria e salva novo usuário
    const novoUsuario = new User({
      nome,
      email,
      senha: senhaCriptografada,
      idade,
      tipoDeLogin,
      acessibilidade
    });

    await novoUsuario.save();

    // 🧹 Remove a senha do objeto antes de retornar ao frontend
    const { senha: _, ...usuarioSemSenha } = novoUsuario.toObject();

    res.status(201).json({
      mensagem: 'Usuário registrado com sucesso! 🎉',
      usuario: usuarioSemSenha
    });
  } catch (err) {
    next(err);
  }
};

// ===================================================================================
// 📌 POST /api/usuarios/login – Login com verificação de senha e retorno de JWT
// ===================================================================================
export const loginUsuario = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    // 🔎 Validação básica
    if (!email || !senha) {
      return next(createHttpError(400, 'Email e senha são obrigatórios ❗'));
    }

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return next(createHttpError(401, 'Credenciais inválidas 🔒'));
    }

    // 🔐 Verifica se a senha bate com o hash armazenado
    const senhaConfere = await bcrypt.compare(senha, usuario.senha);
    if (!senhaConfere) {
      return next(createHttpError(401, 'Credenciais inválidas 🔒'));
    }

    // 🔑 Gera o token JWT com ID do usuário
    const token = jwt.sign(
      { id: usuario._id, role: usuario.role }, // Se quiser RBAC
      process.env.JWT_SECRET || 'segredo_super_secreto',
      { expiresIn: '2h' } // ⏳ Expira em 2 horas
    );

    const { senha: _, ...dados } = usuario.toObject(); // Remove senha antes de responder

    res.status(200).json({
      mensagem: 'Login realizado com sucesso! 🔑',
      token,
      usuario: dados
    });
  } catch (err) {
    next(err);
  }
};
