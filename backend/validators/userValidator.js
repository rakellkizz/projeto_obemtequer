// =======================================================================================
// 📁 ARQUIVO: validators/userValidator.js
// DESCRIÇÃO: Middleware de validação dos campos de cadastro e login de usuários
// Utiliza express-validator para checar, limpar e proteger os dados enviados no body
// =======================================================================================

import { check } from 'express-validator'; // 🛠️ Validador de campos do Express

// =======================================================================================
// 📌 Validação para registro de novo usuário (POST /api/usuarios/registrar)
// =======================================================================================
export const validarRegistro = [
  // 📌 Valida o nome
  check('nome')
    .trim() // Remove espaços desnecessários
    .notEmpty().withMessage('O nome é obrigatório')
    .isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres'),

  // 📌 Valida o e-mail
  check('email')
    .trim()
    .notEmpty().withMessage('O e-mail é obrigatório')
    .isEmail().withMessage('Informe um e-mail válido')
    .normalizeEmail(), // Padroniza o e-mail (ex: caixa alta, espaços, etc)

  // 📌 Valida a senha
  check('senha')
    .trim()
    .notEmpty().withMessage('A senha é obrigatória')
    .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
];

// =======================================================================================
// 📌 Validação para login de usuário (POST /api/usuarios/login)
// =======================================================================================
export const validarLogin = [
  // 📌 Valida o e-mail
  check('email')
    .trim()
    .notEmpty().withMessage('O e-mail é obrigatório para login')
    .isEmail().withMessage('E-mail inválido')
    .normalizeEmail(),

  // 📌 Valida a senha
  check('senha')
    .trim()
    .notEmpty().withMessage('A senha é obrigatória para login')
];
