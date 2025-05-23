// --------------------------------------------------------------------
// ARQUIVO: server.js
// --------------------------------------------------------------------
// Ponto de entrada do backend Node.js com Express
// --------------------------------------------------------------------

const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db'); // Função para conectar ao MongoDB
const authRoutes = require('./routes/authRoutes'); // Login, registro, perfil
const userRoutes = require('./routes/userRoutes'); // Buscar usuário por ID

// Inicializa o app
const app = express();

// Conecta ao banco de dados
conectarDB();

// Middleware para habilitar CORS (acesso externo)
app.use(cors());

// Middleware para aceitar JSON no corpo das requisições
app.use(express.json());

// --------------------------------------------------
// Rotas da aplicação
// --------------------------------------------------

// Rotas de autenticação (registro, login, perfil)
app.use('/api/usuarios', authRoutes);

// Rotas de usuários (buscar por ID)
app.use('/api/usuarios', userRoutes);

// Rota inicial (opcional para testes)
app.get('/', (req, res) => {
  res.send('API do projeto Obemtequer está rodando! 🚀');
});

// Porta do servidor
const PORT = process.env.PORT || 5000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
