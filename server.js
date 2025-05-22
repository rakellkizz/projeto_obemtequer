// --------------------------------------------------------------------
// ARQUIVO: server.js
// DESCRIÇÃO: Inicializa o servidor Express, conecta ao MongoDB e
// integra a API do Google Gemini para geração de conteúdo via IA.
// Inclui documentação com Swagger, suporte a CORS e rota para OpenAI.
// --------------------------------------------------------------------

// --------------------------------------------------------------------
// 1. IMPORTAÇÕES E CONFIGURAÇÕES DE AMBIENTE
// --------------------------------------------------------------------
require('dotenv').config(); // Carrega variáveis do arquivo .env

const express = require('express');                        // Framework para construir a API
const mongoose = require('mongoose');                      // ODM para MongoDB
const cors = require('cors');                              // Middleware que permite requisições entre domínios
const swaggerUi = require('swagger-ui-express');           // Interface web para exibir documentação Swagger
const swaggerSpec = require('./swagger/swaggerConfig');    // Configurações Swagger (OpenAPI 3.0)
const { GoogleGenerativeAI } = require('@google/generative-ai'); // Cliente da API Google Gemini
const { Configuration, OpenAIApi } = require('openai');    // SDK oficial OpenAI

// Importação de rotas separadas (modularização)
const userRoutes = require('./backend/routes/userRoutes');
const mensagemRoutes = require('./backend/routes/mensagemRoutes');

// --------------------------------------------------------------------
// 2. CONFIGURAÇÃO DA APLICAÇÃO
// --------------------------------------------------------------------
const app = express();                                     // Instância do Express
const PORT = process.env.PORT || 5000;                     // Porta definida no .env ou padrão 5000
const MONGO_URI = process.env.MONGO_URI;                   // URI de conexão do MongoDB
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;         // Chave da API Gemini do Google
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;         // Chave da API OpenAI

// Configuração cliente OpenAI
const openaiConfig = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(openaiConfig);

// --------------------------------------------------------------------
// 3. MIDDLEWARES GLOBAIS
// --------------------------------------------------------------------
app.use(cors({
  origin: '*',                       // Permite requisições de qualquer origem (ideal para dev)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
}));
app.use(express.json());             // Permite o uso de JSON no corpo das requisições

// --------------------------------------------------------------------
// 4. ROTAS DA APLICAÇÃO
// --------------------------------------------------------------------
app.use('/usuarios', userRoutes);         // Rotas de gerenciamento de usuários
app.use('/mensagens', mensagemRoutes);    // Rotas de envio/consulta de mensagens
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger em /api-docs

// --------------------------------------------------------------------
// 5. ROTA DE INTELIGÊNCIA ARTIFICIAL - GOOGLE GEMINI (/chat)
// Descrição: Recebe uma mensagem do usuário e retorna uma resposta
// gerada pela IA da API Gemini.
// --------------------------------------------------------------------
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  // Validação simples: mensagem não pode estar vazia
  if (!userMessage) {
    return res.status(400).json({ error: 'Mensagem não fornecida' });
  }

  try {
    // Instancia cliente Gemini
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    // Seleciona o modelo 'gemini-pro' (chat otimizado)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Gera conteúdo com base na entrada do usuário
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const chatbotReply = response.text(); // Texto gerado pela IA

    // Retorna a resposta ao frontend
    return res.status(200).json({ reply: chatbotReply });

  } catch (error) {
    console.error('❌ Erro ao processar resposta da IA Gemini:', error);
    return res.status(500).json({ error: 'Erro interno ao gerar resposta da IA Gemini' });
  }
});

// --------------------------------------------------------------------
// 6. ROTA DE INTELIGÊNCIA ARTIFICIAL - OPENAI (/openai/chat)
// Descrição: Recebe um prompt do usuário e retorna resposta da OpenAI GPT
// --------------------------------------------------------------------
app.post('/openai/chat', async (req, res) => {
  const { prompt } = req.body;

  // Validação simples: prompt não pode estar vazio
  if (!prompt) {
    return res.status(400).json({ error: 'O campo prompt é obrigatório.' });
  }

  try {
    // Chamada para a API OpenAI (GPT-4 ou GPT-3.5)
    const response = await openai.createChatCompletion({
      model: 'gpt-4', // ou 'gpt-3.5-turbo'
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
      temperature: 0.7,
    });

    // Envia a resposta gerada para o frontend
    return res.status(200).json({
      reply: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error('❌ Erro na rota OpenAI:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Erro ao comunicar com a API OpenAI.' });
  }
});

// --------------------------------------------------------------------
// 7. CONEXÃO COM O MONGODB E INICIALIZAÇÃO DO SERVIDOR
// --------------------------------------------------------------------
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Conectado ao MongoDB com sucesso');

  app.listen(PORT, () => {
    console.log(`🚀 Servidor backend rodando em: http://localhost:${PORT}`);
    console.log(`📚 Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
  });
})
.catch((error) => {
  console.error('❌ Erro ao conectar ao MongoDB:', error.message);
  process.exit(1); // Encerra o processo em caso de erro
});
