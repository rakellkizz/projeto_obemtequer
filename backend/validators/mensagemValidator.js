// Importação das funções do express-validator
const { body, validationResult } = require('express-validator');

// Função que realiza a validação dos dados da mensagem
const mensagemValidator = [
    // Validação para o campo "conteudo" da mensagem
    body('conteudo')
        .isLength({ min: 5 }).withMessage('O conteúdo da mensagem deve ter pelo menos 5 caracteres.') // Verifica se o conteúdo tem no mínimo 5 caracteres
        .isLength({ max: 1000 }).withMessage('O conteúdo da mensagem não pode ultrapassar 1000 caracteres.') // Verifica se o conteúdo tem no máximo 1000 caracteres
        .notEmpty().withMessage('O conteúdo da mensagem é obrigatório.') // Verifica se o campo não está vazio
        .trim() // Remove espaços extras no início e no final da string
        .escape(), // Escapa caracteres especiais para prevenir injeção de código (XSS)
        
    // Validação para o campo "destinatario" (email)
    body('destinatario')
        .isEmail().withMessage('Por favor, forneça um email válido para o destinatário.') // Valida se o email do destinatário tem formato correto
        .notEmpty().withMessage('O email do destinatário é obrigatório.') // Verifica se o campo não está vazio
        .normalizeEmail(), // Normaliza o email (remove espaços e converte para minúsculas)

    // Validação para o campo "assunto" da mensagem
    body('assunto')
        .optional() // O campo "assunto" é opcional
        .isLength({ max: 200 }).withMessage('O assunto não pode ter mais de 200 caracteres.') // Se fornecido, o assunto deve ter no máximo 200 caracteres
        .trim() // Remove espaços extras
        .escape(), // Escapa caracteres especiais para prevenção de injeção

    // Middleware para capturar os erros após a validação
    (req, res, next) => {
        // Captura os erros de validação
        const errors = validationResult(req);

        // Se houver erros, envia a resposta com código 400 e os detalhes dos erros
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Se não houver erros, passa para o próximo middleware ou controlador
        next();
    }
];

module.exports = mensagemValidator;
