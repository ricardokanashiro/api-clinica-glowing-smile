import { v4 as uuidv4 } from "uuid"

import { db } from "../config/db.js"

function veterinarioRoutes(server, opts, done) {

   // Listar os veterinários

   server.get("/", async (req, rep) => {

      let veterinario = await new Promise((resolve, reject) => {

         db.prepare("select * from veterinario")
            .all((err, rows) => {
               resolve(rows)
            })
      })

      return rep.send(veterinario)
   })

   // Pegar endereco de um veterinário

   server.get("/endereco/:id", async (req, rep) => {
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

   server.post("/", async (req, rep) => {

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

   server.post("/telefone/:id", async (req, rep) => {
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

   server.get("/telefone/:id", async (req, rep) => {
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

   server.delete("/telefone/:id", (req, rep) => {
      const { id } = req.params
      const { numero } = req.body

      db.prepare("delete from telefones_veterinario where id_veterinario = ? and numero = ?")
         .run([id, numero])

      return rep.status(200).send('Telefone deletado com sucesso!')
   })

   // Atualizar veterinário

   server.put("/:id", async (req, rep) => {
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

   server.put("/endereco/:id", async (req, rep) => {
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

   server.delete("/:id", async (req, rep) => {
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

   done()
}

export default veterinarioRoutes