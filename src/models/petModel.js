import { db } from "../config/db"

async function getPetById(id) {
   const pet = await new Promise((resolve, reject) => {
      db.prepare("select * from pet where codigo_pet = ?")
         .get(id, (err, row) => {
            resolve(row)
         })
   })

   return pet
}

async function createPet({
   codigo_pet, nome, idade, situacao, id_tipo, cpf_responsavel
}) {

   await new Promise((resolve, reject) => {

      db.prepare("insert into pet (codigo_pet, nome, idade, situacao, id_tipo, cpf_responsavel) values (?, ?, ?, ?, ?, ?)")
         .run([codigo_pet, nome, idade, situacao, id_tipo, cpf_responsavel], function (err) {

            if (err) return reject(err)
            resolve(this)
         })
   })

}

async function getAllPets() {
   const allPets = await new Promise((resolve, reject) => {
      db.prepare("select * from pet")
         .all((err, rows) => {
            resolve(rows)
         })
   })

   return allPets
}

async function updatePetById({
   id, nome, idade, situacao, id_tipo, cpf_responsavel
}) {

   await new Promise((resolve, reject) => {

      db.prepare("update pet set nome = ?, idade = ?, situacao = ?, id_tipo = ?, cpf_responsavel = ? where codigo_pet = ?")
         .run([nome, idade, situacao, id_tipo, cpf_responsavel, id], function (err) {

            if (err) return reject(err)
            resolve(this)
         })
   })

}

async function deletePetById(id) {

   await new Promise((resolve, reject) => {

      db.prepare("delete from pet where codigo_pet = ?")
         .run(id, function (err) {

            if (err) return reject(err)
            resolve(this)
         })
   })
}

async function deletePetByTipoId(id) {

   await new Promise((resolve, reject) => {

      db.prepare("delete from pet where id_tipo = ?")
         .run(id, function (err) {

            if (err) return reject(err)
            resolve(this)
         })
   })
}

async function deletePetByCpfResponsavel(cpf) {

   await new Promise((resolve, reject) => {

      db.prepare("delete from pet where cpf_responsavel = ?")
         .run(cpf, function (err) {

            if(err) return reject(err)
            resolve(this)
         })
   })
}

export { 
   getPetById, createPet, getAllPets, updatePetById, 
   deletePetById, deletePetByTipoId, deletePetByCpfResponsavel 
}