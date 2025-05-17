// ------------------------------
// ARQUIVO: mensagemValidator.js
// ------------------------------
// Middleware para validar os dados recebidos nas requisições que criam ou atualizam mensagens,
// garantindo que os campos obrigatórios estejam presentes e com formato correto.

// ------------------------------
// 1. IMPORTAÇÕES
// ------------------------------
const { body, validationResult } = require('express-validator');  
// 'body' para definir validações nos campos do corpo da requisição
// 'validationResult' para capturar e manipular erros gerados pelas validações

// ------------------------------
// 2. DEFINIÇÃO DO ARRAY DE VALIDAÇÕES
// ------------------------------
const mensagemValidator = [
  // ------------------------------
  // Validação do campo 'nome'
  // ------------------------------
  body('nome')
    .notEmpty()                                 // Garante que o campo não esteja vazio
    .withMessage('O nome é obrigatório.')       // Mensagem exibida se a validação falhar
    .isLength({ min: 2 })                        // Tamanho mínimo do nome (2 caracteres)
    .withMessage('O nome deve ter pelo menos 2 caracteres.')
    .isLength({ max: 100 })                      // Tamanho máximo (100 caracteres)
    .withMessage('O nome não pode ultrapassar 100 caracteres.')
    .trim()                                     // Remove espaços no início/fim da string
    .escape(),                                  // Escapa caracteres especiais para evitar injeção (XSS)

  // ------------------------------
  // Validação do campo 'email'
  // ------------------------------
  body('email')
    .notEmpty()
    .withMessage('O e-mail é obrigatório.')
    .isEmail()                                  // Valida formato de e-mail
    .withMessage('Por favor, forneça um e-mail válido.')
    .normalizeEmail(),                          // Normaliza o e-mail (ex: remove espaços, converte para minúsculas)

  // ------------------------------
  // Validação do campo 'mensagem'
  // ------------------------------
  body('mensagem')
    .notEmpty()
    .withMessage('O conteúdo da mensagem é obrigatório.')
    .isLength({ min: 5 })
    .withMessage('A mensagem deve ter pelo menos 5 caracteres.')
    .isLength({ max: 1000 })
    .withMessage('A mensagem não pode ultrapassar 1000 caracteres.')
    .trim()
    .escape(),

  // ------------------------------
  // Middleware final para capturar e retornar erros ao cliente
  // ------------------------------
  (req, res, next) => {
    const errors = validationResult(req);      // Extrai os erros do request após validação

    if (!errors.isEmpty()) {
      // Se houver erros, retorna HTTP 400 (Bad Request) com array de erros detalhados
      return res.status(400).json({ erros: errors.array() });
    }

    // Se não houver erros, passa o controle para o próximo middleware ou rota
    next();
  }
];

// ------------------------------
// 3. EXPORTAÇÃO
// ------------------------------
module.exports = mensagemValidator;
