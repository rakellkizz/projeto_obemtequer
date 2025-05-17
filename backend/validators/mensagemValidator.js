// ------------------------------
// ARQUIVO: mensagemValidator.js
// ------------------------------
// Valida os dados recebidos para criação de uma mensagem

const { body, validationResult } = require('express-validator');

// ------------------------------
// FUNÇÃO DE VALIDAÇÃO DAS MENSAGENS
// ------------------------------
const mensagemValidator = [
  // ------------------------------
  // Validação para o campo "nome"
  // ------------------------------
  body('nome')
    .notEmpty().withMessage('O nome é obrigatório.') // Verifica se o campo não está vazio
    .isLength({ min: 2 }).withMessage('O nome deve ter pelo menos 2 caracteres.') // Verifica tamanho mínimo
    .isLength({ max: 100 }).withMessage('O nome não pode ultrapassar 100 caracteres.') // Verifica tamanho máximo
    .trim() // Remove espaços extras no início e no final da string
    .escape(), // Escapa caracteres especiais para prevenir injeção de código (XSS)

  // ------------------------------
  // Validação para o campo "email"
  // ------------------------------
  body('email')
    .notEmpty().withMessage('O e-mail é obrigatório.') // Verifica se o campo não está vazio
    .isEmail().withMessage('Por favor, forneça um e-mail válido.') // Valida formato de email
    .normalizeEmail(), // Normaliza o email (remove espaços e converte para minúsculas)

  // ------------------------------
  // Validação para o campo "mensagem"
  // ------------------------------
  body('mensagem')
    .notEmpty().withMessage('O conteúdo da mensagem é obrigatório.') // Verifica se o campo não está vazio
    .isLength({ min: 5 }).withMessage('A mensagem deve ter pelo menos 5 caracteres.') // Verifica tamanho mínimo
    .isLength({ max: 1000 }).withMessage('A mensagem não pode ultrapassar 1000 caracteres.') // Verifica tamanho máximo
    .trim() // Remove espaços extras
    .escape(), // Escapa caracteres especiais para prevenção de injeção

  // ------------------------------
  // Middleware para capturar os erros após a validação
  // ------------------------------
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() }); // Retorna os erros ao frontend
    }

    next(); // Passa para o próximo middleware ou rota
  }
];

module.exports = mensagemValidator;
