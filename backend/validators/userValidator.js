// Importa a função "body" do express-validator.
// Usamos "body" para validar os campos enviados no corpo (body) da requisição HTTP.
const { body } = require('express-validator');

/**
 * Valida os dados enviados no cadastro de usuário.
 * Aqui definimos regras para os campos: nome, email e senha.
 */
const validarRegistro = [
  // Verifica se o campo 'nome' não está vazio
  body('nome')
    .notEmpty().withMessage('O nome é obrigatório'),

  // Verifica se o campo 'email' tem um formato válido
  body('email')
    .isEmail().withMessage('Informe um email válido'),

  // Verifica se o campo 'senha' tem pelo menos 6 caracteres
  body('senha')
    .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
];

/**
 * Valida os dados enviados no login do usuário.
 * Aqui exigimos apenas email válido e senha preenchida.
 */
const validarLogin = [
  // Verifica se o campo 'email' tem um formato válido
  body('email')
    .isEmail().withMessage('Informe um email válido'),

  // Verifica se o campo 'senha' não está vazio
  body('senha')
    .notEmpty().withMessage('A senha é obrigatória'),
];

// Exporta as duas listas de validação para serem usadas nas rotas
module.exports = {
  validarRegistro,
  validarLogin
};
