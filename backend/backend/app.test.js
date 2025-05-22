// ARQUIVO: tests/app.test.js
// Objetivo: Testes automatizados das rotas básicas da API
// Ferramentas: Jest + Supertest
// Autor(a): Raquel G. de Souza ✨

// Importa o Supertest para simular requisições HTTP no servidor
const request = require('supertest');

// Importa o app Express criado no backend
// ATENÇÃO: certifique-se de que o 'index.js' exporta o app (sem dar 'app.listen' diretamente)
const app = require('./index'); // Caminho relativo para o app principal

// Grupo de testes usando Jest
describe('✅ Testes básicos da API O Bem Te Quer', () => {

  // 🔹 Teste da rota raiz "/"
  test('GET / deve retornar mensagem de status com código 200', async () => {
    const res = await request(app).get('/'); // Simula GET na raiz
    expect(res.statusCode).toBe(200); // Espera resposta HTTP 200 (OK)
    expect(res.text).toBe('🌻 API do projeto O Bem Te Quer está online!');
  });

  // 🔹 Teste da rota de integração "/api/mensagem"
  test('GET /api/mensagem deve retornar JSON com campo "mensagem"', async () => {
    const res = await request(app).get('/api/mensagem'); // Simula GET na rota
    expect(res.statusCode).toBe(200); // Espera resposta HTTP 200
    expect(res.body).toHaveProperty('mensagem'); // Deve ter o campo "mensagem"
    expect(res.body.mensagem).toBe('Olá, React! Backend está funcionando 😎');
  });

});
