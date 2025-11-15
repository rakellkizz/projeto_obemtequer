# 🌼 Obemquetequer - Backend

> API RESTful desenvolvida para o projeto **Obemquetequer**, uma iniciativa de empatia digital e acolhimento emocional.

---

## 💡 Visão Geral

Este backend provê os recursos necessários para:
- Cadastro e autenticação de usuários
- Comunicação segura e escalável com possíveis integrações futuras com IA
- Expansão para interfaces acessíveis e empáticas

---

## 🧠 Arquitetura

O projeto segue uma arquitetura **MVC (Model-View-Controller)** organizada por responsabilidade, com separação clara entre:
- Modelos de dados (MongoDB + Mongoose)
- Controladores de lógica de negócio
- Rotas da API REST
- Middlewares reutilizáveis
- Utilitários e helpers isolados

---

## ⚙️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|------------|-----------|
| **Node.js** | Ambiente de execução JavaScript |
| **Express.js** | Framework web minimalista |
| **MongoDB** | Banco de dados NoSQL |
| **Mongoose** | Modelagem de dados com validação |
| **JWT** | Autenticação segura |
| **dotenv** | Gerenciamento de variáveis sensíveis |
| **Nodemon** | Hot reload em dev |
| **Cors** | Permite requisições de outras origens |

---

## 🛠️ Estrutura de Pastas

```bash
.
├── config/           # Conexões e configurações globais
├── controllers/      # Lógica de negócio
├── middleware/       # Middlewares como autenticação e tratamento de erro
├── models/           # Schemas do MongoDB
├── routes/           # Endpoints da API
├── utils/            # Funções auxiliares (ex: gerar token)
├── .env              # Variáveis de ambiente
└── server.js         # Ponto de entrada do app
📁 Link para Frontend
➡️ Em breve: Frontend do projeto (React)

🌐 Rotas da API
Método	Rota	Descrição	Protegida
POST	/api/users	Cadastrar usuário	❌
POST	/api/login	Login e geração de token	❌
GET	/api/me	Retorna dados do usuário	✅

🔐 Autenticação
JWT é gerado no login e enviado via Authorization: Bearer <token>.

O middleware auth.js verifica o token e anexa o usuário à req.user.

📦 Variáveis de Ambiente
Crie um arquivo .env com as seguintes variáveis:

env
Copiar
Editar
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/obemquetequer
JWT_SECRET=uma_chave_secreta_segura
🚀 Como executar
Clone o repositório:

bash
Copiar
Editar
git clone https://github.com/seu-usuario/obemquetequer-backend.git
cd obemquetequer-backend
Instale as dependências:

bash
Copiar
Editar
npm install
Crie o arquivo .env conforme mostrado acima.

Execute o servidor:

bash
Copiar
Editar
npm start
Servidor em: http://localhost:5000

🧪 Testes
Você pode testar a API com ferramentas como:

Postman

Insomnia

Curl:

bash
Copiar
Editar
curl -X POST http://localhost:5000/api/login -d '{"email":"x@x.com", "password":"123"}' -H "Content-Type: application/json"
📈 Futuras implementações
 IA empática com NLP

 Chat em tempo real com WebSocket

 Interface por comandos de voz

 Acessibilidade ampliada

 Aplicativo mobile (React Native ou Flutter)

📁 Link para Frontend
➡️ Em breve: Frontend do projeto (React)

🤝 Contribuições
Pull requests são bem-vindos!
Abra uma issue para discutir melhorias ou relatar bugs.

🧑‍💻 Desenvolvedora
Raquel G. de Souza
💼 Dev Backend em formação | SAP ABAP | Fullstack
📍 Mauá - SP
🔗 GitHub: @seu-usuario

📄 Licença
Distribuído sob a licença MIT. Veja LICENSE para mais detalhes.