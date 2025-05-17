// ------------------------------
// ARQUIVO PRINCIPAL: index.js (BACKEND)
// ------------------------------
// Inicializa a API, conecta ao MongoDB e aplica rotas e middlewares.

// ------------------------------
// 1. CONFIGURAÇÃO DE VARIÁVEIS DE AMBIENTE (.env)
// ------------------------------
require('dotenv').config();  // Carrega variáveis de ambiente do arquivo .env

// ------------------------------
// 2. IMPORTAÇÃO DE MÓDULOS
// ------------------------------
const express = require('express');                    // Framework web para rotas e APIs
const cors = require('cors');                          // Middleware para permitir requisições de outros domínios
const connectDB = require('./config/db');              // Função personalizada de conexão com o MongoDB
const mensagemRoutes = require('./routes/mensagemRoutes');  // Rotas para manipulação de mensagens
const userRoutes = require('./routes/userRoutes');     // ✅ Rotas para cadastro, login e autenticação de usuários
const errorMiddleware = require('./middlewares/errorMiddleware'); // Middleware de tratamento de erros

// ------------------------------
// 3. CONFIGURAÇÃO DO APP
// ------------------------------
const app = express();
const PORT = process.env.PORT || 5000;                 // Define a porta do servidor

// ------------------------------
// 4. CONEXÃO COM BANCO DE DADOS
// ------------------------------
connectDB(); // Conecta com o MongoDB Atlas usando a URI do arquivo .env

// ------------------------------
// 5. MIDDLEWARES GLOBAIS
// ------------------------------
app.use(cors());                    // Habilita o CORS para permitir frontend acessar a API
app.use(express.json());           // Permite o Express interpretar requisições com JSON

// ------------------------------
// 6. ROTAS DA API
// ------------------------------

// Rota raiz (GET) apenas para teste rápido
app.get('/', (req, res) => {
  res.send('🌻 API do projeto O Bem Te Quer está online!');
});

// ✅ Nova rota teste para conexão com o frontend
app.get('/api/mensagem', (req, res) => {
  res.json({ mensagem: 'Olá, React! Backend está funcionando 😎' });
});

// Rota para funcionalidades de mensagens
app.use('/api/mensagens', mensagemRoutes);

// ✅ Rota para funcionalidades de usuários (cadastro, login, etc.)
app.use('/api/usuarios', userRoutes);

// ------------------------------
// 7. MIDDLEWARE DE ERRO GLOBAL
// ------------------------------
// Captura e trata erros lançados pelas rotas e controladores
app.use(errorMiddleware);

// ------------------------------
// 8. INICIALIZAÇÃO DO SERVIDOR
// ------------------------------
// Coloca a API para rodar na porta definida
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
