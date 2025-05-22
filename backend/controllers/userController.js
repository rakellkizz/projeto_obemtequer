// -------------------------------------------------------------
// ARQUIVO: controllers/userController.js
// -------------------------------------------------------------
// Controller responsável por lidar com ações relacionadas a usuários,
// como busca, criação, login, etc.
// Neste exemplo, usamos uma simulação simples com um array estático,
// mas futuramente pode ser substituído por integração com banco de dados.
// -------------------------------------------------------------

const createHttpError = require('../utils/createHttpError');

// Dados simulados para exemplo. Em produção, usar modelo com banco.
const usuariosFake = [
  { id: '1', nome: 'Raquel', email: 'raquel@email.com' }
];

/**
 * @desc Busca e retorna usuário pelo ID
 * @route GET /api/usuarios/:id
 * @access Público (exemplo)
 * 
 * @param {object} req - Objeto da requisição Express
 * @param {object} res - Objeto da resposta Express
 * @param {function} next - Função para middleware de erro
 */
const buscarUsuarioPorId = async (req, res, next) => {
  try {
    // Obtém o id da URL via params
    const { id } = req.params;

    // Busca o usuário no array simulado pelo id
    const usuario = usuariosFake.find(u => u.id === id);

    // Caso usuário não exista, retorna erro 404
    if (!usuario) {
      return next(createHttpError(404, 'Usuário não encontrado'));
    }

    // Usuário encontrado, retorna status 200 com dados JSON
    res.status(200).json(usuario);

  } catch (err) {
    // Caso ocorra erro inesperado, passa para middleware de erro
    next(err);
  }
};

// Exporta as funções para uso nas rotas
module.exports = {
  buscarUsuarioPorId,
};
