// ------------------------------
// ARQUIVO PRINCIPAL: index.js (BACKEND)
// ------------------------------
// Responsável por inicializar a API, conectar ao banco MongoDB e aplicar middlewares/rotas.
// A API gerencia mensagens e realiza operações de CRUD.

require('dotenv').config();  // Carrega as variáveis do arquivo .env

// --------------------------
// IMPORTAÇÃO DOS MÓDULOS
// --------------------------

const express = require('express');                          // Framework web para criar rotas, middlewares e APIs
const cors = require('cors');                                // Middleware para liberar requisições externas (CORS)
const connectDB = require('./config/db');                    // Conexão com o banco de dados MongoDB
const mensagemRoutes = require('./routes/mensagemRoutes');    // Rotas da API relacionadas às mensagens
const errorMiddleware = require('./middlewares/errorMiddleware'); // Middleware de tratamento de erros

// --------------------------
// CONFIGURAÇÃO DA APLICAÇÃO
// --------------------------

const app = express();  // Cria a instância do Express

// Porta do servidor
const PORT = process.env.PORT || 5000;

// --------------------------
// CONEXÃO COM O BANCO DE DADOS
// --------------------------

connectDB();  // Conecta ao MongoDB antes de iniciar o servidor

// --------------------------
// MIDDLEWARES GLOBAIS
// --------------------------

app.use(cors());               // Permite requisições de domínios diferentes (ex: frontend em React)
app.use(express.json());       // Permite que a API entenda requisições com corpo JSON (req.body)

// --------------------------
// ROTAS DA APLICAÇÃO
// --------------------------

app.get('/', (req, res) => {
  res.send('🌻 API do projeto O Bem Te Quer está online!');
});

// Rota principal da API para mensagens
app.use('/api/mensagens', mensagemRoutes);

// --------------------------
// TRATAMENTO GLOBAL DE ERROS
// --------------------------

app.use(errorMiddleware);  // Middleware que captura e lida com erros gerados nas rotas ou middlewares

// --------------------------
// INICIALIZAÇÃO DO SERVIDOR
// --------------------------

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
