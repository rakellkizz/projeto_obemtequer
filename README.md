# 🌼 O Bem Te Quer – Projeto de Acolhimento Digital com IA 💜

> Plataforma empática com acessibilidade, inteligência artificial e apoio emocional.  
> Desenvolvido com amor, tecnologia e propósito! 🚀

---

## 🧭 Índice

- [🎯 Missão do Projeto](#-missão-do-projeto)
- [💡 Visão Geral](#-visão-geral)
- [📦 Estrutura do Repositório](#-estrutura-do-repositório)
- [⚙️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [🧠 Arquitetura MVC](#-arquitetura-mvc)
- [🔐 Autenticação JWT](#-autenticação-jwt)
- [🌐 Rotas da API (Backend)](#-rotas-da-api-backend)
- [🌈 Frontend com Acessibilidade e IA](#-frontend-com-acessibilidade-e-ia)
- [🚀 Como Rodar Localmente](#-como-rodar-localmente)
- [🧪 Testes](#-testes)
- [🤖 Integração Contínua (CI/CD)](#-integração-contínua-cicd)
- [🧭 Roadmap do Projeto](#-roadmap-do-projeto)
- [📱 Futuras Implementações](#-futuras-implementações)
- [🤝 Como Contribuir](#-como-contribuir)
- [👩‍💻 Autoria](#-autoria)

---

## 🎯 Missão do Projeto

Criar uma plataforma **acolhedora, acessível e empática** voltada para **pessoas em vulnerabilidade emocional**.  
Com recursos de **escuta ativa, IA, acessibilidade por voz, e jogos terapêuticos**, como o xadrez, promovemos **acolhimento digital de verdade**! 💬🤗

---

## 💡 Visão Geral

A aplicação é composta por:

- 🔐 **Backend** com autenticação, controle de usuários e estrutura segura
- 🧠 **Frontend** React com integração de IA (voz, fala, chatbot Ben 🤖)
- ♿ **Acessibilidade total** (voz, leitura, contraste, inclusão)
- ♟️ **Jogo de Xadrez com IA**, reforços emocionais e feedback falado
- 📊 **Estatísticas do usuário** e sistema de conquistas
- ⚡ **PWA com suporte offline**

---

## 📦 Estrutura do Repositório

📁 projeto_obemtequer/
├── backend/ # Node.js + Express + MongoDB
├── frontend/ # React + Vite + Tailwind + IA
├── docs/ # Documentações extras (PDF, Kanban, TMMi, etc)
├── .github/workflows # CI/CD com GitHub Actions
└── README.md # Você está aqui 💜

---

## ⚙️ Tecnologias Utilizadas

| 🛠️ Tecnologia | 💬 Descrição |
|---------------|--------------|
| **Node.js**    | Execução backend com Express.js |
| **MongoDB**    | Banco de dados NoSQL |
| **JWT**        | Autenticação via token |
| **React.js**   | Interface reativa e acessível |
| **TailwindCSS**| Estilização moderna e acessível |
| **Vite**       | Build rápido do frontend |
| **PWA**        | Funciona offline (com `vite-plugin-pwa`) |
| **Speech API** | Reconhecimento e síntese de voz |
| **Chess.js**   | Lógica do jogo de xadrez |

---

## 🧠 Arquitetura MVC

> O backend segue a estrutura padrão **Model-View-Controller**:

📁 backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
└── server.js

---

## 🔐 Autenticação JWT

- Login gera um token JWT seguro ✅  
- Token é enviado via Header:  
  `Authorization: Bearer <token>`
- Middleware de proteção: `auth.js`

---

## 🌐 Rotas da API (Backend)

| Método | Endpoint      | Função               | Protegida 🔒 |
|--------|----------------|----------------------|-------------|
| POST   | /api/users     | Cadastro de usuários | ❌          |
| POST   | /api/login     | Login e token        | ❌          |
| GET    | /api/me        | Dados do usuário     | ✅          |

---

## 🌈 Frontend com Acessibilidade e IA

- ♿ Interface com contraste, leitura por voz, atalhos
- 💬 Chatbot **Ben** com respostas empáticas (OpenAI/Gemini)
- ♟️ Jogo de **Xadrez com IA**, fala acessível e reforços emocionais
- 🎙️ Leitura das jogadas por voz
- 🌐 Totalmente responsivo (mobile/desktop)
- 📲 Instalável como **PWA**

---

## 🚀 Como Rodar Localmente

```bash
# Clone o repositório
git clone https://github.com/rakellkizz/projeto_obemtequer.git
cd projeto_obemtequer

# Instale dependências do backend
cd backend
npm install
npm run dev

# Em outro terminal, instale o frontend
cd ../frontend
npm install
npm run dev
🧪 Testes

✅ Pode ser testado via Postman, Insomnia ou Hoppscotch

💬 Teste o fluxo completo de login e chamadas autenticadas

🧭 Roadmap do Projeto

📌 Tarefas, ideias e bugs são gerenciados no Quadro Kanban
 do GitHub Projects.

 📱 Futuras Implementações

1-🤖 IA empática (HuggingFace / Gemini / OpenAI)

2-🔊 Comandos de voz e leitura personalizada

3-🧏‍♀️ Modo acessível por LIBRAS

4-📲 App mobile (React Native / Flutter)

5-📦 Painel administrativo com analytics

6-🔐 Autenticação social (Google, GitHub)


🤝 Como Contribuir

1-🍴 Fork este repositório

2-📚 Crie sua branch: feature/minha-mudanca

3-💾 Commit suas alterações

4-🚀 Faça um Pull Request

5-💬 Sugestões? Abra uma issue!

👩‍💻 Autoria

Desenvolvido com ❤️ por Raquel G. de Souza
💼 Bacharel em Sistemas de Informação 
📍 Mauá - SP
🔗 GitHub
📧 rakellkizz@gmail.com