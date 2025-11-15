// ========================================================================================
// ARQUIVO: config/db.js
// ----------------------------------------------------------------------------------------
// 🎯 OBJETIVO:
// Conectar ao MongoDB (local ou Atlas) usando Mongoose, com tratamento de erros
// robusto e mensagens de status no console.
//
// 📦 Requisitos:
// - Variável de ambiente MONGO_URI no .env
// - Conexão segura e eventos de desconexão e erro
// ========================================================================================

// 📥 Importa o mongoose (ODM para MongoDB)
const mongoose = require("mongoose");

// 📁 Carrega as variáveis de ambiente do arquivo .env
require("dotenv").config();

// ========================================================================================
// 🔌 FUNÇÃO PRINCIPAL: Conectar ao MongoDB
// ========================================================================================
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // 🔑 URI do banco (local ou Atlas)

    // ❌ Se a variável de ambiente não estiver definida
    if (!mongoURI) {
      throw new Error("🔴 Variável MONGO_URI não encontrada no .env");
    }

    // ✅ Tenta conectar ao banco com Mongoose
    const conn = await mongoose.connect(mongoURI);

    // 📢 Mensagens de sucesso no console
    console.log("✅ Conectado ao MongoDB com sucesso!");
    console.log(`🌐 Host: ${conn.connection.host}`);
    console.log(`🗄️  Banco: ${conn.connection.name}`);

    // 🎯 Eventos úteis para monitoramento:
    
    // 🚫 Conexão perdida
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  Conexão com o MongoDB foi perdida.");
    });

    // ❌ Erros na conexão ativa
    mongoose.connection.on("error", (err) => {
      console.error("❌ Erro de conexão com o MongoDB:", err);
    });

  } catch (error) {
    // ⛔ Erro ao tentar conectar
    console.error("❌ Falha ao conectar com o MongoDB:", error.message);
    process.exit(1); // Encerra o processo com erro
  }
};

// ========================================================================================
// 🚀 EXPORTA a função para uso no server.js
// ========================================================================================
module.exports = connectDB;
