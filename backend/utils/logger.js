// utils/logger.js

const winston = require('winston');

// Cria um logger usando o Winston, uma biblioteca poderosa de logging
const logger = winston.createLogger({
  level: 'info', // Nível mínimo (pode ser: error, warn, info, verbose, debug, silly)
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Adiciona data/hora
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Exibe os logs no console
    // Você pode salvar em arquivos também:
    // new winston.transports.File({ filename: 'logs/erro.log', level: 'error' }),
    // new winston.transports.File({ filename: 'logs/geral.log' }),
  ],
});

module.exports = logger;
