// --------------------------------------------------------------------
// ARQUIVO: server.mjs
// --------------------------------------------------------------------
// DESCRIÇÃO: Inicializa servidor Express, conecta ao MongoDB e expõe
// healthcheck, 404 padrão, handler de erro e shutdown gracioso.
// --------------------------------------------------------------------

import dotenv from "dotenv";
dotenv.config();
console.log("🔒 .env:", { PORT: process.env.PORT, MONGO_URI: process.env.MONGO_URI });

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/obemtequer";

const app = express();
app.set("trust proxy", 1);

// CORS via .env -> CORS_ORIGIN=http://localhost:5173[,https://seusite.com]
const ORIGINS = (process.env.CORS_ORIGIN || "").split(",").map(s => s.trim()).filter(Boolean);
app.use(cors({ origin: ORIGINS.length ? ORIGINS : true, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// --- Conexão com MongoDB (não bloqueia o start do servidor)
mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_URI, { dbName: "obemtequer", serverSelectionTimeoutMS: 3000 })
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error("❌ MongoDB:", err?.message || err));

// --- Rotas
app.get("/api/health", (req, res) => res.json({ ok: true, time: new Date().toISOString() }));
app.use((req, res) => res.status(404).json({ error: "Rota não encontrada" }));

// --- Handler global de erros
app.use((err, req, res, next) => {
  console.error("🔥 Erro não tratado:", err);
  res.status(500).json({ error: "Erro inesperado" });
});

// --- Subir servidor + shutdown gracioso
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`🩺 Health:                 http://localhost:${PORT}/api/health`);
});

async function shutdown(signal) {
  console.log(`\nRecebido ${signal}. Encerrando...`);
  server.close(() => console.log("HTTP fechado"));
  try { await mongoose.connection.close(); console.log("MongoDB desconectado"); }
  finally { process.exit(0); }
}
["SIGINT", "SIGTERM"].forEach(s => process.on(s, () => shutdown(s)));

// --------------------------------------------------------------------
// FIM: server.mjs
// --------------------------------------------------------------------
