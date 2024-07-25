import { db } from "../config/db.js"

async function getPetById(id) {
   const pet = await new Promise((resolve, reject) => {
      db.prepare("select * from tipo_pet where id_tipo = ?")
         .get(id, (err, row) => {
            resolve(row)
         })
   })

   return pet
}

async function createTipoPet({ id_tipo, tipo, raca }) {

   await new Promise((resolve, reject) => {

      db.prepare("insert into tipo_pet (id_tipo, tipo, raca) values (?, ?, ?)")
         .run([id_tipo, tipo, raca], function (err) {

            if(err) return reject(err)
            resolve(this)
         })
   })

}

async function getAllTiposPet() {
   let tipos = await new Promise((resolve, reject) => {
      db.prepare("select * from tipo_pet")
         .all((err, rows) => {
            resolve(rows)
         })
   })

   return tipos
}

async function updateTipoPet({
   id, tipo, raca
}) {

   await new Promise((resolve, reject) => {

      db.prepare("update tipo_pet set tipo = ?, raca = ? where id_tipo = ?")
         .run([tipo, raca, id], function(err) {

            if(err) return reject(err)
            resolve(this)
         })
   })

}

async function deleteTipoPet(id) {

   await new Promise((resolve, reject) => {

      db.prepare("delete from tipo_pet where id_tipo = ?")
         .run(id, function(err) {

            if(err) return reject(err)
            resolve(this)
         })
   })

}

export { getPetById, createTipoPet, getAllTiposPet, updateTipoPet, deleteTipoPet }