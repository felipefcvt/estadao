# 📰 Estadão News

Gerenciamento de notícias com API construída em NestJS, banco de dados PostgreSQL via Prisma ORM e frontend em Next.js 14. Projeto dockerizado para facilitar testes locais.

---

## Tecnologias utilizadas

- **Backend:** NestJS + Prisma + PostgreSQL
- **Frontend:** Next.js 14 (App Router) + TailwindCSS + Context API
- **Docker:** Orquestração de containers para ambiente de desenvolvimento
- **Swagger:** Documentação da API em `/docs`

---

## Pré-requisitos

- [Node.js](https://nodejs.org) 18+
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Como rodar com Docker

```bash
# 1. Clone o repositório
git clone https://github.com/felipefcvt/estadao.git

# 2. Acesse o diretório do projeto
cd estadao

# 3. Suba os containers (backend, frontend e banco de dados)
docker-compose up --build -d
