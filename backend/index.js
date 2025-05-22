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

// Middleware global para tratamento de erros personalizado
const errorMiddleware = require('./middlewares/errorMiddleware');

// 4. INICIALIZAÇÃO DO APP EXPRESS
const app = express();

// 5. VARIÁVEIS DE CONFIGURAÇÃO DO AMBIENTE
const PORT = process.env.PORT || 5000;               // Porta do servidor (default 5000)
const NODE_ENV = process.env.NODE_ENV || 'production'; // Ambiente: development ou production

// 6. CONEXÃO COM O BANCO DE DADOS (MongoDB)
connectDB(); // Chama a função que conecta ao MongoDB usando a variável MONGO_URI do .env

// 7. CONFIGURAÇÕES DE SEGURANÇA

// Helmet ajuda a proteger a API configurando cabeçalhos HTTP apropriados
app.use(helmet());

// 8. RATE LIMITING - limita número de requisições para evitar ataques DoS/abusos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Janela de 15 minutos
  max: 100,                 // Limite máximo de 100 requisições por IP por janela
  message: '🚫 Limite de requisições excedido. Tente novamente mais tarde.',
  standardHeaders: true,    // Retorna informações de limite nos cabeçalhos RateLimit-*
  legacyHeaders: false,     // Desativa cabeçalhos antigos X-RateLimit-*
});
app.use(limiter);

// 9. CONFIGURAÇÃO CORS - controla quais origens podem acessar a API
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Frontend autorizado
  methods: ['GET', 'POST', 'PUT', 'DELETE'],                  // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'],          // Cabeçalhos permitidos
}));

// 10. PARSER PARA JSON NAS REQUISIÇÕES
app.use(express.json()); // Permite o Express entender corpo JSON enviado pelo cliente

// 11. ROTAS PRINCIPAIS DA API

// Rota raiz simples para checar se o backend está no ar
app.get('/', (req, res) => {
  res.send('🌻 API do projeto O Bem Te Quer está online!');
});

// Rota de teste para frontend verificar conexão com backend
app.get('/api/mensagem', (req, res) => {
  res.json({ mensagem: 'Olá, React! Backend está funcionando 😎' });
});

// Registro das rotas organizadas por funcionalidade
app.use('/api/mensagens', mensagemRoutes);  // Rotas de mensagens
app.use('/api/usuarios', userRoutes);        // Rotas de usuários
app.use('/api/chat', chatRoutes);             // Rotas do chat (OpenAI/Gemini)
app.use('/api/ia', iaRoutes);                 // Rotas específicas de IA (OpenAI)

// 12. MIDDLEWARE GLOBAL PARA TRATAMENTO DE ERROS
// Centraliza o tratamento de erros para respostas padronizadas
app.use(errorMiddleware);

// 13. INICIALIZAÇÃO DO SERVIDOR NA PORTA DEFINIDA
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📢 Ambiente: ${NODE_ENV}`);
  console.log(`🔑 OpenAI API Key configurada: ${process.env.OPENAI_API_KEY ? '✅ Sim' : '❌ Não'}`);
});

// 14. EXPORTA O APP PARA TESTES OU USO EXTERNO
module.exports = app;
