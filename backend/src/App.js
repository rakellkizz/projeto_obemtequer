// ============================================================================
// ARQUIVO: src/app.js
// ----------------------------------------------------------------------------
// ✅ App Express isolado (sem app.listen) para permitir testes com Jest
// ============================================================================

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Importa as rotas
const mensagemRoutes = require('./routes/mensagemRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const iaRoutes = require('./routes/ia/iaRoutes');

// Importa middleware global de erro
const errorHandler = require('../utils/errorHandler');

// Inicializa o app
const app = express();

// Segurança HTTP
app.use(helmet());

// Limite de requisições para prevenir abuso
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: '🚫 Limite de requisições excedido.',
}));

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parser de JSON
app.use(express.json());

// Rota raiz para verificação
app.get('/', (req, res) => {
  res.send('🌻 API do projeto O Bem Te Quer está online!');
});

// Registra as rotas da API
app.use('/api/mensagens', mensagemRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/ia', iaRoutes);

// Middleware de erros (sempre por último)
app.use(errorHandler);

// Exporta o app para testes
module.exports = app;
