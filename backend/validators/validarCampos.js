// =========================================================================================
// 📁 ARQUIVO: validators/validarCampos.js
// DESCRIÇÃO: Middleware para tratar erros de validação vindos do express-validator
// Se houver erro nos dados do body da requisição, envia resposta com status 400.
// =========================================================================================

import { validationResult } from 'express-validator'; // 🛠️ Coleta os erros acumulados

/**
 * Middleware que verifica se houve erros de validação na requisição
 * Se houver, responde com status 400 e lista os erros
 * Se estiver tudo certo, segue para o próximo middleware/controller
 */
const validarCampos = (req, res, next) => {
  const erros = validationResult(req); // 🔍 Coleta erros da validação anterior

  if (!erros.isEmpty()) {
    // 🚫 Se houver erros, retorna com status 400 (Bad Request)
    return res.status(400).json({ erros: erros.array() });
  }

  next(); // ✅ Nenhum erro? Continua o fluxo normalmente
};

export default validarCampos;
