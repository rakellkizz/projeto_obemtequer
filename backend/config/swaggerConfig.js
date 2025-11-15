/**
 * ========================================================================================
 * ARQUIVO: swaggerConfig.js
 * DESCRIÇÃO: Configuração da documentação automática da API usando Swagger + JSDoc.
 * BIBLIOTECA: swagger-jsdoc (gera especificação Swagger a partir de comentários JSDoc).
 * ========================================================================================
 */

const swaggerJsdoc = require('swagger-jsdoc'); // 📦 Gera documentação Swagger a partir de comentários

/**
 * ========================================================================================
 * 🔧 OPÇÕES DE CONFIGURAÇÃO DO SWAGGER
 * - Define como o Swagger UI vai montar e exibir a documentação
 * - Inclui título, versão, descrição e lista de arquivos com os endpoints comentados
 * ========================================================================================
 */
const options = {
  definition: {
    openapi: '3.0.0', // 📘 Padrão OpenAPI usado (versão recomendada)
    info: {
      title: 'API Obemtequer 💜', // 📝 Nome da API exibido no topo do Swagger UI
      version: '1.0.0',            // 📌 Versão da API
      description: `
        ✨ Documentação oficial da API "O Bem Te Quer"

        Esta API oferece funcionalidades de apoio emocional por meio de Inteligência Artificial,
        incluindo:

        - 📋 Gerenciamento de usuários (registro, login, perfil)
        - 💬 Envio e recepção de mensagens
        - 🤖 Integração com IA generativa (OpenAI ou Gemini)
        - 🧠 Salvamento de histórico de conversa com MongoDB

        Para utilizar endpoints protegidos, envie o token JWT no cabeçalho:
        \`Authorization: Bearer <seu_token>\`
      `,
    },
    servers: [
      {
        url: 'http://localhost:5000', // 🌐 URL base da sua API em desenvolvimento
        description: 'Servidor local de desenvolvimento',
      },
    ],
  },

  /**
   * 🗂️ Caminhos dos arquivos onde estão os comentários Swagger (JSDoc)
   * Todos os arquivos de rotas devem conter blocos JSDoc com anotações @swagger.
   */
  apis: ['./backend/routes/*.js'],
};

// ✅ Exporta configuração já processada pelo swagger-jsdoc
module.exports = swaggerJsdoc(options);
