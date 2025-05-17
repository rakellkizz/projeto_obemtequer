// ------------------------------
// ARQUIVO: Mensagem.js
// ------------------------------
// Define o modelo de dados "Mensagem" utilizando o Mongoose,
// que representa uma mensagem enviada no sistema, armazenada no MongoDB.

// ------------------------------
// 1. IMPORTAÇÃO DO MONGOOSE
// ------------------------------
const mongoose = require('mongoose'); // Biblioteca para modelar objetos no MongoDB

// ------------------------------
// 2. DEFINIÇÃO DO ESQUEMA (Schema) DO MODELO "Mensagem"
// ------------------------------
const mensagemSchema = new mongoose.Schema({
  // Nome do remetente da mensagem
  nome: { 
    type: String,       // Tipo de dado: texto
    required: true      // Campo obrigatório
  },

  // E-mail do remetente da mensagem
  email: { 
    type: String,
    required: true
  },

  // Conteúdo textual da mensagem enviada
  mensagem: { 
    type: String,
    required: true
  },

  // Data e hora do envio da mensagem
  data: { 
    type: Date,
    default: Date.now  // Valor padrão é a data/hora atual no momento da criação do documento
  }
});

// ------------------------------
// 3. CRIAÇÃO E EXPORTAÇÃO DO MODELO
// ------------------------------
// O modelo "Mensagem" representa a coleção "mensagens" no MongoDB
module.exports = mongoose.model('Mensagem', mensagemSchema);
