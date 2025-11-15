// -----------------------------------------------------------------------------
// ARQUIVO: models/User.js
// -----------------------------------------------------------------------------
// 🧩 Modelo Mongoose do usuário com validações, enums e hash automático de senha
// -----------------------------------------------------------------------------

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // 🔐 Para criptografar senhas com segurança

// -----------------------------------------------------------------------------
// 1. DEFINIÇÃO DO SCHEMA DO USUÁRIO
// -----------------------------------------------------------------------------

const userSchema = new mongoose.Schema({

  // 📛 Nome do usuário – obrigatório
  nome: {
    type: String,
    required: true,
  },

  // 📧 Email do usuário – obrigatório e único no sistema
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // 🔐 Senha criptografada (hash via bcrypt)
  senha: {
    type: String,
    required: true,
  },

  // 🎂 Idade (opcional)
  idade: {
    type: Number,
  },

  // 🔑 Tipo de login (manual, Google, Facebook, voz, etc.)
  tipoDeLogin: {
    type: String,
    enum: ['manual', 'google', 'facebook', 'voz'],
    default: 'manual',
  },

  // 🧏 Acessibilidade (ex: cego, surdo, etc.)
  acessibilidade: {
    type: String,
    enum: ['nenhuma', 'cego', 'surdo', 'mudo', 'cadeirante'],
    default: 'nenhuma',
  }

}, {
  timestamps: true, // 🕒 Cria createdAt e updatedAt automaticamente
});

// -----------------------------------------------------------------------------
// 2. HOOK AUTOMÁTICO PARA CRIPTOGRAFAR A SENHA ANTES DE SALVAR
// -----------------------------------------------------------------------------

userSchema.pre('save', async function (next) {
  // ⚠️ Só aplica hash se a senha for nova ou alterada
  if (!this.isModified('senha')) return next();

  try {
    const salt = await bcrypt.genSalt(10);             // 🔧 Gera salt
    this.senha = await bcrypt.hash(this.senha, salt);  // 🔒 Criptografa
    next();
  } catch (err) {
    next(err); // ⛑️ Encaminha erro para o fluxo padrão
  }
});

// -----------------------------------------------------------------------------
// 3. MÉTODO PARA COMPARAÇÃO DE SENHA DURANTE LOGIN
// -----------------------------------------------------------------------------

/**
 * 🧪 Compara a senha digitada com o hash armazenado.
 * @param {string} senhaDigitada - senha em texto plano
 * @returns {Promise<boolean>} true se coincidir
 */
userSchema.methods.compararSenha = async function (senhaDigitada) {
  return await bcrypt.compare(senhaDigitada, this.senha);
};

// -----------------------------------------------------------------------------
// 4. EXPORTAÇÃO DO MODELO
// -----------------------------------------------------------------------------

module.exports = mongoose.model('User', userSchema);
