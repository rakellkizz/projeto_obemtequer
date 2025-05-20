// -------------------------------------------------------------
// ARQUIVO: controllers/userController.js
// -------------------------------------------------------------
// Controller responsável por lidar com ações relacionadas a usuários,
// como criação, listagem, login, etc.
// -------------------------------------------------------------

const createHttpError = require('../utils/createHttpError');

// Simulação temporária (você pode depois usar um modelo Mongoose real)
const usuariosFake = [
  { id: '1', nome: 'Raquel', email: 'raquel@email.com' }
];

/**
 * @desc Retorna usuário por ID
 * @route GET /api/usuarios/:id
 * @access Público (exemplo)
 */
const buscarUsuarioPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = usuariosFake.find(u => u.id === id);

    if (!usuario) {
      return next(createHttpError(404, 'Usuário não encontrado'));
    }

    res.status(200).json(usuario);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  buscarUsuarioPorId,
};
