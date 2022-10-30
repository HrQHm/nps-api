# NPS-API
[![typescript](https://img.shields.io/badge/typescript-4.3.5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![postgres](https://img.shields.io/badge/typeorm-0.3.10-orang)](https://typeorm.io/)
[![sqlite](https://img.shields.io/badge/sqlite3-5.1.2-blueviolet)](https://www.sqlite.org/index.html)
[![jest](https://img.shields.io/badge/jest-29.2.2-green)](https://jestjs.io/pt-BR/)

--- 

A simple NPS API with email sending

---

### Instalando as dependências

```
$ yarn
```
Ou:
```
$ npm install
```

### **Configurando Banco de dados**
A aplicação usa um único banco de dados para testes, podendo se utilizar qualquer outro banco relacional. No meu caso utilizei o SqLite3.
A nova versão do typeorm requer a configuração do banco utilizado no arquivo index.ts no diretorio src/database. 

### Migrations
Lembre se de rodar a migrations com seguinte comando:

```
$ npm run typeorm migration:run
```

## `.env`
Neste arquivo, você deve configurar a URL para envio e-mail
No diretório raiz crie um arquivo .env e então insira suas configurações de acordo com .env-example

---


### **Rodando a aplicação**
Para iniciar a aplicação rode o comando abaixo.
```
$ yarn dev
```
Ou:
```
npm run dev
```

---


### **Testes**
Todas as rotas da api foram testadas com teste unitário utilizando jest.
