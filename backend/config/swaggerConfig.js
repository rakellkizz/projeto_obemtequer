/**
 * ARQUIVO: swaggerConfig.js
 * DESCRIÇÃO: Configuração central do Swagger para documentação automática da API REST.
 * RESPONSABILIDADE: Este módulo exporta uma instância configurada do swagger-jsdoc,
 * que é utilizada pelo Swagger UI para gerar a documentação da API de forma dinâmica.
 */

const swaggerJsdoc = require('swagger-jsdoc'); // Importa o módulo responsável por gerar a especificação Swagger a partir de comentários JSDoc

/**
 * OPÇÕES DE CONFIGURAÇÃO DO SWAGGER
 * Abaixo estão os principais parâmetros que definem a estrutura da documentação gerada.
 */
const options = {
  definition: {
    openapi: '3.0.0', // Define a versão da especificação OpenAPI utilizada (recomenda-se sempre a versão 3+)
    info: {
      title: 'API Obemtequer ❤️', // Título principal exibido na UI do Swagger
      version: '1.0.0',            // Versão atual da API
      description: `
        Esta documentação cobre todos os endpoints da API Obemtequer — uma aplicação 
        voltada ao acolhimento emocional por meio de inteligência artificial e integração 
        com usuários via MongoDB. 
        
        Endpoints incluem:
        - Gerenciamento de usuários
        - Envio e recepção de mensagens
        - Integração com IA generativa (Google Gemini)
      `,
    },
    servers: [
      {
        url: 'http://localhost:5000', // URL base do servidor de desenvolvimento
        description: 'Servidor local (desenvolvimento)', // Descrição do ambiente de execução
      },
    ],
  },

  /**
   * APIS:
   * Define quais arquivos serão escaneados para extrair anotações Swagger (JSDoc).
   * Aqui, todas as rotas da API foram organizadas na pasta `backend/routes`.
   * Os comentários com marcações Swagger (ex: @swagger, @path, @tags) devem estar nesses arquivos.
   */
  apis: ['./backend/routes/*.js'],
};

// Exporta o objeto configurado para ser utilizado pelo middleware do Swagger no server.js
module.exports = swaggerJsdoc(options);
