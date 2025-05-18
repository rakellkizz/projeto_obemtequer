// ------------------------------
// ARQUIVO: server.js
// ------------------------------
// Inicializa o servidor Express, conecta ao MongoDB e configura rotas de API.
// Também define um endpoint de chatbot integrado com NLP (Google Gemini API).
// ------------------------------

// ------------------------------
// 1. IMPORTAÇÃO DE DEPENDÊNCIAS
// ------------------------------
require('dotenv').config();                       // Carrega variáveis do .env
const express = require('express');               // Framework web
const mongoose = require('mongoose');             // ODM para MongoDB
const userRoutes = require('./backend/routes/userRoutes');          // Rotas de usuário
const mensagemRoutes = require('./backend/routes/mensagemRoutes'); // Rotas de mensagens
const { GoogleGenerativeAI } = require('@google/generative-ai');   // Biblioteca para acesso ao Gemini (NLP)

// ------------------------------
// 2. CONFIGURAÇÕES INICIAIS
// ------------------------------
const app = express();                            // Cria app Express
const PORT = process.env.PORT || 5000;            // Porta padrão
const MONGO_URI = process.env.MONGO_URI;          // URI do MongoDB
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;// Chave da API Gemini

// ------------------------------
// 3. MIDDLEWARES GLOBAIS
// ------------------------------
app.use(express.json());                          // Permite JSON nas requisições

// ------------------------------
// 4. ROTAS DA APLICAÇÃO
// ------------------------------
app.use('/usuarios', userRoutes);                 // Grupo de rotas de usuários
app.use('/mensagens', mensagemRoutes);            // Grupo de rotas de mensagens

// ------------------------------
// 5. ENDPOINT: CHATBOT (IA)
// ------------------------------
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  // Validação básica
  if (!userMessage) {
    return res.status(400).json({ error: 'Mensagem não fornecida' });
  }

  try {
    // Inicializa o cliente Gemini
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Envia mensagem do usuário para a IA
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const chatbotReply = response.text();

    // Responde ao frontend com a resposta da IA
    res.status(200).json({ reply: chatbotReply });
  } catch (error) {
    console.error('Erro ao processar IA:', error);
    res.status(500).json({ error: 'Erro ao responder com IA' });
  }
});

// ------------------------------
// 6. CONEXÃO COM O MONGODB E INÍCIO DO SERVIDOR
// ------------------------------
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conexão com MongoDB estabelecida com sucesso');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error('❌ Falha ao conectar ao MongoDB:', error.message);
  process.exit(1); // Encerra se não conseguir conectar
});
