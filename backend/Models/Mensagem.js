// ------------------------------
// ARQUIVO: Mensagem.js
// ------------------------------
// Define o modelo de Mensagem usando o Mongoose

const mongoose = require('mongoose'); // Mongoose para definir o modelo de dados

// Define o esquema da Mensagem
const mensagemSchema = new mongoose.Schema({
  nome: { type: String, required: true },     // Nome do remetente da mensagem
  email: { type: String, required: true },    // E-mail do remetente da mensagem
  mensagem: { type: String, required: true }, // Texto da mensagem enviada
  data: { type: Date, default: Date.now }     // Data de envio, padrão é o momento atual
});

// Cria o modelo "Mensagem" a partir do esquema
module.exports = mongoose.model('Mensagem', mensagemSchema);
