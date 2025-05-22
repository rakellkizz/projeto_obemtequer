// ARQUIVO: server.js
// DESCRIÇÃO: Inicializa o servidor Express, conecta ao MongoDB e
// integra a API do Google Gemini para geração de conteúdo via IA.

// --------------------------------------------------------------------
// 1. IMPORTAÇÕES E CONFIGURAÇÕES DE AMBIENTE
// --------------------------------------------------------------------
require('dotenv').config(); // Carrega variáveis do arquivo .env

const express = require('express');                        // Framework para rotas e middlewares HTTP
const mongoose = require('mongoose');                      // ODM para interação com MongoDB
const { GoogleGenerativeAI } = require('@google/generative-ai'); // Cliente da API Gemini (IA Google)

// Rotas organizadas em arquivos separados
const userRoutes = require('./backend/routes/userRoutes');
const mensagemRoutes = require('./backend/routes/mensagemRoutes');

// --------------------------------------------------------------------
// 2. CONFIGURAÇÃO DA APLICAÇÃO
// --------------------------------------------------------------------
const app = express();
const PORT = process.env.PORT || 5000;             // Porta configurável, padrão 5000
const MONGO_URI = process.env.MONGO_URI;           // URI do MongoDB, definida no .env
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Chave da API Gemini, definida no .env

// --------------------------------------------------------------------
// 3. MIDDLEWARES GLOBAIS
// --------------------------------------------------------------------
app.use(express.json()); // Habilita parsing de JSON no corpo das requisições

// --------------------------------------------------------------------
// 4. ROTAS DA APLICAÇÃO
// --------------------------------------------------------------------
app.use('/usuarios', userRoutes);       // Endpoints relacionados aos usuários
app.use('/mensagens', mensagemRoutes);  // Endpoints relacionados às mensagens

// --------------------------------------------------------------------
// 5. ROTA DE INTELIGÊNCIA ARTIFICIAL (/chat)
// --------------------------------------------------------------------
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  // Validação: mensagem obrigatória no corpo da requisição
  if (!userMessage) {
    return res.status(400).json({ error: 'Mensagem não fornecida' });
  }

  try {
    // Instancia o cliente Gemini com a chave da API
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    // Define o modelo a ser usado (gemini-pro)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Envia a mensagem e obtém a resposta
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const chatbotReply = response.text();

    // Responde para o cliente com o texto gerado pela IA
    return res.status(200).json({ reply: chatbotReply });

  } catch (error) {
    console.error('❌ Erro ao processar resposta da IA:', error);
    return res.status(500).json({ error: 'Erro interno ao gerar resposta da IA' });
  }
});

// --------------------------------------------------------------------
// 6. CONEXÃO COM O MONGODB E INICIALIZAÇÃO DO SERVIDOR
// --------------------------------------------------------------------
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Conectado ao MongoDB com sucesso');

  app.listen(PORT, () => {
    console.log(`🚀 Servidor backend rodando em: http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error('❌ Erro ao conectar ao MongoDB:', error.message);
  process.exit(1); // Encerra a aplicação se a conexão falhar
});
