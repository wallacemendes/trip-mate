# Documentação da API Trip Mate

Esta documentação fornece uma visão geral dos endpoints disponíveis, seus formatos de solicitação e resposta, e qualquer informação adicional relacionada à API.

## URL base

A URL base para todos os endpoints da API é: `http://localhost:8000/api`

## Autenticação

A API requer autenticação usando uma abordagem baseada em token. Inclua o token gerado no cabeçalho `Authorization` de cada solicitação.

Exemplo:
```
Authorization: Bearer generated_token_here
```

## Endpoints

### Registro

- URL: `/register`
- Método: `POST`
- Descrição: Registrar um novo usuário.
- Corpo da solicitação:
  - `name` (obrigatório, string): O nome do usuário.
  - `lastName` (obrigatório, string): O sobrenome do usuário.
  - `email` (obrigatório, string): O endereço de e-mail do usuário.
  - `password` (obrigatório, string): A senha da conta do usuário.
- Corpo da resposta:
  - `user` (objeto): Detalhes do usuário registrado.
    - `id` (inteiro): O ID do usuário.
    - `name` (string): O nome do usuário.
    - `lastName` (string): O sobrenome do usuário.
    - `email` (string): O endereço de e-mail do usuário.
  - `token` (string): O token de autenticação gerado.
- Exemplo:
  - Solicitação:
    ```json
    POST /register

    {
      "name": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "password": "minhasenha"
    }
    ```
  - Resposta:
    ```json
    {
      "user": {
        "id": 1,
        "name": "John",
        "lastName": "Doe",
        "email": "johndoe@example.com"
      },
      "token": "generated_token_here"
    }
    ```

### Login

- URL: `/login`
- Método: `POST`
- Descrição: Fazer login no aplicativo.
- Corpo da solicitação:
  - `email` (obrigatório, string): O endereço de e-mail do usuário.
  - `password` (obrigatório, string): A senha da conta do usuário.
- Corpo da resposta:
  - `message` (string): Uma mensagem indicando o status de login.
  - `token` (string): O token de autenticação gerado.
- Exemplo:
  - Solicitação:
    ```json
    POST /login

    {
      "email": "johndoe@example.com",
      "password": "minhasenha"
    }
    ```
  - Resposta:
    ```json
    {
      "message": "Login realizado com sucesso",
      "token": "generated_token_here"
    }
    ```

## Endpoints de Compartilhamento de Viagens

### Compartilhar uma Viagem

- URL: `/sharing/invite`
- Método: `POST`
- Descrição: Compartilhe uma viagem com um usuário, gerando e retornando um token de compartilhamento único.
- Corpo da Solicitação:
  - `trip_id` (inteiro, obrigatório): O ID da viagem a ser compartilhada.
- Corpo da Resposta:
  - `token` (string): O token de compartilhamento para a viagem.
- Respostas de Erro:
  - `403 Forbidden: Viagem não pertence a este usuário`
    - Retornada se a viagem não pertencer ao usuário autenticado.
- Exemplo:
  - Solicitação:
    ```
    POST /sharing/invite
    {
      "trip_id": 1
    }
    ```
  - Resposta:
    ```json
    {
      "token": "abc123xyz"
    }
    ```

### Aceitar um Convite para a Viagem

- URL: `/sharing/accept-invite`
- Método: `POST`
- Descrição: Aceite um convite para uma viagem compartilhada usando o token de compartilhamento.
- Corpo da Solicitação:
  - `token` (string, obrigatório): O token de compartilhamento do convite para a viagem.
- Corpo da Resposta:
  - `message` (string): Uma mensagem indicando se o convite foi aceito ou se a viagem já está compartilhada com o usuário.
- Respostas de Erro:
  - `403 Forbidden: O proprietário não pode aceitar um convite da própria viagem`
    - Retornada se o usuário autenticado for o proprietário da viagem e tentar aceitar o próprio convite.
- Exemplo:
  - Solicitação:
    ```
    POST /sharing/accept-invite
    {
      "token": "abc123xyz"
    }
    ```
  - Resposta:
    ```json
    {
      "message": "Convite aceito."
    }
    ```

### Excluir o Token de Compartilhamento da Viagem

- URL: `/sharing/delete-token`
- Método: `DELETE`
- Descrição: Exclua o token de compartilhamento de uma viagem.
- Corpo da Solicitação: Nenhum
- Corpo da Resposta: Nenhum
- Exemplo:
  - Solicitação:
    ```
    DELETE /sharing/delete-token
    ```
  - Resposta:
    `204 Sem Conteúdo`


## Endpoints das Viagens


### Viagens

- URL: `/trips`
- Método: `GET`
- Descrição: Obter uma lista de todas as viagens.
- Corpo da resposta:
  - Uma matriz de objetos de viagem:
    - `id` (inteiro): O ID da viagem.
    - `title` (string): O título da viagem.
    - `startDate` (string): A data de início da viagem.
    - `endDate` (string): A data de término da viagem.
    - `location` (string): A localização da viagem.
    - `currency` (string): A moeda da viagem.
    - `budget` (numérico): O orçamento para a viagem.
    - `userId` (inteiro): O ID do usuário que criou a viagem.
    
- Exemplo:
  - Solicitação:
    ```
    GET /trips
    ```
  - Resposta:
    ```json
    [
      {
        "id": 1,
        "title": "Viagem para Nova York",
        "startDate": "2023-07-01",
        "endDate": "2023-07-10",
        "location": "Nova York",
        "currency": "USD",
        "budget": 5000,
        "userId": 1,
      },
      {
        "id": 12,
        "title": "trip to Hollywood",
        "startDate": "2023-07-01",
        "endDate": "2023-07-10",
        "location": "USA",
        "currency": "USD",
        "budget": 10000,
        "userId": 4
      },
      {
        "id": 11,
        "title": "Trip to Aracaju",
        "startDate": "2023-06-27",
        "endDate": "2023-06-27",
        "location": "Sergipe",
        "currency": "BRL",
        "budget": 3000,
        "userId": 3
       }
    ]  
    ```

### Obter uma Viagem Específica (sem atividades)

- URL: `/trips/{tripId}`
- Método: `GET`
- Descrição: Recuperar uma viagem específica sem as atividades associadas.
- Corpo da Resposta:
  - O objeto da viagem com as seguintes propriedades:
    - `id` (inteiro): O ID da viagem.
    - `title` (string): O título da viagem.
    - `startDate` (data): A data de início da viagem.
    - `endDate` (data): A data de término da viagem.
    - `location` (string): O local da viagem.
    - `currency` (string): A moeda usada na viagem.
    - `budget` (numérico): O orçamento para a viagem.
    - `userId` (inteiro): O ID do usuário proprietário da viagem.
- Exemplo:
  - Solicitação:
    ```
    GET /trips/1
    ```
  - Resposta:
    ```json
    {
      "id": 1,
      "title": "Férias de Verão",
      "startDate": "2023-06-25",
      "endDate": "2023-07-05",
      "location": "Resort de Praia",
      "currency": "USD",
      "budget": 2000,
      "userId": 1
    }
    ```

### Obter uma Viagem Específica (com atividades)

- URL: `/trips/{tripId}`
- Método: `GET`
- Descrição: Recuperar uma viagem específica juntamente com suas atividades associadas.
- Parâmetros de Consulta:
  - `include` (opcional, string): Lista separada por vírgulas dos recursos relacionados incluídos. Use `include=activities` para incluir as atividades associadas à viagem.
- Corpo da Resposta:
  - O objeto da viagem com as seguintes propriedades:
    - `id` (inteiro): O ID da viagem.
    - `title` (string): O título da viagem.
    - `startDate` (data): A data de início da viagem.
    - `endDate` (data): A data de término da viagem.
    - `location` (string): O local da viagem.
    - `currency` (string): A moeda usada na viagem.
    - `budget` (numérico): O orçamento para a viagem.
    - `userId` (inteiro): O ID do usuário proprietário da viagem.
    - `activities` (array): Um array de objetos de atividades associadas à viagem.
      - Cada objeto de atividade possui as seguintes propriedades:
        - `id` (inteiro): O ID da atividade.
        - `title` (string): O título da atividade.
        - `date` (data): A data da atividade.
        - `time` (hora): A hora da atividade.
        - `description` (string): A descrição da atividade.
        - `cost` (numérico): O custo total da atividade (soma das despesas).
        - `budget` (numérico): O orçamento

 para a atividade.
        - `tripId` (inteiro): O ID da viagem associada à atividade.
- Exemplo:
  - Solicitação:
    ```
    GET /trips/1?include=activities
    ```
  - Resposta:
    ```json
    {
      "id": 1,
      "title": "Férias de Verão",
      "startDate": "2023-06-25",
      "endDate": "2023-07-05",
      "location": "Resort de Praia",
      "currency": "USD",
      "budget": 2000,
      "userId": 1,
      "activities": [
        {
          "id": 1,
          "title": "Dia na Praia",
          "date": "2023-06-27",
          "time": "10:00:00",
          "description": "Aproveite um dia relaxante na praia",
          "cost": 80,
          "budget": 100,
          "tripId": 1
        },
        {
          "id": 2,
          "title": "Passeio de Caminhada",
          "date": "2023-06-30",
          "time": "09:00:00",
          "description": "Explore as montanhas próximas",
          "cost": 50,
          "budget": 80,
          "tripId": 1
        }
      ]
    }
    ```


### Criar uma Viagem

- URL: `/trips`
- Método: `POST`
- Descrição: Criar uma nova viagem.
- Corpo da Solicitação:
  - `title` (obrigatório, string): O título da viagem.
  - `startDate` (obrigatório, data): A data de início da viagem.
  - `endDate` (obrigatório, data): A data de término da viagem.
  - `location` (string): A localização da viagem.
  - `currency` (obrigatório, string): A moeda da viagem (BRL, USD, EUR).
  - `budget` (numérico): O orçamento para a viagem.
- Corpo da Resposta:
  - O objeto da viagem criada com as seguintes propriedades:
    - `id` (inteiro): O ID da viagem.
    - `title` (string): O título da viagem.
    - `startDate` (string): A data de início da viagem.
    - `endDate` (string): A data de término da viagem.
    - `location` (string): A localização da viagem.
    - `currency` (string): A moeda da viagem.
    - `budget` (numérico): O orçamento para a viagem.
    - `userId` (inteiro): O ID do usuário que criou a viagem.
- Exemplo:
  - Solicitação:
    ```json
    POST /trips

    {
      "title": "Férias de Verão",
      "startDate": "2023-07-01",
      "endDate": "2023-07-10",
      "location": "Cidade da Praia",
      "currency": "USD",
      "budget": 5000
    }
    ```
  - Resposta:
    ```json
    {
      "id": 1,
      "title": "Férias de Verão",
      "startDate": "2023-07-01",
      "endDate": "2023-07-10",
      "location": "Cidade da Praia",
      "currency": "USD",
      "budget": 5000,
      "userId": 1
    }
    ```

### Atualizar uma Viagem

- URL: `/trips/{tripId}`
- Método: `PUT/PATCH`
- Descrição: Atualizar uma viagem existente.
- Corpo da Solicitação:
  - `title` (às vezes obrigatório, string): O título da viagem.
  - `startDate` (às vezes obrigatório, data): A data de início da viagem.
  - `endDate` (às vezes obrigatório, data): A data de término da viagem.
  - `location` (às vezes string): A localização da viagem.
  - `currency` (às vezes obrigatório, string): A moeda da viagem (BRL, USD, EUR).
  - `budget` (às vezes numérico): O orçamento para a viagem.
- Corpo da Resposta:
  - `message` (string): Uma mensagem indicando o sucesso da operação de atualização.
- Exemplo:
  - Solicitação:
    ```json
    PUT/trips/1

    {
      "title": "Férias de Verão 2023",
      "startDate": "2023-07-01",
      "endDate": "2023-07-15",
      "location": "Cidade da Praia",
      "currency": "USD",
      "budget": 6000
    }
    ```
  - Resposta:
    ```json
    {
      "message": "Viagem atualizada com sucesso"
    }
    ```

### Excluir uma Viagem

- URL: `/trips/{tripId}`
- Método: `DELETE`
- Descrição: Excluir uma viagem existente.
- Corpo da Resposta:
  - `message` (string): Uma mensagem indicando o sucesso da operação de exclusão.
- Exemplo:
  - Solicitação:
    ```
    DELETE /trips/1
    ```
  - Resposta:
    ```json
    {
      "message": "Viagem excluída com sucesso"
    }
    ```

## Endpoints das Atividades

### Obter Todas as Atividades

- URL: `/trips/{tripId}/activities`
- Método: `GET`
- Descrição: Recupera todas as atividades associadas a uma viagem específica.
- Corpo da Resposta:
  - Um array de objetos de atividade, onde cada objeto representa uma atividade associada à viagem. Cada objeto de atividade possui as seguintes propriedades:
    - `id` (inteiro): O ID da atividade.
    - `title` (string): O título da atividade.
    - `date` (data): A data da atividade.
    - `time` (hora): A hora da atividade.
    - `description` (string): A descrição da atividade.
    - `cost` (numérico): O custo total da atividade (soma das despesas).
    - `budget` (numérico): O orçamento para a atividade.
    - `tripId` (inteiro): O ID da viagem associada à atividade.
    - `expenses` (array): Um array de objetos de despesa associados à atividade. Cada objeto de despesa possui as seguintes propriedades:
      - `id` (inteiro): O ID da despesa.
      - `description` (string): A descrição da despesa.
      - `amount` (numérico): O valor da despesa.
      - `activityId` (inteiro): O ID da atividade associada à despesa.
- Exemplo:
  - Solicitação:
    ```
    GET /trips/1/activities
    ```
  - Resposta:
    ```json
    [
      {
        "id": 1,
        "title": "Dia na Praia",
        "date": "2023-06-27",
        "time": "10:00:00",
        "description": "Aproveite um dia relaxante na praia",
        "cost": 80,
        "budget": 100,
        "tripId": 1,
        "expenses": [
          {
            "id": 1,
            "description": "Aluguel de guarda-sol",
            "amount": 20,
            "activityId": 1
          },
          {
            "id": 2,
            "description": "Lanches e bebidas",
            "amount": 15,
            "activityId": 1
          }
        ]
      },
      {
        "id": 2,
        "title": "Passeio de Caminhada",
        "date": "2023-06-30",
        "time": "09:00:00",
        "description": "Explore as montanhas próximas",
        "cost": 50,
        "budget": 80,
        "tripId": 1,
        "expenses": [
          {
            "id": 3,
            "description": "Aluguel de equipamentos de caminhada",
            "amount": 30,
            "activityId": 2
          },
          {
            "id": 4,
            "description": "Taxa do guia",
            "amount": 20,
            "activityId": 2
          }
        ]
      }
    ]
    ```

### Obter uma Atividade Específica

- URL: `/trips/{tripId}/activities/{activityId}`
- Método: `GET`
- Descrição: Recupera uma atividade específica associada a uma viagem.

- Exemplo:
  - Solicitação:
    ```
    GET /trips/1/activities/1
    ```
  - Resposta:
    ```json
    {
      "id": 1,
      "title": "Dia na Praia",
      "date": "2023-06-27",
      "time": "10:00:00",
      "description": "Aproveite um dia relaxante na praia",
      "cost": 80,
      "budget": 100,
      "tripId": 1,
      "expenses": [
        {
          "id": 1,
          "description": "Aluguel de guarda-sol",
          "amount": 20,
          "activityId": 1
        },
        {
          "id": 2,
          "description": "Lanches e bebidas",
          "amount": 15,
          "activityId": 1
        }
      ]
    }
    ```

### Criar uma Atividade

- URL: `/trips/{tripId}/activities`
- Método: `POST`
- Descrição: Criar uma nova atividade para uma viagem.
- Corpo da Solicitação:
  - `title` (obrigatório, string): O título da atividade.
  - `date` (obrigatório, data): A data da atividade.
  - `time` (data): A hora da atividade.
  - `description` (string): A descrição da atividade.
  - `budget` (numérico): O orçamento para a atividade.
- Corpo da Resposta:
  - O objeto da atividade criada com as seguintes propriedades:
    - `id` (inteiro): O ID da atividade.
    - `title` (string): O título da atividade.
    - `date` (string): A data da atividade.
    - `time` (string): A hora da atividade.
    - `description` (string): A descrição da atividade.
    - `cost` (numérico): O custo total da atividade (soma das despesas).
    - `budget` (numérico): O orçamento para a atividade.
    - `tripId` (inteiro): O ID da viagem associada à atividade.
- Exemplo:
  - Solicitação:
    ```json
    POST /trips/1/activities

    {
      "title": "Dia de Praia",
      "date": "2023-07-05",
      "time": "09:00",
      "description": "Aproveite um dia na praia",
      "budget": 200
    }
    ```
  - Resposta:
    ```json
    {
      "id": 1,
      "title": "Dia de Praia",
      "date": "2023-07-05",
      "time": "09:00",
      "description": "Aproveite um dia na praia",
      "cost": 0,
      "budget": 200,
      "tripId": 1
    }
    ```

### Atualizar uma Atividade

- URL: `/trips/{tripId}/activities/{activityId}`
- Método: `PUT/PATCH`
- Descrição: Atualizar uma atividade existente.
- Corpo da Solicitação:
  - `title` (às vezes obrigatório, string): O título da atividade
  - `date` (às vezes obrigatório, data): A data da atividade.
  - `time` (às vezes data): A hora da atividade.
  - `description` (às vezes string): A descrição da atividade.
  - `budget` (às vezes numérico): O orçamento para a atividade.
- Corpo da Resposta:
  - `message` (string): Uma mensagem indicando o sucesso da operação de atualização.
- Exemplo:
  - Solicitação:
    ```json
    PUT /trips/1/activities/1

    {
      "title": "Dia de Praia",
      "date": "2023-07-05",
      "time": "10:00",
      "description": "Aproveite um dia na praia",
      "budget": 250
    }
    ```
  - Resposta:
    ```json
    {
      "message": "Atividade atualizada com sucesso"
    }
    ```

### Excluir uma Atividade

- URL: `/trips/{tripId}/activities/{activityId}`
- Método: `DELETE`
- Descrição: Excluir uma atividade existente.
- Corpo da Resposta:
  - `message` (string): Uma mensagem indicando o sucesso da operação de exclusão.
- Exemplo:
  - Solicitação:
    ```
    DELETE /trips/1/activities/1
    ```
  - Resposta:
    ```json
    {
      "message": "Atividade excluída com sucesso"
    }
    ```

## Endpoints das Despesas

### Obter Todas as Despesas

- URL: `/trips/{tripId}/activities/{activityId}/expenses`
- Método: `GET`
- Descrição: Recupera todas as despesas associadas a uma atividade específica.
- Corpo da Resposta:
  - Um array de objetos de despesa, onde cada objeto representa uma despesa associada à atividade. Cada objeto de despesa possui as seguintes propriedades:
    - `id` (inteiro): O ID da despesa.
    - `description` (string): A descrição da despesa.
    - `amount` (numérico): O valor da despesa.
    - `activityId` (inteiro): O ID da atividade associada à despesa.
- Exemplo:
  - Solicitação:
    ```
    GET /trips/1/activities/1/expenses
    ```
  - Resposta:
    ```json
    [
      {
        "id": 1,
        "description": "Aluguel de guarda-sol",
        "amount": 20,
        "activityId": 1
      },
      {
        "id": 2,
        "description": "Lanches e bebidas",
        "amount": 15,
        "activityId": 1
      }
    ]
    ```

### Obter uma Despesa Específica

- URL: `/trips/{tripId}/activities/{activityId}/expenses/{expenseId}`
- Método: `GET`
- Descrição: Recupera uma despesa específica associada a uma atividade.
- Exemplo:
  - Solicitação:
    ```
    GET /trips/1/activities/1/expenses/1
    ```
  - Resposta:
    ```json
    {
      "id": 1,
      "description": "Aluguel de guarda-sol",
      "amount": 20,
      "activityId": 1
    }
    ```



### Criar uma Despesa

- URL: `/trips/{tripId}/activities/{activityId}/expenses`
- Método: `POST`
- Descrição: Criar uma nova despesa para uma atividade.
- Corpo da Solicitação:
  - `description` (string): A descrição da despesa.
  - `amount` (obrigatório, numérico): O valor da despesa.
- Corpo da Resposta:
  - O objeto da despesa criada com as seguintes propriedades:
    - `id` (inteiro): O ID da despesa.
    - `description` (string): A descrição da despesa.
    - `amount` (numérico): O valor da despesa.
    - `activityId` (inteiro): O ID da atividade associada à despesa.
- Exemplo:
  - Solicitação:
    ```json
    POST /trips/1/activities/1/expenses

    {
      "description": "Almoço na praia",
      "amount": 50
    }
    ```
  - Resposta:
    ```json
    {
      "id": 1,
      "description": "Almoço na praia",
      "amount": 50,
      "activityId": 1
    }
    ```

### Atualizar uma Despesa

- URL: `/trips/{tripId}/activities/{activityId}/expenses/{expenseId}`
- Método: `PUT/PATCH`
- Descrição: Atualizar uma despesa existente.
- Corpo da Solicitação:
  - `description` (às vezes string): A descrição da despesa.
  - `amount` (às vezes obrigatório, numérico): O valor da despesa.
- Corpo da Resposta:
  - `message` (string): Uma mensagem indicando o sucesso

 da operação de atualização.
- Exemplo:
  - Solicitação:
    ```json
    PUT /trips/1/activities/1/expenses/1

    {
      "description": "Jantar em um restaurante local",
      "amount": 80
    }
    ```
  - Resposta:
    ```json
    {
      "message": "Despesa atualizada com sucesso"
    }
    ```

### Excluir uma Despesa

- URL: `/trips/{tripId}/activities/{activityId}/expenses/{expenseId}`
- Método: `DELETE`
- Descrição: Excluir uma despesa existente.
- Corpo da Resposta:
  - `message` (string): Uma mensagem indicando o sucesso da operação de exclusão.
- Exemplo:
  - Solicitação:
    ```
    DELETE /trips/1/activities/1/expenses/1
    ```
  - Resposta:
    ```json
    {
      "message": "Despesa excluída com sucesso"
    }
    ```


