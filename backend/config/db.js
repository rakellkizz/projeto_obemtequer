// ------------------------------
// ARQUIVO: config/db.js
// ------------------------------
// Responsável por realizar a conexão com o MongoDB
// utilizando a biblioteca Mongoose, seja local ou via Atlas.

// --------------------------
// IMPORTAÇÃO DO MONGOOSE
// --------------------------
const mongoose = require('mongoose');

// --------------------------
// FUNÇÃO DE CONEXÃO COM O BANCO
// --------------------------
const connectDB = async () => {
  try {
    // Recupera a string de conexão do arquivo .env
    const mongoURI = process.env.MONGO_URI;

    // Validação: Se a variável não estiver definida, lança erro
    if (!mongoURI) {
      throw new Error("❌ Variável MONGO_URI não encontrada no arquivo .env");
    }

    // Tenta conectar ao MongoDB usando Mongoose
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,           // Usa o novo parser de URL
      useUnifiedTopology: true         // Usa a engine unificada de monitoramento
    });

    // Conexão bem-sucedida
    console.log(`✅ MongoDB conectado com sucesso: ${conn.connection.host}`);
  } catch (error) {
    // Em caso de falha na conexão, exibe mensagem de erro
    console.error('❌ Erro ao conectar ao MongoDB:', error.message);

    // Encerra a aplicação com código de erro
    process.exit(1);
  }
};

// --------------------------
// EXPORTAÇÃO DO MÓDULO
// --------------------------
module.exports = connectDB;
