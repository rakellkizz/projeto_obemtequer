// ------------------------------
// ARQUIVO PRINCIPAL: index.js (BACKEND)
// ------------------------------
// Configuração e inicialização da API Express, conexão com MongoDB,
// registro de rotas, middlewares de segurança, CORS e tratamento global de erros.
// ------------------------------

// 1. CARREGAMENTO DE VARIÁVEIS DE AMBIENTE
require('dotenv').config(); // Importa variáveis do arquivo .env na raiz do backend

// 2. IMPORTAÇÃO DE DEPENDÊNCIAS ESSENCIAIS
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db'); // Função para conectar ao MongoDB

// 3. IMPORTAÇÃO DAS ROTAS DA APLICAÇÃO
const mensagemRoutes = require('./routes/mensagemRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const iaRoutes = require('./routes/ia/iaRoutes'); // Rotas para funcionalidades de IA (OpenAI/Gemini)

// 4. IMPORTAÇÃO DE MIDDLEWARES PERSONALIZADOS
const errorHandler = require('./middlewares/errorHandler'); // Middleware de tratamento de erros

// 5. INICIALIZAÇÃO DO APP EXPRESS
const app = express();

// 6. VARIÁVEIS DE CONFIGURAÇÃO DO AMBIENTE
const PORT = process.env.PORT || 5000;               // Porta do servidor (default 5000)
const NODE_ENV = process.env.NODE_ENV || 'production'; // Ambiente: development ou production

// 7. CONEXÃO COM O BANCO DE DADOS (MongoDB)
connectDB(); // Chama a função que conecta ao MongoDB usando a variável MONGO_URI do .env

// 8. CONFIGURAÇÕES DE SEGURANÇA 🛡️
app.use(helmet()); // Protege a API com cabeçalhos HTTP seguros

// 9. RATE LIMITING ⏱️ - Previne abusos e ataques DoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Janela de 15 minutos
  max: 100,                 // Limite máximo por IP
  message: '🚫 Limite de requisições excedido. Tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// 10. CORS 🌐 - Define quais origens podem acessar a API
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// 11. PARSER DE JSON 📦
app.use(express.json()); // Permite o Express ler requisições com corpo em JSON

// 12. ROTAS PRINCIPAIS DA API 🌍

// Rota raiz simples para verificação
app.get('/', (req, res) => {
  res.send('🌻 API do projeto O Bem Te Quer está online!');
});

// Rota de teste para conexão com frontend
app.get('/api/mensagem', (req, res) => {
  res.json({ mensagem: 'Olá, React! Backend está funcionando 😎' });
});

// Registro das rotas organizadas
app.use('/api/mensagens', mensagemRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/ia', iaRoutes);

// 13. MIDDLEWARE GLOBAL DE ERROS ❗ (sempre no final!)
app.use(errorHandler); // Captura erros e envia resposta padronizada

// 14. INICIALIZAÇÃO DO SERVIDOR 🚀
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📢 Ambiente: ${NODE_ENV}`);
  console.log(`🔑 OpenAI API Key configurada: ${process.env.OPENAI_API_KEY ? '✅ Sim' : '❌ Não'}`);
});

// 15. EXPORTA O APP PARA TESTES 🔬
module.exports = app;
