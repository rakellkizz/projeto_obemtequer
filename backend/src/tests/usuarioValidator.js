// Importação de bibliotecas necessárias
const request = require('supertest'); // Supertest permite fazer requisições HTTP de teste
const app = require('../../frontend/src/index'); // Importa o arquivo index.js onde a aplicação Express está configurada

// Descreve o conjunto de testes para a validação do cadastro de usuário
describe('Validação de Cadastro de Usuário', () => {

    // Teste 1: Verifica se o nome do usuário tem no mínimo 3 caracteres
    it('Deve retornar erro se o nome for menor que 3 caracteres', async () => {
        // Envia uma requisição POST para a rota de cadastro de usuários
        const res = await request(app)
            .post('/usuarios') // Caminho da rota
            .send({
                nome: 'Jo', // Nome inválido (menor que 3 caracteres)
                email: 'jo@example.com', // Email válido
                senha: 'senha123' // Senha válida
            });

        // Verifica se o código de status da resposta é 400 (erro de validação)
        expect(res.status).toBe(400);
        // Verifica se a mensagem de erro relacionada ao nome foi retornada
        expect(res.body.errors[0].msg).toBe('O nome deve ter no mínimo 3 caracteres.');
    });

    // Teste 2: Verifica se o email fornecido é válido
    it('Deve retornar erro se o email não for válido', async () => {
        const res = await request(app)
            .post('/usuarios')
            .send({
                nome: 'João Silva', // Nome válido
                email: 'jo@exemplo', // Email inválido
                senha: 'senha123' // Senha válida
            });

        expect(res.status).toBe(400); // Espera o erro 400
        expect(res.body.errors[0].msg).toBe('Por favor, forneça um email válido.'); // Mensagem de erro para email inválido
    });

    // Teste 3: Verifica se o cadastro é bem-sucedido quando todos os dados são válidos
    it('Deve passar na validação quando todos os campos forem válidos', async () => {
        const res = await request(app)
            .post('/usuarios')
            .send({
                nome: 'João Silva', // Nome válido
                email: 'joao.silva@example.com', // Email válido
                senha: 'Senha123' // Senha válida
            });

        // Verifica se o status da resposta é 200 (OK), indicando que o cadastro foi bem-sucedido
        expect(res.status).toBe(200);
        // Verifica se a resposta contém uma mensagem de sucesso
        expect(res.body).toHaveProperty('message', 'Cadastro realizado com sucesso');
    });
});
