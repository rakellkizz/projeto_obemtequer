// ------------------------------
// ARQUIVO: config/db.js
// ------------------------------
// Módulo responsável pela conexão com o banco de dados MongoDB,
// utilizando a biblioteca Mongoose. Funciona tanto para MongoDB local
// quanto para instâncias hospedadas (ex: Mongo Atlas).

// --------------------------------------------------------
// IMPORTAÇÕES NECESSÁRIAS
// --------------------------------------------------------
const mongoose = require('mongoose');

// --------------------------------------------------------
// FUNÇÃO ASSÍNCRONA DE CONEXÃO AO BANCO DE DADOS
// --------------------------------------------------------
const connectDB = async () => {
  try {
    // Recupera a URI de conexão do MongoDB a partir da variável de ambiente
    const mongoURI = process.env.MONGO_URI;

    // Validação: Garante que a URI de conexão está definida
    if (!mongoURI) {
      throw new Error('❌ Variável de ambiente MONGO_URI não definida no arquivo .env');
    }

    // Estabelece a conexão com o MongoDB via Mongoose
    // Opções para evitar avisos e utilizar a nova engine de monitoramento do MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,    // Interpreta corretamente a string de conexão
      useUnifiedTopology: true, // Usa a engine de monitoramento mais moderna e eficiente
      // useCreateIndex: true,  // (Depreciado a partir do Mongoose 6)
      // useFindAndModify: false // (Depreciado a partir do Mongoose 6)
    });

    // Loga a confirmação da conexão e o host conectado
    console.log(`✅ MongoDB conectado com sucesso em: ${mongoose.connection.host}`);

  } catch (error) {
    // Em caso de erro na conexão, exibe mensagem detalhada no console
    console.error('❌ Erro ao conectar com o MongoDB:', error.message);

    // Finaliza o processo para evitar a aplicação rodando sem banco conectado
    process.exit(1);
  }
};

// --------------------------------------------------------
// EXPORTAÇÃO DO MÓDULO
// --------------------------------------------------------
module.exports = connectDB;
