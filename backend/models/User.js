const mongoose = require('mongoose');

// 🎯 Definimos o schema do usuário usando Mongoose
const userSchema = new mongoose.Schema({
  // Nome do usuário – obrigatório
  nome: {
    type: String,
    required: true,
  },
  // Email do usuário – obrigatório e único no sistema
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Senha criptografada – agora incluída no schema
  senha: {
    type: String,
    required: true,
  },
  // Idade (opcional)
  idade: {
    type: Number,
  },
  // Tipo de login (manual, google, facebook, voz, etc.)
  tipoDeLogin: {
    type: String,
    enum: ['manual', 'google', 'facebook', 'voz'], // restrições de valores
    default: 'manual',
  },
  // Campo para identificar necessidades especiais (cegueira, surdez, etc.)
  acessibilidade: {
    type: String,
    enum: ['nenhuma', 'cego', 'surdo', 'mudo', 'cadeirante'],
    default: 'nenhuma',
  }
}, {
  // 🕒 Ativa createdAt e updatedAt automaticamente
  timestamps: true,
});

// Exporta o modelo User, vinculado à collection 'users' no MongoDB
module.exports = mongoose.model('User', userSchema);
