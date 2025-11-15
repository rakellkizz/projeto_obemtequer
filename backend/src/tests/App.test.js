// ===================================================================
// ARQUIVO: src/tests/app.test.js – Testes da API Express do backend
// ===================================================================

// Importa o Supertest para simular requisições HTTP
const request = require('supertest');

// Importa o app Express (sem .listen)
const app = require('../app');

// Grupo de testes com Jest
describe('✅ Testes da API O Bem Te Quer', () => {
  test('GET /api/mensagem deve responder com mensagem de boas-vindas', async () => {
    const res = await request(app).get('/api/mensagem');
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensagem');
    expect(res.body.mensagem).toMatch(/backend está funcionando/i);
  });
});
