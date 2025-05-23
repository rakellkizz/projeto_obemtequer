// Importa a função validationResult do express-validator.
// Essa função coleta os erros de validação que aconteceram nas requisições.
const { validationResult } = require('express-validator');

/**
 * Middleware que verifica se houve erros de validação
 * nos dados enviados na requisição.
 * Se houver, retorna os erros ao cliente.
 * Se não houver, chama o próximo middleware ou controller.
 */
const validarCampos = (req, res, next) => {
  // Captura os erros de validação da requisição atual
  const erros = validationResult(req);

  // Se houver erros (não está vazio)
  if (!erros.isEmpty()) {
    // Retorna status 400 (Bad Request) e envia os erros como array
    return res.status(400).json({ erros: erros.array() });
  }

  // Se não houver erros, continua para o próximo middleware/controller
  next();
};

// Exporta o middleware para ser usado nas rotas
module.exports = validarCampos;
