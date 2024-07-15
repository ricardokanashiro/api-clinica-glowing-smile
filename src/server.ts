import fastify from "fastify"
import { v4 as uuidv4 } from "uuid"

import { db } from "./configDB"

const server = fastify()

type veterinariosAndEndereco = {
   cidade: string,
   bairro: string,
   rua: string,
   cpf: string,
   nome: string
}

type idEndereco = {
   id: string
}

type endereco = {
   cidade: string,
   bairro: string,
   rua: string
}

type enderecoObj = {
   id_endereco: string
}

type veterinario = {
   nome: string,
   cpf: string
}

type idVeterinario = {
   id: string
}

server.get("/veterinarios", async (req, rep) => {

   let veterinario = await new Promise((resolve, reject) => {
      db.all("select * from veterinario", (err, rows) => {
         resolve(rows)
      })
   })

   return rep.send(veterinario)
})

server.get("/veterinario/endereco/:id", async (req, rep) => {
   const { id } = req.params as idEndereco

   let endereco = await new Promise((resolve, reject) => {
      db.all(`select * from endereco_veterinario where id_endereco_veterinario = '${id}'`, (err, rows) => {
         resolve(rows)
      })
   })

   return rep.send(endereco)
})

server.post("/veterinario", async (req, rep) => {

   const { cidade, bairro, rua, cpf, nome } = req.body as veterinariosAndEndereco
   const id_endereco = uuidv4().substring(0, 12)
   const cod_veterinario = uuidv4().substring(0, 12)

   db.run(`
      insert into endereco_veterinario (id_endereco_veterinario, cidade, bairro, rua) 
      values ('${id_endereco}', '${cidade}', '${bairro}', '${rua}')
   `)

   db.run(`
      insert into veterinario (codigo_veterinario, cpf, nome, id_endereco) 
      values ('${cod_veterinario}', '${cpf}', '${nome}', '${id_endereco}')
   `)

   let newEndereco = await new Promise((resolve, reject) => {
      db.all(`select * from endereco_veterinario where id_endereco_veterinario = '${id_endereco}'`, (err, rows) => {
         resolve(rows)
      })
   })

   let newVeterinario = await new Promise((resolve, reject) => {
      db.all(`select * from veterinario where codigo_veterinario = '${cod_veterinario}'`, (err, rows) => {
         resolve(rows)
      })
   })

   return rep.status(201).send([newVeterinario, newEndereco])
})

// Atualizar veterinario
server.put("/veterinario/:id", async (req, rep) => {
   const { nome, cpf } = req.body as veterinario
   const { id } = req.params as idVeterinario

   db.exec(`
      update veterinario 
      set
         nome = '${nome}',
         cpf = '${cpf}'
      where codigo_veterinario = '${id}'
   `)

   let updatedVeterinario = await new Promise((resolve, reject) => {
      db.all(`select * from veterinario where codigo_veterinario = '${id}'`, (err, rows) => {
         resolve(rows)
      })
   })

   return rep.status(200).send(updatedVeterinario)
})

// Atualizar endereço

server.put("/veterinario/endereco/:id", async (req, rep) => {
   const { cidade, bairro, rua } = req.body as endereco
   const { id } = req.params as idVeterinario

   let enderecoId: string = await new Promise((resolve, reject) => {
      db.all(`select id_endereco from veterinario where codigo_veterinario = '${id}'`, (err, rows: Array<{id_endereco: string}>) => {
         resolve(rows[0].id_endereco)
      })
   })

   db.exec(`
      update endereco_veterinario 
      set
         cidade = '${cidade}',
         bairro = '${bairro}',
         rua = '${rua}'
      where id_endereco_veterinario = '${enderecoId}'
   `)

   let enderecoUpdated = await new Promise((resolve, reject) => {
      db.all(`select * from endereco_veterinario where id_endereco_veterinario = '${enderecoId}'`, (err, rows) => {
         resolve(rows)
      })
   })

   console.log(enderecoUpdated)

   return rep.status(200).send(enderecoUpdated)
})

// Deletar usuario e endereco

server.listen({
   port: 4444
})
