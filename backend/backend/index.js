// ------------------------------
// ARQUIVO PRINCIPAL: index.js (BACKEND)
// ------------------------------
// Configuração da API Express, conexão com MongoDB,
// registro de rotas, middlewares de segurança, CORS e tratamento de erros.

// 1. CARREGAMENTO DE VARIÁVEIS DE AMBIENTE
require('dotenv').config(); // Carrega variáveis do arquivo .env

// 2. IMPORTAÇÃO DE DEPENDÊNCIAS
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db'); // 🔗 Conexão com MongoDB

// Importação de rotas
const mensagemRoutes = require('./routes/mensagemRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

const errorMiddleware = require('./middlewares/errorMiddleware'); // Tratamento global de erros

// 3. INICIALIZA A APLICAÇÃO EXPRESS
const app = express();

// 🔌 Conecta ao banco de dados
connectDB();

// 4. MIDDLEWARES DE SEGURANÇA E CONFIGURAÇÕES GERAIS

app.use(helmet()); // Protege cabeçalhos HTTP

// Limita 100 requisições por IP a cada 15 minutos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: '🚫 Limite de requisições excedido. Tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Configuração CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json()); // Habilita parsing de JSON

// 5. ROTAS DA API

// Rota básica de verificação da API
app.get('/', (req, res) => {
  res.send('🌻 API do projeto O Bem Te Quer está online!');
});

// Rota de teste simples
app.get('/api/mensagem', (req, res) => {
  res.json({ mensagem: 'Olá, React! Backend está funcionando 😎' });
});

// Rotas principais
app.use('/api/mensagens', mensagemRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/chat', chatRoutes); // 🔹 IA com Gemini ou OpenAI

// 6. MIDDLEWARE GLOBAL DE ERROS
app.use(errorMiddleware);

// 7. EXPORTA O APP PARA TESTES OU SERVER.JS
module.exports = app;

// 8. INICIALIZA O SERVIDOR (caso não use server.js)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
