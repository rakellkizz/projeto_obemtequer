# 🌼 Obemquetequer - Backend

> API RESTful desenvolvida para o projeto **Obemquetequer**, uma iniciativa de empatia digital e acolhimento emocional.

---

## 🎯 Missão do Projeto

Criar uma plataforma inclusiva e acolhedora para pessoas em vulnerabilidade emocional, com recursos de escuta empática, inteligência artificial e acessibilidade total.

---

## 💡 Visão Geral

Este backend provê os recursos necessários para:

- Cadastro e autenticação de usuários
- Comunicação segura e escalável com possíveis integrações futuras com IA
- Expansão para interfaces acessíveis e empáticas

---

## 🧠 Arquitetura

O projeto segue a arquitetura **MVC (Model-View-Controller)**, com:

- **Modelos de dados** (MongoDB + Mongoose)
- **Controladores** com lógica de negócio
- **Rotas** organizadas da API REST
- **Middlewares** reutilizáveis (como autenticação)
- **Utilitários** para token e validações

---

## ⚙️ Tecnologias Utilizadas

| Tecnologia     | Descrição                             |
| -------------- |---------------------------------------|
| **Node.js**    | Ambiente de execução JavaScript       |
| **Express.js** |   Framework web minimalista           |
| **MongoDB**    | Banco de dados NoSQL                  |
| **Mongoose**   | ODM para MongoDB com validação        |
| **JWT**        | Autenticação com tokens seguros       |
| **dotenv**     | Variáveis de ambiente                 |
| **Nodemon**    | Hot reload em desenvolvimento         |
| **Cors**       | Permite requisições de outras origens |

---

## 🛠️ Estrutura de Pastas

.
├── config/ # Conexões e configurações globais
├── controllers/ # Lógica de negócio
├── middleware/ # Autenticação e tratamento de erro
├── models/ # Schemas do MongoDB
├── routes/ # Endpoints da API
├── utils/ # Funções auxiliares (ex: gerar token)
├── .env # Variáveis de ambiente
└── server.js # Ponto de entrada do app


---

## 🔐 Autenticação com JWT

- JWT gerado no login
- Enviado via header: `Authorization: Bearer <token>`
- Middleware `auth.js` valida e anexa `req.user`

---

## 🌐 Rotas da API

| Método | Rota         | Descrição               | Protegida |
|--------|--------------|-------------------------|-----------|
| POST   | /api/users   | Cadastrar usuário       | ❌        |
| POST   | /api/login   | Login e geração de token| ❌        |
| GET    | /api/me      | Dados do usuário logado | ✅        |

---

## 📦 Variáveis de Ambiente

Crie um arquivo `.env` com as seguintes variáveis:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/obemquetequer
JWT_SECRET=uma_chave_secreta_segura

🚀 Como executar localmente
git clone https://github.com/rakellkizz/projeto_obemtequer.git
cd projeto_obemtequer
npm install
npm start

🧪 Testes
Você pode testar com:

Postman

Insomnia

Curl:

hoppscotch

curl -X POST http://localhost:5000/api/login \
-d '{"email":"x@x.com", "password":"123"}' \
-H "Content-Type: application/json"


🧭 Roadmap do Projeto
Planejamento e tarefas em andamento estão no nosso Kanban oficial:

👉 Acompanhar no GitHub Projects : ## 🧭 Roadmap

Confira o andamento do projeto no nosso [Quadro Kanban](https://github.com/rakellkizz/projeto_obemtequer/projects/1)


📱 Futuras Implementações
🤖 IA empática com NLP (via HuggingFace)

💬 Chat em tempo real (WebSocket)

🧏 Interface por comandos de voz

♿ Acessibilidade ampliada (voz/texto/Braille)

📲 App mobile (React Native ou Flutter)

🤝 Como contribuir
Fork o repositório

Crie uma branch: feature/minha-feature

Commit suas alterações

Envie um pull request

Dúvidas ou sugestões? Abra uma issue!

👩‍💻 🌸 Desenvolvido com ❤️
 por: Raquel G. de Souza
💼 Dev - Baicharel em Sistema de Informação| SAP ABAP | Fullstack
📍 Mauá - SP
🔗 GitHub: https://github.com/rakellkizz
📧 Email: rakellkizz@gmail.com