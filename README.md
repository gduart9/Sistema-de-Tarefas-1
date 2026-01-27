# 🗂️ Sistema de Tarefas

Projeto desenvolvido com o objetivo de praticar o desenvolvimento de uma aplicação completa, utilizando **ASP.NET Core no backend** e **React no frontend**, com integração via **API REST**.

O sistema permite que usuários façam login e gerenciem suas próprias tarefas, realizando operações de criação, listagem, edição, conclusão e exclusão.

---

## 🚀 Tecnologias Utilizadas

### 🔧 Backend
- C#
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- Swagger (OpenAPI)
- Injeção de Dependência
- Arquitetura em camadas (Controllers, Repositórios, Data)

### 🎨 Frontend
- React
- JavaScript (ES6+)
- React Hooks (useState, useEffect, useContext)
- Context API
- React Router
- HTML e CSS

---

## 📌 Funcionalidades

- Login e logout de usuário
- Listagem de tarefas
- Criação de novas tarefas
- Edição de tarefas
- Marcar tarefas como concluídas
- Exclusão de tarefas
- Interface simples e responsiva
- Integração completa frontend ↔ backend

---

## ⚙️ Como Executar o Projeto

### Backend
1. Configure a connection string no `appsettings.json`
2. Execute as migrations (se aplicável)
3. Rode o projeto pelo Visual Studio ou `dotnet run`
4. Acesse o Swagger para testar a API

### Frontend
1. Instale as dependências:
   ```bash
   npm install
