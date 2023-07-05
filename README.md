# Seja bem vindo(a) ao Trip Mate! ✈️

🧳 O Trip Mate é um sistema que permite ao usuário incluir e gerenciar atividades relacionadas a uma viagem, ou seja: criar uma nova viagem, organizar o cronograma de atividades a serem feitas (de lazer/trabalho) durante o período definido pelo usuário. O sistema conterá também orçamento geral e gestão de gastos ao longo da viagem.

### MVP:
- Usuário consegue criar nova viagem com orçamento geral;
- Usuário consegue inserir atividades da viagem e a despesa por atividades;
- Usuário consegue ter visão das despesas e gerenciar orçamento;
- Usuário consegue ter visão geral de todas as suas próximas viagens cadastradas;

# Entregas
### Entrega 0: Modelo de Processos utilizado pelo time:
- Metodologia SCRUM / Kanban
- Reuniões de Sprint Planning e Sprint Review quinzenais
- Reuniões assíncronas terças e quintas a noite
- Reuniões síncronas sábados das 10:00 ás 11:00 (Weekly) via Google Meet

### Entrega 01: [Histórias de Usuário](https://docs.google.com/document/d/14QWPrMIQy--UhU-G_jVXjSDEhRjB-mRFkxPQ74g8CpM/edit?usp=sharing)
### Entrega 02: [Diagrama de Classes](https://drive.google.com/file/d/1qv87CoRT66J5m1p-ipK63F5ai-ExqZWd/view?usp=sharing) | [Casos de Uso](https://drive.google.com/file/d/1rD1WxEWqAvx09jSWH_4SqAT2m-7clLLk/view?usp=sharing)
### Bônus: [Jornada de Usuário](https://miro.com/app/board/uXjVML_a0es=/)

# 🛠 Ferramentas utilizadas:

- Google Meet
- Bizagi Modeler
- Miro (https://miro.com/app/board/uXjVML_a0es=/) 
- LucidChart
- Jira (https://trip-mate.atlassian.net/jira/software/projects/TM/boards/1)
- Github
- VSCode

# 👩🏽‍💻 Stack de desenvolvimento:

Linguagens de programação:
- Typescript 5.0
- PHP 8.1

Frameworks: 
- Front-end: React 18.0
- Back-end: Laravel 10.1

# 🚀 Como rodar o projeto:
- Passo 01: Abra o prompt de comando/terminal e execute o seguinte comando:
  
  ```git clone https://github.com/wallacemendes/trip-mate.git```
- Passo 02: Instale o Docker de acordo com seu Sistema operacional: (https://www.docker.com/products/docker-desktop/)
- Passo 03: Instale o Node.js na sua máquina (https://nodejs.org/pt-br/download/current)
- Passo 04: Navegue até a pasta frontend do projeto `/.../trip-mate/frontend/` e rode o comando `npm install` (caso dê algum erro rode `npm install --force`)
- Passo 05: Com o Docker Desktop já aberto depois de instalado, navegue até a pasta raiz do projeto `/.../trip-mate/` e execute `docker-compose up --build -d`
- Passo 06: Após os 3 containers estiverem rodando, execute no terminal os seguintes comandos:
  
  ```docker exec -it api sh```  para abrir o terminal do container da api

  ```php artisan migrate``` para criar a estrutura do banco de dados

- Passo 07: Se todos os passos deram certo, em seu navegador, acesse: http://localhost:3000 para visualizar o site

# 👥 Time
- [Adriana Silva (Project Manager)](https://github.com/adriianasilva)
- [Murilo Vicente (Desenvolvedor Front-end)](https://github.com/MuriloVi)
- [Wallace Mendes (Desenvolvedor Back-end)](https://github.com/wallacemendes)


Projeto criado para a Disciplina de Engenharia de Software II no semestre 2023.2 da Universidade Federal da Bahia, criado por Adriana Silva, Murilo Vicente e Wallace Mendes 

#### [Acessar Documentação da API](https://github.com/wallacemendes/trip-mate/blob/main/backend/README.md)
