// =======================================================================================
// 📁 ARQUIVO: validators/mensagemValidator.js
// DESCRIÇÃO: Validação dos campos da mensagem enviada via formulário ou chat.
// Garante que nome, e-mail e conteúdo estejam válidos e seguros contra ataques XSS.
// =======================================================================================

import { body, validationResult } from 'express-validator'; // 🧰 Validação robusta para Express

const mensagemValidator = [
  // 📌 Validação do campo 'nome'
  body('nome')
    .trim() // 🔍 Remove espaços antes/depois
    .escape() // 🛡️ Protege contra XSS
    .notEmpty().withMessage('O nome é obrigatório.')
    .isLength({ min: 2 }).withMessage('O nome deve ter pelo menos 2 caracteres.')
    .isLength({ max: 100 }).withMessage('O nome não pode ultrapassar 100 caracteres.'),

  // 📌 Validação do campo 'email'
  body('email')
    .trim()
    .normalizeEmail() // 📬 Padroniza (caixa alta, espaços, etc)
    .notEmpty().withMessage('O e-mail é obrigatório.')
    .isEmail().withMessage('Por favor, forneça um e-mail válido.'),

  // 📌 Validação do campo 'mensagem'
  body('mensagem')
    .trim()
    .escape() // 🛡️ Protege contra inserções HTML/script
    .notEmpty().withMessage('O conteúdo da mensagem é obrigatório.')
    .isLength({ min: 5 }).withMessage('A mensagem deve ter pelo menos 5 caracteres.')
    .isLength({ max: 1000 }).withMessage('A mensagem não pode ultrapassar 1000 caracteres.'),

  // 📌 Middleware final: coleta os erros e responde, se houver
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }
    next(); // ✅ Nenhum erro? Segue para o próximo middleware/controller
  }
];

// ✅ Exporta o validador como middleware padrão
export default mensagemValidator;
