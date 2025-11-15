// --------------------------------------------------------------------
// ARQUIVO: server.js
// --------------------------------------------------------------------
// DESCRIÇÃO: Inicializa servidor Express, conecta ao MongoDB e expõe
// healthcheck, 404 padrão, handler de erro e shutdown gracioso.
// Usa ES Modules (package.json com "type":"module").
// --------------------------------------------------------------------

// 1) VARIÁVEIS DE AMBIENTE (ESM)
import dotenv from 'dotenv';
dotenv.config();
console.log('🔒 .env:', {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI
});

// 2) IMPORTAÇÕES (ESM — nada de require)
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';

// (Se quiser reativar suas rotas/Swagger depois, descomente as 4 linhas abaixo)
// import swaggerUi from 'swagger-ui-express';
// import swaggerSpec from './swaggerConfig.js';
// import authRoutes from './routes/authRoutes.js';
// import chatRoutes from './routes/chatRoutes.js';

// 3) APP E MIDDLEWARES BÁSICOS
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/obemtequer';

const app = express();
app.set('trust proxy', 1);

// CORS: configure no .env -> CORS_ORIGIN=http://localhost:5173[,https://seusite.com]
const ORIGINS = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({ origin: ORIGINS.length ? ORIGINS : true, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// 4) CONEXÃO COM MONGODB
mongoose.set('strictQuery', true);
try {
  await mongoose.connect(MONGO_URI, { dbName: 'obemtequer' });
  console.log('✅ MongoDB conectado');
} catch (err) {
  console.error('❌ Erro ao conectar no MongoDB:', err?.message || err);
  // Se preferir abortar quando o DB falhar, descomente a linha abaixo:
  // process.exit(1);
}

// 5) ROTAS
// Healthcheck para o frontend testar /api
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// (Reative quando quiser suas rotas reais)
// app.use('/api/usuarios', authRoutes); // registro, login, perfil
// app.use('/api', chatRoutes);          // POST /api/chat
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger

// 404 padrão
app.use((req, res) => res.status(404).json({ error: 'Rota não encontrada' }));

// 6) HANDLER GLOBAL DE ERROS
/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  console.error('🔥 Erro não tratado:', err);
  res.status(500).json({ error: 'Erro inesperado' });
});
/* eslint-enable no-unused-vars */

// 7) SUBIR SERVIDOR + SHUTDOWN GRACIOSO
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`🩺 Health:                 http://localhost:${PORT}/api/health`);
});

async function shutdown(signal) {
  console.log(`\nRecebido ${signal}. Encerrando...`);
  server.close(() => console.log('HTTP fechado'));
  try {
    await mongoose.connection.close();
    console.log('MongoDB desconectado');
  } finally {
    process.exit(0);
  }
}
['SIGINT', 'SIGTERM'].forEach(s => process.on(s, () => shutdown(s)));

// --------------------------------------------------------------------
// FIM DO ARQUIVO: server.js
// --------------------------------------------------------------------
