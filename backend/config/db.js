// ------------------------------
// ARQUIVO: db.js
// ------------------------------
// Responsável por fazer a conexão com o MongoDB
// Usamos o mongoose para estabelecer a conexão e capturar erros

const mongoose = require('mongoose'); // Mongoose para conectar e interagir com o MongoDB

// Função para conectar ao MongoDB
const connectDB = async () => {
  try {
    // Obtém a string de conexão do arquivo .env
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/obemtequer';

    // Conecta ao MongoDB com as opções recomendadas
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Conectado ao MongoDB com sucesso');
  } catch (err) {
    console.error('❌ Erro ao conectar ao MongoDB:', err.message);
    process.exit(1); // Encerra o processo em caso de erro na conexão
  }
};

// Exporta a função para ser utilizada em outros arquivos
module.exports = connectDB;
