import { db } from "../config/db.js"

async function getConsultaById(id) {

   const consulta = await new Promise((resolve, reject) => {
      db.prepare("select * from consulta where id_consulta = ?")
         .get(id, (err, row) => {

            if (err) reject(err)
            resolve(row)
         })
   })

   return consulta
}

async function getAllConsultas() {

   const consultas = await new Promise((resolve, reject) => {
      db.prepare("select * from consulta")
         .all((err, rows) => {
            if (err) reject(err)
            resolve(rows)
         })
   })

   return consultas
}

async function createConsulta({
   id_consulta, data, horario, id_pet, id_responsavel, id_veterinario, nome, descricao
}) {

   await new Promise((resolve, reject) => {
      db.prepare(
         `insert into consulta (id_consulta, data, horario, id_pet, id_responsavel, id_veterinario, nome, descricao)
            values (?, ?, ?, ?, ?, ?, ?, ?)`
      )
         .run([id_consulta, data, horario, id_pet, id_responsavel, id_veterinario, nome, descricao], function(err) {

            if (err) return reject(err)
            resolve(this)
         })
   })
}

async function editConsultaById({
   data, horario, id_responsavel, id_pet, id_veterinario, nome, descricao, id
}) {

   await new Promise((resolve, reject) => {

      db.prepare(`
         update consulta set 
            data = ?, horario = ?, id_responsavel = ?, id_pet = ?, id_veterinario = ?, nome = ?, descricao = ?
         where id_consulta = ?
      `)
         .run([data, horario, id_responsavel, id_pet, id_veterinario, nome, descricao, id], function(err) {

            if (err) reject(err)
            resolve(this)
         })
   })
}

async function deleteConsultaById(id) {

   await new Promise((resolve, reject) => {

      db.prepare("delete from consulta where id_consulta = ?")
         .run(id, function (err) {

            if(err) reject(err)
            resolve(this)
         })
   })

}

async function deleteConsultaByParam(param, id) {

   await new Promise((resolve, reject) => {

      db.prepare(`delete from consulta where ${param} = ?`)
         .run([id], function (err) {

            if(err) return reject(err)
            resolve(this)
         })
   })

}

export {
   createConsulta, getAllConsultas, getConsultaById,
   editConsultaById, deleteConsultaById, deleteConsultaByParam
}