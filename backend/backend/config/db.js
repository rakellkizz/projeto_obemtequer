// ------------------------------------------------------------
// ARQUIVO: config/db.js
// ------------------------------------------------------------
// Responsável por conectar ao MongoDB utilizando Mongoose.
// Suporta tanto conexões locais quanto com MongoDB Atlas.
// ------------------------------------------------------------

// -----------------------------
// IMPORTAÇÃO DE DEPENDÊNCIAS
// -----------------------------
const mongoose = require('mongoose');
require('dotenv').config(); // Carrega as variáveis do arquivo .env

// -----------------------------
// FUNÇÃO ASSÍNCRONA DE CONEXÃO
// -----------------------------
const connectDB = async () => {
  try {
    // Obtém a string de conexão do arquivo .env
    const mongoURI = process.env.MONGO_URI;

    // Valida se a variável de ambiente está definida
    if (!mongoURI) {
      throw new Error('❌ Variável MONGO_URI não encontrada. Verifique seu arquivo .env');
    }

    // Tenta conectar ao MongoDB
    // As opções useNewUrlParser e useUnifiedTopology foram removidas
    const conn = await mongoose.connect(mongoURI);

    // Se conectar com sucesso, exibe o host e database
    console.log('✅ MongoDB conectado com sucesso!');
    console.log(`📡 Host: ${conn.connection.host}`);
    console.log(`🗃️  Database: ${conn.connection.name}`);

    // OPCIONAL: Monitora eventos do Mongoose
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  Conexão com o MongoDB foi perdida.');
    });

    mongoose.connection.on('error', err => {
      console.error('❌ Erro na conexão MongoDB:', err);
    });

  } catch (error) {
    // Em caso de erro na conexão, exibe e finaliza o processo
    console.error('❌ Erro ao conectar com o MongoDB:', error.message);
    process.exit(1); // Encerra a aplicação com erro
  }
};

// -----------------------------
// EXPORTAÇÃO DA FUNÇÃO
// -----------------------------
// Permite que outros módulos usem connectDB()
module.exports = connectDB;
