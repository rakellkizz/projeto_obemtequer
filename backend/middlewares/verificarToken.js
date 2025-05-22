// -------------------------------------------
// ARQUIVO: middleware/verificarToken.js
// -------------------------------------------

// Importa a biblioteca 'jsonwebtoken' para verificar tokens JWT
const jwt = require('jsonwebtoken');

// Importa a lib 'http-errors' para criar erros HTTP padronizados
const createHttpError = require('http-errors');

// Função middleware que será usada para proteger rotas
const verificarToken = (req, res, next) => {
  // Captura o cabeçalho de autorização enviado na requisição
  const authHeader = req.headers.authorization;

  // Verifica se o cabeçalho está presente e começa com "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Se não estiver, retorna erro 401 (Não autorizado)
    return next(createHttpError(401, 'Token não fornecido ou malformado'));
  }

  // Extrai apenas o token da string (remove o "Bearer ")
  const token = authHeader.split(' ')[1];

  try {
    // Verifica se o token é válido usando a chave secreta definida no .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Se o token for válido, salva o ID do usuário decodificado na requisição
    req.usuarioId = decoded.id;

    // Continua para a próxima função (normalmente o controller da rota)
    next();
  } catch (err) {
    // Se houver erro ao verificar o token, retorna erro 401
    return next(createHttpError(401, 'Token inválido ou expirado'));
  }
};

// Exporta o middleware para ser usado em outras partes do projeto
module.exports = verificarToken;
