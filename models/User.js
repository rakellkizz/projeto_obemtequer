// --------------------------------------------------------------------
// ARQUIVO: models/User.js
// DESCRIÇÃO: Modelo Mongoose para usuários com schema validado e campos
// obrigatórios e opcionais para o sistema de autenticação.
// --------------------------------------------------------------------

import mongoose from 'mongoose'; // ODM para MongoDB

// 🎯 Definição do schema para usuários
const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,               // ⚠️ Nome obrigatório
  },
  email: {
    type: String,
    required: true,               // ⚠️ Email obrigatório
    unique: true,                 // 🚫 Deve ser único no banco
  },
  senha: {
    type: String,
    required: true,               // ⚠️ Senha obrigatória (criptografar em produção!)
  },
  idade: {
    type: Number,                 // 🧓 Idade opcional
  },
  tipoDeLogin: {
    type: String,
    enum: ['manual', 'google', 'facebook', 'voz'], // 🎭 Tipos permitidos de login
    default: 'manual',            // 🔧 Padrão é login manual
  },
  acessibilidade: {
    type: String,
    enum: ['nenhuma', 'cego', 'surdo', 'mudo', 'cadeirante'], // ♿ Necessidades especiais
    default: 'nenhuma',           // 🔧 Padrão nenhuma necessidade especial
  }
}, {
  timestamps: true,               // 🕒 Cria campos createdAt e updatedAt automaticamente
});

// 🔄 Exporta o modelo para ser usado no resto da aplicação
export default mongoose.model('User', userSchema);
