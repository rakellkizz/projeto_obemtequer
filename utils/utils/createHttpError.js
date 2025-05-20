const createHttpError = require('../utils/createHttpError');

router.get('/usuario-secreto', (req, res, next) => {
  const autorizado = false;

  if (!autorizado) {
    return next(createHttpError(401, 'Acesso não autorizado'));
  }

  res.json({ mensagem: 'Você está logado!' });
});
