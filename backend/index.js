// ------------------------------
// ARQUIVO PRINCIPAL: index.js (BACKEND)
// ------------------------------
// Configuração da API Express, conexão com MongoDB,
// registro de rotas, middlewares de segurança, CORS e tratamento de erros.

// ------------------------------
// 1. CARREGAMENTO DE VARIÁVEIS DE AMBIENTE
// ------------------------------
require('dotenv').config(); // Carrega variáveis do arquivo .env

// ------------------------------
// 2. IMPORTAÇÃO DE DEPENDÊNCIAS
// ------------------------------
const express = require('express');                         // Framework web
const cors = require('cors');                               // Habilita CORS
const helmet = require('helmet');                           // Segurança HTTP
const rateLimit = require('express-rate-limit');            // Limita número de requisições
const connectDB = require('./config/db');                   // Conexão com MongoDB

const mensagemRoutes = require('./routes/mensagemRoutes');  // Rotas: mensagens salvas/chatbot
const userRoutes = require('./routes/userRoutes');          // Rotas: login e cadastro de usuários
const chatRoutes = require('./routes/chatRoutes');          // 🔹 NOVO: Rota de chat com IA (Gemini/OpenAI)

const errorMiddleware = require('./middlewares/errorMiddleware'); // Tratamento global de erros

// ------------------------------
// 3. CRIAÇÃO DA INSTÂNCIA EXPRESS
// ------------------------------
const app = express();

// ------------------------------
// 4. CONFIGURAÇÃO DOS MIDDLEWARES GLOBAIS
// ------------------------------

// Segurança HTTP com Helmet
app.use(helmet());

// Limita requisições para evitar abusos (100 reqs por IP a cada 15 min)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: '🚫 Limite de requisições excedido. Tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Configuração CORS dinâmica para desenvolvimento/produção
if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
} else {
  app.use(cors());
}

// Permite o uso de JSON no corpo das requisições
app.use(express.json());

// ------------------------------
// 5. ROTAS PRINCIPAIS DA API
// ------------------------------

// Rota raiz - Verifica se API está online
app.get('/', (req, res) => {
  res.send('🌻 API do projeto O Bem Te Quer está online!');
});

// Rota de teste de integração com frontend
app.get('/api/mensagem', (req, res) => {
  res.json({ mensagem: 'Olá, React! Backend está funcionando 😎' });
});

// Rotas especializadas
app.use('/api/mensagens', mensagemRoutes);  // Chat armazenado
app.use('/api/usuarios', userRoutes);       // Login e cadastro
app.use('/api/chat', chatRoutes);           // 🔹 IA: OpenAI e Gemini (rota POST /api/chat)

// ------------------------------
// 6. MIDDLEWARE GLOBAL DE TRATAMENTO DE ERROS
// ------------------------------
app.use(errorMiddleware); // Captura e trata erros globalmente

// ------------------------------
// 7. EXPORTAÇÃO DO APP PARA USO EM SERVER.JS E TESTES
// ------------------------------
module.exports = app;
