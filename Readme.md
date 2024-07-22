# API - Clínica Veterinária

## Summary:

- [Overview](#overview)
    - [About](#about)
    - [Features](#features)
    - [Used Techs](#used-techs)
- [How To Use](#how-to-use)
    - [Getting Started](#getting-started)
    - [How to Install](#how-to-install)
    - [Configuring Database and Env Variables](#configuring-database-and-env-variables)
- [Authors](#authors)

<h4 align="center">🌟 Clínica Veterinária API 🔗 concluded - open to updates 🌟</h4>

## Overview:

### About:

This project is based on an API for a veterinary clinic managing system, that register and manage informations about veterinarians, responsibles, pets, medical appointments and more.

Example:

```js
    fetch('http://localhost:4444/veterinario', {
    method: 'POST',
    body: JSON.stringify({
        "cidade": "Jundiaí",
        "bairro": "Eloy Chaves",
        "rua": "9 de Setembro",
        "cpf": "12312312312",
        "nome": "Fulano da Silva"
    }),
    headers:{
        "Content-Type" : "application/json",
    }}
)
    .then(data => res = data.json())
    .catch(console.log)

    /*
        Response: [
            {
                "codigo_veterinario": "0ae5bd97-32d",
                "CPF": "12312312312",
                "nome": "Funalo da Silva",
                "id_endereco": "fde7e3d9-9c5"
            },
            {
                "id_endereco": "fde7e3d9-9c5",
                "cidade": "Jundiaí",
                "bairro": "Eloy Chaves",
                "rua": "Rua 9 de Setembro"
            }
        ]
    */
```

### Features:

- ✅ Users should be able to get all veterinarians;
- ✅ Users should be able to get veterinarian address;
- ✅ Users should be able to register a veterinarian and his address;
- ✅ Users should be able to register a veterinarian's phone;
- ✅ Users should be able to get all veterinarian's phones;
- ✅ Users should be able to delete a veterinarian's phone;
- ✅ Users should be able to update a veterinarian;
- ✅ Users should be able to update a veterinarian's address;
- ✅ Users should be able to delete a veterinarian and his address;
- ✅ Users should be able to register a responsible and his address;
- ✅ Users should be able to get all responsibles;
- ✅ Users should be able to get a especific responsible;
- ✅ Users should be able to get a responsible's address;
- ✅ Users should be able to update a responsible;
- ✅ Users should be able to update a responsible's address;
- ✅ Users should be able to delete a responsible;
- ✅ Users should be able to register a responsible's phone;
- ✅ Users should be able to get all responsible's phones;
- ✅ Users should be able to delete a responsible's phone;
- ✅ Users should be able to register a pet's type;
- ✅ Users should be able to get all pet's types;
- ✅ Users should be able to update a pet's type;
- ✅ Users should be able to delete a pet's type;
- ✅ Users should be able to register a pet;
- ✅ Users should be able to get all pets;
- ✅ Users should be able to get a especific pet;
- ✅ Users should be able to update a pet;
- ✅ Users should be able to delete a pet;
- ✅ Users should be able to get all medical appointments;
- ✅ Users should be able to get a especific medical appointment;
- ✅ Users should be able to update a medical appointment;
- ✅ Users should be able to delete a medical appointment;

### Used Techs:

<a href="https://nodejs.org/docs/latest/api/"><img src="https://img.shields.io/badge/Node.js-000?style=for-the-badge&logo=node.js&logoColor=43853D" /></a>
&nbsp;
<a href="https://fastify.dev/docs/latest/"><img src="https://img.shields.io/badge/Fastify-000?style=for-the-badge&logo=fastify&logoColor=white" /></a>
&nbsp;
<a href="https://www.sqlite.org/"><img src="https://img.shields.io/badge/SQLite-000?style=for-the-badge&logo=sqlite&logoColor=0f3e63" /></a>

- <b>Node</b>: javascript runtime based on Chrome V8 Engine, used to run javascript off browser
- <b>Fastify</b>: micro nodejs framework used to handle http requests and more easier and faster
- <b>SQLite</b>: a lightweight, serverless, self-contained SQL database engine

## How to Use:

### Getting Started:

To run this project in your device you should need some softwares/programs installed in your system:

- <b>Node</b>: is a javascript runtime built on Chrome's V8 engine, used to run javascript as a server in this case. <a href="https://nodejs.org/en/download">Download</a>
- <b>Npm</b>: is a package manager distributed with Node.js, so if you already have NodeJs in your system, you automatically have npm. <a href="https://nodejs.org/en/download">Download</a>
- <b>Yarn</b>: is a package manager provided by Meta, and it's another solution as npm. <a href="https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable">Download</a>

⚠️ Tip: once we have package json, you can install all dependencies using npm or yarn, no need to install both.

### How to Install

To run this API locally follow the following steps:

- This commands will download the project in your device and access his file:

```bash
    git clone https://github.com/ricardokanashiro/api-clinica-veterinaria.git
    git cd api-clinica-veterinaria
```

- This commands will install all the project dependencies and run the server:

```bash
    npm install
    npm dev
```

or 

```bash
    yarn install
    yarn dev
```

### Configuring Database and Env Variables

- This project uses a SQLite that is a serverless database. Then, to configure the database, you will only need to set the sqlite file path on .env:

```env
    DATABASE_PATH="./db.sqlite"
```

⚠️ Tip: DATABASE_PATH tells the SQLite database file path into the project

- And run the createTable script with yarn or npm:

```bash
    npm run db
```

or 

```
    yarn db
```

## Authors:

- <b>Ricardo Kanashiro</b>