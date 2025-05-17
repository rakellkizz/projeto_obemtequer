// ------------------------------
// ARQUIVO: server.js
// ------------------------------
// Inicializa o servidor Express, conecta ao MongoDB e configura rotas básicas.

// ------------------------------
// 1. IMPORTAÇÃO DE DEPENDÊNCIAS
// ------------------------------
require('dotenv').config();               // Carrega variáveis do .env
const express = require('express');       // Framework web
const mongoose = require('mongoose');     // ODM para MongoDB
const userRoutes = require('./backend/routes/userRoutes');        // Rotas de usuário
const mensagemRoutes = require('./backend/routes/mensagemRoutes');// Rotas de mensagens

// ------------------------------
// 2. CONFIGURAÇÕES INICIAIS
// ------------------------------
const app = express();                     // Cria app Express
const PORT = process.env.PORT || 5000;    // Porta padrão ou 5000
const MONGO_URI = process.env.MONGO_URI;  // URI do banco MongoDB

// ------------------------------
// 3. MIDDLEWARES GLOBAIS
// ------------------------------
app.use(express.json());                   // Permite receber JSON no corpo das requisições

// ------------------------------
// 4. ROTAS
// ------------------------------
app.use('/usuarios', userRoutes);          // Rotas de usuários
app.use('/mensagens', mensagemRoutes);     // Rotas de mensagens

// ------------------------------
// 5. CONEXÃO COM O MONGODB E INÍCIO DO SERVIDOR
// ------------------------------
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conexão com MongoDB estabelecida com sucesso');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
})
.catch((error) => {
  console.error('❌ Falha ao conectar ao MongoDB:', error.message);
  process.exit(1); // Encerra a aplicação caso não conecte ao banco
});
