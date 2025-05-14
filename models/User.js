const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  idade: {
    type: Number,
  },
}, {
  timestamps: true, // cria campos createdAt e updatedAt automaticamente
});

module.exports = mongoose.model('User', userSchema);
