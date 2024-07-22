import { v4 as uuidv4 } from "uuid"

import { db } from "../config/db.js"

function responsavelRoutes(server, opts, done) {

   // Criar um responsável

   server.post("/", async (req, rep) => {
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

   server.get("/", async (req, rep) => {
      let responsaveis = await new Promise((resolve, reject) => {
         db.prepare("select * from responsavel").all((err, rows) => {
            resolve(rows)
         })
      })

      return rep.status(200).send(responsaveis)
   })

   // Obter responsável

   server.get("/:cpf", async (req, rep) => {

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

   server.get("/endereco/:cpf", async (req, rep) => {
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

   server.put("/:cpf", async (req, rep) => {
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

   server.put("/endereco/:cpf", async (req, rep) => {
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

   server.delete("/:cpf", async (req, rep) => {
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

   server.post("/telefone/:cpf", async (req, rep) => {
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

   server.get("/telefone/:cpf", async (req, rep) => {
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

   server.delete("/telefone/:cpf", async (req, rep) => {
      const { cpf } = req.params
      const { numero } = req.body

      db.prepare("delete from telefones_responsavel where CPF_responsavel = ? and numero = ?")
         .run([cpf, numero])

      return rep.status(200).send("Telefone deletado com sucesso")
   })

   done()
}

export default responsavelRoutes