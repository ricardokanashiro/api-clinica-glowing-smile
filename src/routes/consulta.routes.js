import { v4 as uuidv4 } from "uuid"

import { db } from "../config/db.js"

function consultaRoutes(server, opts, done) {

   // Cadastrar consulta

   server.post("/", async (req, rep) => {
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

   server.get("/all", async (req, rep) => {
      const consultas = await new Promise((resolve, reject) => {
         db.prepare("select * from consulta")
            .all((err, rows) => {
               resolve(rows)
            })
      })

      return rep.status(200).send(consultas)
   })

   // Obter consulta

   server.get("/:id", async (req, rep) => {
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

   server.put("/:id", async (req, rep) => {
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

   server.delete("/:id", (req, rep) => {
      const { id } = req.params

      db.prepare("delete from consulta where id_consulta = ?")
         .run(id)

      return rep.status(200).send("Consulta deletada com sucesso")
   })

   done()
}

export default consultaRoutes