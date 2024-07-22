import { v4 as uuidv4 } from "uuid"

import { db } from "../config/db.js"

function petRoutes(server, opts, done) {

   // Cadastrar tipo de pet

   server.post("/tipo", async (req, rep) => {
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

   server.get("/tipo", async (req, rep) => {
      let tipos = await new Promise((resolve, reject) => {
         db.prepare("select * from tipo_pet")
            .all((err, rows) => {
               resolve(rows)
            })
      })

      return rep.status(200).send(tipos)
   })

   // Editar tipo pet

   server.put("/tipo/:id", async (req, rep) => {
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

   server.delete("/tipo/:id", (req, rep) => {
      const { id } = req.params

      db.prepare("delete from tipo_pet where id_tipo = ?")
         .run(id)

      return rep.status(200).send("Tipo deletado com sucesso")
   })

   // Cadastrar um pet

   server.post("/", async (req, rep) => {
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

   server.get("/all", async (req, rep) => {
      const allPets = await new Promise((resolve, reject) => {
         db.prepare("select * from pet")
            .all((err, rows) => {
               resolve(rows)
            })
      })

      return rep.status(200).send(allPets)
   })

   // Obter pet

   server.get("/:id", async (req, rep) => {
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

   server.put("/:id", async (req, rep) => {
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

   server.delete("/:id", (req, rep) => {
      const { id } = req.params

      db.prepare("delete from pet where codigo_pet = ?")
         .run(id)

      return rep.status(200).send("Pet deletado com sucesso")
   })

   done()
}

export default petRoutes