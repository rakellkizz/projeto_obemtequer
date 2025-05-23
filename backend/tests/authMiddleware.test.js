// ------------------------------
// ARQUIVO: tests/authMiddleware.test.js
// ------------------------------
// Testes automatizados para o middleware de autenticação JWT.
// Utiliza Jest e Supertest para simular requisições à rota protegida.
// Garante que apenas usuários com token válido possam acessar.

// ------------------------------
// IMPORTAÇÕES ESSENCIAIS
// ------------------------------
const express = require('express');
const request = require('supertest'); // Para simular requisições HTTP
const jwt = require('jsonwebtoken');  // Para criar tokens fictícios nos testes
const verificarTokenJWT = require('../middlewares/authMiddleware'); // Middleware que será testado
require('dotenv').config(); // Carrega variáveis de ambiente do .env

// ------------------------------
// CONFIGURAÇÃO DO APP EXPRESS DE TESTE
// ------------------------------
const app = express();
app.use(express.json());

// Rota protegida para testar o middleware
app.get('/protegida', verificarTokenJWT, (req, res) => {
  res.status(200).json({
    mensagem: 'Acesso permitido',
    usuario: req.usuario, // middleware deve anexar `usuario` ao request
  });
});

// ------------------------------
// INÍCIO DA BATERIA DE TESTES
// ------------------------------
describe('Middleware verificarTokenJWT', () => {
  // Define o segredo do token (igual ao usado na aplicação real)
  const secret = process.env.JWT_SECRET || 'segredo_teste';

  // Gera um token válido com informações fictícias
  const tokenValido = jwt.sign({ id: '123', nome: 'Raquel' }, secret, { expiresIn: '1h' });

  // ------------------------------
  // CASO 1: Token ausente
  // ------------------------------
  test('Deve negar acesso se não enviar token', async () => {
    const res = await request(app).get('/protegida');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'Acesso negado: token ausente ou malformado.');
  });

  // ------------------------------
  // CASO 2: Token malformado (prefixo incorreto)
  // ------------------------------
  test('Deve negar acesso se enviar token malformado', async () => {
    const res = await request(app)
      .get('/protegida')
      .set('Authorization', 'Token errado'); // Prefixo incorreto

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'Acesso negado: token ausente ou malformado.');
  });

  // ------------------------------
  // CASO 3: Token inválido (estrutura certa, assinatura errada)
  // ------------------------------
  test('Deve negar acesso se enviar token inválido', async () => {
    const res = await request(app)
      .get('/protegida')
      .set('Authorization', 'Bearer tokeninvalido'); // Token forjado ou expirado

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('message', 'Token inválido ou expirado. Acesso negado.');
  });

  // ------------------------------
  // CASO 4: Token válido
  // ------------------------------
  test('Deve permitir acesso com token válido', async () => {
    const res = await request(app)
      .get('/protegida')
      .set('Authorization', `Bearer ${tokenValido}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensagem', 'Acesso permitido');
    expect(res.body.usuario).toHaveProperty('id', '123');
    expect(res.body.usuario).toHaveProperty('nome', 'Raquel');
  });
});

// ------------------------------
// FIM DOS TESTES
// ------------------------------
