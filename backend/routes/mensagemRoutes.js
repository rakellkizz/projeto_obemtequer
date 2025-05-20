// ------------------------------
// ARQUIVO: index.js
// ------------------------------
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Carregar variáveis de ambiente
dotenv.config();

// Inicializa o app Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado com sucesso!'))
  .catch(err => console.error('Erro na conexão com MongoDB:', err));

// Rotas
const userRoutes = require('./routes/userRoutes');
const mensagemRoutes = require('./routes/mensagemRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

app.use('/api/usuarios', userRoutes);
app.use('/api/mensagens', mensagemRoutes);

// Middleware de erro global
app.use(errorMiddleware);

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
