import { db } from "../config/db.js"

async function getConsultaById(id) {

   const consulta = await new Promise((resolve, reject) => {
      db.prepare("select * from consulta where id_consulta = ?")
         .get(id, (err, row) => {
            resolve(row)
         })
   })

   return consulta
}

async function getAllConsultas() {
   const consultas = await new Promise((resolve, reject) => {
      db.prepare("select * from consulta")
         .all((err, rows) => {
            resolve(rows)
         })
   })

   return consultas
}

async function createConsulta({
   id_consulta, data, horario, id_pet, id_responsavel, id_veterinario, nome, descricao
}) {
   db.prepare(
      `insert into consulta (id_consulta, data, horario, id_pet, id_responsavel, id_veterinario, nome, descricao)
       values (?, ?, ?, ?, ?, ?, ?, ?)`
   )
      .run([id_consulta, data, horario, id_pet, id_responsavel, id_veterinario, nome, descricao])

}

async function editConsultaById({
   data, horario, id_responsavel, id_pet, id_veterinario, nome, descricao, id
}) {
   db.prepare(`
      update consulta set 
         data = ?, horario = ?, id_responsavel = ?, id_pet = ?, id_veterinario = ?, nome = ?, descricao = ?
      where id_consulta = ?
   `)
      .run([data, horario, id_responsavel, id_pet, id_veterinario, nome, descricao, id])
}

async function deleteConsultaById(id) {
   db.prepare("delete from consulta where id_consulta = ?")
      .run(id)
}

async function deleteConsultaByParam(param, id) {
   db.prepare("delete from consulta where ? = ?")
      .run(param, id)
}

export {
   createConsulta, getAllConsultas, getConsultaById,
   editConsultaById, deleteConsultaById, deleteConsultaByParam
}