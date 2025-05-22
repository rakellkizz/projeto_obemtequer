// ----------------------------------------
// CONTROLLER: iaController.js
// ----------------------------------------
// Responsável por receber as requisições HTTP da rota de IA,
// validar os dados de entrada, e delegar o processamento da
// geração de respostas para o serviço openaiService.js.
// Também trata erros e envia respostas formatadas.
// ----------------------------------------

const createError = require('http-errors');          // Para gerar erros HTTP padronizados
const openaiService = require('../services/openaiService'); // Serviço que interage com a OpenAI

/**
 * @desc   Controlador que recebe o prompt do usuário e retorna a resposta gerada pela IA
 * @route  POST /api/ia
 * @access Pode ser público ou protegido, dependendo da configuração do middleware de segurança
 */
const gerarRespostaIA = async (req, res, next) => {
  try {
    // Extrai o prompt do corpo da requisição
    const { prompt } = req.body;

    // Validação básica: verifica se o prompt é uma string não vazia
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      // Se inválido, lança erro 400 Bad Request com mensagem clara
      throw createError(400, '❗ Prompt inválido. Envie um texto no formato correto.');
    }

    // Chama o serviço que comunica com a OpenAI para gerar a resposta
    const resposta = await openaiService.gerarResposta(prompt);

    // Retorna resposta bem-sucedida com JSON estruturado
    res.status(200).json({
      sucesso: true,
      resposta,
    });

  } catch (erro) {
    // Passa o erro para o middleware global de tratamento de erros
    next(erro);
  }
};

// Exporta os métodos do controller para serem usados nas rotas
module.exports = {
  gerarRespostaIA,
};
