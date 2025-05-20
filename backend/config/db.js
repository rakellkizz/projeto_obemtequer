// ------------------------------------------------------------
// ARQUIVO: config/db.js
// ------------------------------------------------------------
// Este módulo é responsável por estabelecer a conexão com o
// banco de dados MongoDB, utilizando o ODM Mongoose.
// Suporta tanto conexões locais quanto com MongoDB Atlas.
// ------------------------------------------------------------

// -----------------------------
// IMPORTAÇÃO DE DEPENDÊNCIAS
// -----------------------------
const mongoose = require('mongoose');
require('dotenv').config(); // Carrega variáveis do .env (necessário caso não seja feito no app principal)

// -----------------------------
// FUNÇÃO ASSÍNCRONA DE CONEXÃO
// -----------------------------
const connectDB = async () => {
  try {
    // Captura a string de conexão do ambiente
    const mongoURI = process.env.MONGO_URI;

    // Valida se a variável foi definida corretamente no .env
    if (!mongoURI) {
      throw new Error('❌ Variável MONGO_URI não encontrada. Verifique seu arquivo .env');
    }

    // Tenta conectar ao MongoDB com configurações recomendadas
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,        // Interpreta corretamente a URI
      useUnifiedTopology: true      // Usa o novo mecanismo de monitoramento do driver MongoDB
      // A partir do Mongoose v6+, outras opções como useFindAndModify foram removidas
    });

    // Em caso de sucesso, loga o nome do host conectado
    console.log(`✅ Conexão com MongoDB estabelecida com sucesso: ${mongoose.connection.host}`);

  } catch (error) {
    // Em caso de falha, exibe o erro e encerra o processo
    console.error('❌ Erro ao conectar com o MongoDB:', error.message);
    process.exit(1); // Encerra o processo com código de erro
  }
};

// -----------------------------
// EXPORTAÇÃO DO MÓDULO
// -----------------------------
// Permite importar a função em outros arquivos da aplicação
module.exports = connectDB;
