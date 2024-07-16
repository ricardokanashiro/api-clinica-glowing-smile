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

type endereco = {
   cidade: string,
   bairro: string,
   rua: string
}

type veterinario = {
   nome: string,
   cpf: string
}

type responsavelAndEndereco = {
   cpf: string,
   nome: string,
   rua: string,
   bairro: string,
   cidade: string
}

// Listar os veterinários
server.get("/veterinarios", async (req, rep) => {

   let veterinario = await new Promise((resolve, reject) => {
      db.all("select * from veterinario", (err, rows) => {
         resolve(rows)
      })
   })

   return rep.send(veterinario)
})

// Pegar endereco de um veterinário
server.get("/veterinario/endereco/:id", async (req, rep) => {
   const { id } = req.params as { id: string }

   let idEndereco: string = await new Promise((resolve, reject) => {
      db.all(`select id_endereco from veterinario where codigo_veterinario = '${id}'`, (err, rows: Array<{ id_endereco: string }>) => {
         resolve(rows[0].id_endereco)
      })
   })

   let endereco = await new Promise((resolve, reject) => {
      db.all(`select * from endereco_veterinario where id_endereco_veterinario = '${idEndereco}'`, (err, rows) => {
         resolve(rows)
      })
   })

   return rep.send(endereco)
})

// Cadastrar um veterinário e seu endereço
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

// Cadastrar um telefone de um veterinário

server.post("/veterinario/telefone/:id", async (req, rep) => {
   const { numero } = req.body as { numero: string }
   const { id } = req.params as { id: string }

   db.run(`
      insert into telefones_veterinario (id_veterinario, numero) 
      values (?, ?)
   `, [id, numero])

   let newTelefone = await new Promise((resolve, reject) => {
      db.prepare("select * from telefones_veterinario where id_veterinario = ? and numero = ?")
         .get([id, numero], (err, rows) => {
            resolve(rows)
         })
   })

   return rep.status(201).send(newTelefone)
})

// Obter os telefones de um veterinário

server.get("/veterinario/telefone/:id", async (req, rep) => {
   const { id } = req.params as { id: string }

   const telefones = await new Promise((resolve, reject) => {
      db.prepare("select * from telefones_veterinario where id_veterinario = ?")
         .all(id, (err, rows) => {
            resolve(rows)
         })
   })

   return rep.status(200).send(telefones)

})

// Editar telefone de um veterinário

server.put("/veterinario/telefone/:id", async (req, rep) => {
   const { id } = req.params as { id: string }
   const { numero, novoNumero } = req.body as { numero: string, novoNumero: string }

   db.prepare("update telefones_veterinario set numero = ? where id_veterinario = ? and numero = ?")
   .run([novoNumero, id, numero])

   let numeroUpdated = await new Promise((resolve, reject) => {
      db.prepare("select * from telefones_veterinario where id_veterinario = ? and numero = ?")
      .get([id, novoNumero], (err, rows) => {
         resolve(rows)
      })
   })

   return rep.status(200).send(numeroUpdated)
})

// Deletar telefone de um veterinário

server.delete("/veterinario/telefone/:id", (req, rep) => {
   const { id } = req.params as { id: string }
   const { numero } = req.body as { numero: string }

   db.prepare("delete from telefones_veterinario where id_veterinario = ? and numero = ?")
   .run([id, numero])

   return rep.status(200).send('Telefone deletado com sucesso!')
})

// Atualizar veterinário
server.put("/veterinario/:id", async (req, rep) => {
   const { nome, cpf } = req.body as veterinario
   const { id } = req.params as { id: string }

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
   const { id } = req.params as { id: string }

   let enderecoId: string = await new Promise((resolve, reject) => {
      db.all(`select id_endereco from veterinario where codigo_veterinario = '${id}'`, (err, rows: Array<{ id_endereco: string }>) => {
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

// Deletar veterinário e endereco
server.delete("/veterinario/:id", async (req, rep) => {
   const { id } = req.params as { id: string }

   let enderecoId: string = await new Promise((resolve, reject) => {
      db.all(`select id_endereco from veterinario where codigo_veterinario = '${id}'`, (err, rows: Array<{ id_endereco: string }>) => {
         resolve(rows[0].id_endereco)
      })
   })

   db.exec(`delete from veterinario where codigo_veterinario = '${id}'`)
   db.exec(`delete from endereco_veterinario where id_endereco_veterinario = '${enderecoId}'`)

   return rep.status(200).send('foi')
})

// Criar um responsável

server.post("/responsavel", async (req, rep) => {
   const { cpf, nome, cidade, bairro, rua } = req.body as responsavelAndEndereco
   const enderecoId = uuidv4().substring(0,12)

   db.prepare("insert into endereco_responsavel (id_endereco, cidade, bairro, rua) values (?, ?, ?, ?)")
   .run([enderecoId, cidade, bairro, rua])

   db.prepare("insert into responsavel (CPF, nome, id_endereco) values (?, ?, ?)")
   .run([cpf, nome, enderecoId])

   let newResponsavel = await new Promise((resolve, reject) => {
      db.prepare("select * from responsavel where cpf = ?")
      .get(cpf, (err, row) => {
         resolve(row)
      })
   })

   let newEndereco = await new Promise((resolve, reject) => {
      db.prepare("select * from endereco_responsavel where id_endereco = ?")
      .get(enderecoId, (err, row) => {
         resolve(row)
      })
   })

   return rep.status(201).send([newResponsavel, newEndereco])
})

// Obter todos os responsáveis
// Obter endereço de um responsável
// Editar um responsável
// Editar endereço de um responsável
// Deletar um responsável

// Cadastrar um telefone de um responsável
// Obter telefones de um responsável
// Deletar um telefone de um responsável
// Editar um telefone de um responsável

server.listen({
   port: 4444
}).then(() => console.log('Server ON'))