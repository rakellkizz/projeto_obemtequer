// ------------------------------
// ARQUIVO: server.js
// ------------------------------
// Inicializa o servidor e conecta ao MongoDB

const express = require('express');                         // Framework Express
const mongoose = require('mongoose');                       // ODM para MongoDB
const dotenv = require('dotenv');                           // Carrega variáveis de ambiente
const userRoutes = require('./routes/userRoutes');          // Rotas de usuário
const mensagemRoutes = require('./routes/mensagemRoutes');  // Rotas de mensagens

dotenv.config(); // Carrega as variáveis do arquivo .env

const app = express();                         // Cria a aplicação Express
const PORT = process.env.PORT || 5000;         // Porta do servidor
const MONGO_URI = process.env.MONGO_URI;       // URI do MongoDB

app.use(express.json()); // Middleware para interpretar JSON no corpo das requisições

// Define as rotas da aplicação
app.use('/usuarios', userRoutes);              // Rotas para usuários
app.use('/mensagens', mensagemRoutes);         // Rotas para mensagens

// Conexão com o MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,       // (opcional em versões recentes)
  useUnifiedTopology: true     // (opcional em versões recentes)
})
.then(() => {
  console.log('✅ Conectado ao MongoDB com sucesso');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
})
.catch((error) => {
  console.error('❌ Erro ao conectar ao MongoDB:', error.message);
});
