import fastify from "fastify"
import { v4 as uuidv4 } from "uuid"

import { db } from "./configDB.js"

const server = fastify()

// Listar os veterinários
server.get("/veterinarios", async (req, rep) => {

   let veterinario = await new Promise((resolve, reject) => {

      db.prepare("select * from veterinario")
      .all((err, rows) => {
         resolve(rows)
      })
   })

   return rep.send(veterinario)
})

// Pegar endereco de um veterinário
server.get("/veterinario/endereco/:id", async (req, rep) => {
   const { id } = req.params

   let { id_endereco } = await new Promise((resolve, reject) => {
      db.prepare("select id_endereco from veterinario where codigo_veterinario = ?")
      .get(id, (err, row) => {
         resolve(row)
      })
   })

   let endereco = await new Promise((resolve, reject) => {
      db.prepare("select * from endereco_veterinario where id_endereco = ?")
      .get(id_endereco, (err, row) => {
         resolve(row)
      })
   })

   return rep.status(200).send(endereco)
})

// Cadastrar um veterinário e seu endereço
server.post("/veterinario", async (req, rep) => {

   const { cidade, bairro, rua, cpf, nome } = req.body
   const id_endereco = uuidv4().substring(0, 12)
   const cod_veterinario = uuidv4().substring(0, 12)

   db.prepare(`
      insert into endereco_veterinario (id_endereco, cidade, bairro, rua)
      values (?, ?, ?, ?)
   `)
      .run([id_endereco, cidade, bairro, rua])

   db.prepare(`
      insert into veterinario (codigo_veterinario, cpf, nome, id_endereco)
      values (?, ?, ?, ?)
   `)
      .run([cod_veterinario, cpf, nome, id_endereco])

   let newEndereco = await new Promise((resolve, reject) => {

      db.prepare("select * from endereco_veterinario where id_endereco = ?")
         .get(id_endereco, (err, row) => {
            resolve(row)
         })
   })

   let newVeterinario = await new Promise((resolve, reject) => {

      db.prepare("select * from veterinario where codigo_veterinario = ?")
         .get(cod_veterinario, (err, row) => {
            resolve(row)
         })
   })

   return rep.status(201).send([newVeterinario, newEndereco])
})

// Cadastrar um telefone de um veterinário

server.post("/veterinario/telefone/:id", async (req, rep) => {
   const { numero } = req.body
   const { id } = req.params

   db.prepare("insert into telefones_veterinario (id_veterinario, numero) values (?, ?)")
      .run([id, numero])

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
   const { id } = req.params

   const telefones = await new Promise((resolve, reject) => {
      db.prepare("select * from telefones_veterinario where id_veterinario = ?")
         .all(id, (err, rows) => {
            resolve(rows)
         })
   })

   return rep.status(200).send(telefones)

})

// Deletar telefone de um veterinário

server.delete("/veterinario/telefone/:id", (req, rep) => {
   const { id } = req.params
   const { numero } = req.body

   db.prepare("delete from telefones_veterinario where id_veterinario = ? and numero = ?")
      .run([id, numero])

   return rep.status(200).send('Telefone deletado com sucesso!')
})

// Atualizar veterinário
server.put("/veterinario/:id", async (req, rep) => {
   const { nome, cpf } = req.body
   const { id } = req.params

   db.prepare("update veterinario set nome = ?, CPF = ? where codigo_veterinario = ?")
   .run([nome, cpf, id])

   let updatedVeterinario = await new Promise((resolve, reject) => {

      db.prepare("select * from veterinario where codigo_veterinario = ?")
      .get(id, (err, row) => {
         resolve(row)
      })
   })

   return rep.status(200).send(updatedVeterinario)
})

// Atualizar endereço
server.put("/veterinario/endereco/:id", async (req, rep) => {
   const { cidade, bairro, rua } = req.body
   const { id } = req.params

   let { id_endereco } = await new Promise((resolve, reject) => {

      db.prepare("select id_endereco from veterinario where codigo_veterinario = ?")
      .get(id, (err, row) => {
         resolve(row)
      })
   })

   db.prepare(`
      update endereco_veterinario set
         cidade = ?, bairro = ?, rua = ?
      where id_endereco = ?
   `)
      .run([cidade, bairro, rua, id_endereco])

   let enderecoUpdated = await new Promise((resolve, reject) => {

      db.prepare("select * from endereco_veterinario where id_endereco = ?")
      .get(id_endereco, (err, row) => {
         resolve(row)
      })
   })

   return rep.status(200).send(enderecoUpdated)
})

// Deletar veterinário e endereco
server.delete("/veterinario/:id", async (req, rep) => {
   const { id } = req.params

   let { id_endereco } = await new Promise((resolve, reject) => {

      db.prepare("select id_endereco from veterinario where codigo_veterinario = ?")
         .get(id, (err, row) => {
            resolve(row)
         })
   })

   db.prepare("delete from veterinario where codigo_veterinario = ?")
      .run(id)

   db.prepare("delete from endereco_veterinario where id_endereco = ?")
      .run(id_endereco)

   return rep.status(200).send('Vaterinário deletado com sucesso!')
})

// Criar um responsável
server.post("/responsavel", async (req, rep) => {
   const { cpf, nome, cidade, bairro, rua } = req.body
   const enderecoId = uuidv4().substring(0, 12)

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
server.get("/responsavel", async (req, rep) => {
   let responsaveis = await new Promise((resolve, reject) => {
      db.prepare("select * from responsavel").all((err, rows) => {
         resolve(rows)
      })
   })

   return rep.status(200).send(responsaveis)
})

// Obter responsável
server.get("/responsavel/:cpf", async (req, rep) => {

   const { cpf } = req.params

   let responsavel = await new Promise((resolve, reject) => {
      db.prepare("select * from responsavel where CPF = ?")
         .get(cpf, (err, row) => {
            resolve(row)
         })
   })

   return rep.status(200).send(responsavel)
})

// Obter endereço de um responsável

server.get("/responsavel/endereco/:cpf", async (req, rep) => {
   const { cpf } = req.params

   let { id_endereco } = await new Promise((resolve, reject) => {
      db.prepare("select id_endereco from responsavel where CPF = ?")
         .get(cpf, (err, row) => {
            resolve(row)
         })
   })

   let endereco = await new Promise((resolve, reject) => {
      db.prepare("select * from endereco_responsavel where id_endereco = ?")
         .get(id_endereco, (err, row) => {
            resolve(row)
         })
   })

   return rep.status(200).send(endereco)

})

// Editar um responsável

server.put("/responsavel/:cpf", async (req, rep) => {
   const { cpf } = req.params
   const { nome } = req.body

   db.prepare("update responsavel set nome = ? where CPF = ?")
      .run(nome, cpf)

   let updatedResponsavel = await new Promise((resolve, reject) => {
      db.prepare("select * from responsavel where CPF = ?")
         .get(cpf, (err, row) => {
            resolve(row)
         })
   })

   return rep.status(200).send(updatedResponsavel)
})

// Editar endereço de um responsável

server.put("/responsavel/endereco/:cpf", async (req, rep) => {
   const { cpf } = req.params
   const { cidade, bairro, rua } = req.body

   let { id_endereco } = await new Promise((resolve, reject) => {
      db.prepare("select id_endereco from responsavel where CPF = ?")
         .get(cpf, (err, row) => {
            resolve(row)
         })
   })

   db.prepare("update endereco_responsavel set cidade = ?, bairro = ?, rua = ? where id_endereco = ?")
      .run([cidade, bairro, rua, id_endereco])

   return rep.status(200).send("Endereco atualizado com sucesso")
})

// Deletar um responsável

server.delete("/responsavel/:cpf", async (req, rep) => {
   const { cpf } = req.params

   let { id_endereco } = await new Promise((resolve, reject) => {
      db.prepare("select id_endereco from responsavel where CPF = ?")
         .get(cpf, (err, row) => {
            resolve(row)
         })
   })

   db.prepare("delete from responsavel where CPF = ?")
      .run(cpf)

   db.prepare("delete from endereco_responsavel where id_endereco = ?")
      .run(id_endereco)

   return rep.status(200).send("Responsável deletado com sucesso")
})

// Cadastrar um telefone de um responsável

server.post("/responsavel/telefone/:cpf", async (req, rep) => {
   const { cpf } = req.params
   const { numero } = req.body

   db.prepare("insert into telefones_responsavel (CPF_responsavel, numero) values (?, ?)")
      .run([cpf, numero])

   const newTelefone = await new Promise((resolve, reject) => {
      db.prepare("select * from telefones_responsavel where CPF_responsavel = ?")
         .get(cpf, (err, row) => {
            resolve(row)
         })
   })

   return rep.status(201).send(newTelefone)
})

// Obter telefones de um responsável

server.get("/responsavel/telefone/:cpf", async (req, rep) => {
   const { cpf } = req.params

   const numeros = await new Promise((resolve, reject) => {
      db.prepare("select * from telefones_responsavel where CPF_responsavel = ?")
         .all(cpf, (err, rows) => {
            resolve(rows)
         })
   })

   return rep.status(200).send(numeros)
})

// Deletar um telefone de um responsável

server.delete("/responsavel/telefone/:cpf", async (req, rep) => {
   const { cpf } = req.params
   const { numero } = req.body

   db.prepare("delete from telefones_responsavel where CPF_responsavel = ? and numero = ?")
      .run([cpf, numero])

   return rep.status(200).send("Telefone deletado com sucesso")
})

// Cadastrar tipo de pet

server.post("/pet/tipo", async (req, rep) => {
   const id_tipo = uuidv4().substring(0, 12)
   const { tipo, raca } = req.body

   db.prepare("insert into tipo_pet (id_tipo, tipo, raca) values (?, ?, ?)")
      .run([id_tipo, tipo, raca])

   let newTipo = await new Promise((resolve, reject) => {
      db.prepare("select * from tipo_pet where id_tipo = ?")
         .get(id_tipo, (err, row) => {
            resolve(row)
         })
   })

   return rep.status(201).send(newTipo)
})

// Obter tipos de pet 

server.get("/pet/tipo", async (req, rep) => {
   let tipos = await new Promise((resolve, reject) => {
      db.prepare("select * from tipo_pet")
         .all((err, rows) => {
            resolve(rows)
         })
   })

   return rep.status(200).send(tipos)
})

// Editar tipo pet

server.put("/pet/tipo/:id", async (req, rep) => {
   const { id } = req.params
   const { tipo, raca } = req.body

   db.prepare("update tipo_pet set tipo = ?, raca = ? where id_tipo = ?")
      .run([tipo, raca, id])

   let updatedTipo = await new Promise((resolve, reject) => {
      db.prepare("select * from tipo_pet where id_tipo = ?")
         .get([id], (err, row) => {
            resolve(row)
         })
   })

   return rep.status(200).send(updatedTipo)
})

// Deletar tipo pet

server.delete("/pet/tipo/:id", (req, rep) => {
   const { id } = req.params

   db.prepare("delete from tipo_pet where id_tipo = ?")
      .run(id)

   return rep.status(200).send("Tipo deletado com sucesso")
})

// Cadastrar um pet

server.post("/pet", async (req, rep) => {
   const codigo_pet = uuidv4().substring(0, 12)
   const { nome, idade, situacao, id_tipo, cpf_responsavel } = req.body

   db.prepare("insert into pet (codigo_pet, nome, idade, situacao, id_tipo, cpf_responsavel) values (?, ?, ?, ?, ?, ?)")
      .run([codigo_pet, nome, idade, situacao, id_tipo, cpf_responsavel])

   const newPet = await new Promise((resolve, reject) => {
      db.prepare("select * from pet where codigo_pet = ?")
         .get(codigo_pet, (err, row) => {
            resolve(row)
         })
   })

   return rep.status(201).send(newPet)
})

// Obter todos pets

server.get("/pet/all", async (req, rep) => {
   const allPets = await new Promise((resolve, reject) => {
      db.prepare("select * from pet")
         .all((err, rows) => {
            resolve(rows)
         })
   })

   return rep.status(200).send(allPets)
})

// Obter pet

server.get("/pet/:id", async (req, rep) => {
   const { id } = req.params

   const pet = await new Promise((resolve, reject) => {
      db.prepare("select * from pet where codigo_pet = ?")
         .get(id, (err, rows) => {
            resolve(rows)
         })
   })

   return rep.status(200).send(pet)
})

// Editar pet

server.put("/pet/:id", async (req, rep) => {
   const { id } = req.params
   const { nome, idade, situacao, id_tipo, cpf_responsavel } = req.body

   db.prepare("update pet set nome = ?, idade = ?, situacao = ?, id_tipo = ?, cpf_responsavel = ? where codigo_pet = ?")
      .run([nome, idade, situacao, id_tipo, cpf_responsavel, id])

   const updatedPet = await new Promise((resolve, reject) => {
      db.prepare("select * from pet where codigo_pet = ?")
         .get(id, (err, row) => {
            resolve(row)
         })
   })

   return rep.status(200).send(updatedPet)
})

// Deletar pet

server.delete("/pet/:id", (req, rep) => {
   const { id } = req.params

   db.prepare("delete from pet where codigo_pet = ?")
      .run(id)

   return rep.status(200).send("Pet deletado com sucesso")
})

// Cadastrar consulta

server.post("/consulta", async (req, rep) => {
   const id_consulta = uuidv4().substring(0, 12)
   const { data, horario, id_pet, id_responsavel, id_veterinario, nome, descricao } = req.body

   db.prepare(
      `insert into consulta (id_consulta, data, horario, id_pet, id_responsavel, id_veterinario, nome, descricao)
       values (?, ?, ?, ?, ?, ?, ?, ?)`
   )
      .run([id_consulta, data, horario, id_pet, id_responsavel, id_veterinario, nome, descricao])

   const newConsulta = await new Promise((resolve, reject) => {
      db.prepare("select * from consulta where id_consulta = ?")
         .get(id_consulta, (err, row) => {
            resolve(row)
         })
   })

   return rep.status(201).send(newConsulta)
})

// Obter todas consultas

server.get("/consulta/all", async (req, rep) => {
   const consultas = await new Promise((resolve, reject) => {
      db.prepare("select * from consulta")
         .all((err, rows) => {
            resolve(rows)
         })
   })

   return rep.status(200).send(consultas)
})

// Obter consulta

server.get("/consulta/:id", async (req, rep) => {
   const { id } = req.params

   const consulta = await new Promise((resolve, reject) => {
      db.prepare("select * from consulta where id_consulta = ?")
      .get(id, (err, row) => {
         resolve(row)
      })
   })

   return rep.status(200).send(consulta)
})

// Editar consulta

server.put("/consulta/:id", async (req, rep) => {
   const { id } = req.params
   const { data, horario, id_responsavel, id_pet, id_veterinario, nome, descricao } = req.body

   db.prepare(`
      update consulta set 
         data = ?, horario = ?, id_responsavel = ?, id_pet = ?, id_veterinario = ?, nome = ?, descricao = ?
      where id_consulta = ?
   `)
      .run([data, horario, id_responsavel, id_pet, id_veterinario, nome, descricao, id])

   const updatedConsulta = await new Promise((resolve, reject) => {
      db.prepare("select * from consulta where id_consulta = ?")
      .get(id, (err, row) => {
         resolve(row)
      })
   })

   return rep.status(200).send(updatedConsulta)
})

// Deletar consulta

server.delete("/consulta/:id", (req, rep) => {
   const { id } = req.params

   db.prepare("delete from consulta where id_consulta = ?")
   .run(id)

   return rep.status(200).send("Consulta deletada com sucesso")
})

server.listen({
   port: 4444
}).then(() => console.log('Server ON'))