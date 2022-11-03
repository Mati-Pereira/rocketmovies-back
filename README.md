
# RocketMovies - Backend

Aplicação que registra título, descrição e demais informações, para poder guardá-las como o usuário desejar, podendo também dar uma avaliação/nota para o filme que assistiu. Assim, no geral, guardando as experiências quando assistiu cada filme.

## Autores

- [@Mati-Pereira](https://www.github.com/Mati-Pereira)


## Funcionalidades

- Autenticação com JWT;
- Salvar foto em seu perfil;
- Anotar os filmes que assistiu, dando assim uma avaliação para cada.


## Rodar Localmente

Para rodar ocalmente esse projeto rode


#### Desenvolvimento

```bash
  yarn # instala node_modules
  yarn dev # roda em modo desenvolvimento
```

#### Produção 

```bash
  yarn # instala node_modules
  yarn prod # roda em modo produção
```

## Stack

 - [Knex.js](https://knexjs.org/)
 - [Express.js](https://expressjs.com/pt-br/)
 - [PostgreSQL](https://www.postgresql.org/)
 - [Node.js](https://nodejs.org/pt-br/)


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`PORT` 

`APP_SECRET` 

`DATABASE_URL`
## Licença

[MIT](https://choosealicense.com/licenses/mit/)

