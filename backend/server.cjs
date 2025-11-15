// --------------------------------------------------------------------
// ARQUIVO: server.js
// --------------------------------------------------------------------
// DESCRIÇÃO: Inicializa servidor Express, conecta ao MongoDB e integra
// a API Gemini do Google para geração de conteúdo via IA.
// --------------------------------------------------------------------

// 1. CARREGAMENTO DE VARIÁVEIS DE AMBIENTE
require('dotenv').config();
console.log('🔎 Variáveis carregadas do .env:', {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// 2. ROTAS IMPORTADAS
const userRoutes = require('./routes/userRoutes');
const mensagemRoutes = require('./routes/mensagemRoutes');

// 3. CONFIGURAÇÃO DA APLICAÇÃO EXPRESS
const app = express();

// 4. CONSTANTES DE CONFIGURAÇÃO
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 5. VALIDAÇÃO DAS VARIÁVEIS ESSENCIAIS
if (!MONGO_URI) {
  console.error('❌ Variável MONGO_URI não definida no .env');
  process.exit(1);
}
if (!GEMINI_API_KEY) {
  console.error('❌ Variável GEMINI_API_KEY não definida no .env');
  process.exit(1);
}

// 6. CONFIGURAÇÃO DO CORS 🌐
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// 7. MIDDLEWARES GLOBAIS
app.use(express.json()); // Faz o parsing de JSON no corpo da requisição

// 8. ROTAS DA APLICAÇÃO (prefixo /api para organização)
app.use('/api/usuarios', userRoutes);
app.use('/api/mensagens', mensagemRoutes);

// 9. ROTA DE INTELIGÊNCIA ARTIFICIAL COM GEMINI 🤖
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'Mensagem não fornecida' });
  }

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(userMessage);
    const chatbotReply = result?.response?.text() || 'Sem resposta da IA';

    return res.status(200).json({ reply: chatbotReply });
  } catch (error) {
    console.error('❌ Erro ao processar resposta da IA:', error);
    return res.status(500).json({ error: 'Erro interno ao gerar resposta da IA' });
  }
});

// 10. MIDDLEWARE GLOBAL DE TRATAMENTO DE ERROS (deve vir após as rotas)
const errorHandler = require('./src/middlewares/errorHandler');
app.use(errorHandler); // Sempre por último ⚠️

// 11. CONEXÃO COM MONGODB E INICIALIZAÇÃO DO SERVIDOR
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Conectado ao MongoDB com sucesso');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
  });
})
.catch(error => {
  console.error('❌ Erro ao conectar ao MongoDB:', error.message);
  process.exit(1);
});
