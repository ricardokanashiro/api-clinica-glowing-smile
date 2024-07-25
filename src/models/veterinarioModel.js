import { db } from "../config/db.js"

async function getVeterinarioById(id) {

   const veterinario = await new Promise((resolve, reject) => {

      db.prepare("select * from veterinario where codigo_veterinario = ?")
         .get(id, (err, row) => {

            if (err) return reject(err)
            resolve(row)
         })
   })

   return veterinario
}

async function getAllVeterinarios() {

   const allVeterinarios = await new Promise((resolve, reject) => {

      db.prepare("select * from veterinario")
         .all((err, rows) => {

            if (err) return reject(err)
            resolve(rows)
         })
   })

   return allVeterinarios
}

async function createEndereco({
   id_endereco, cidade, bairro, rua
}) {

   await new Promise((resolve, reject) => {

      db.prepare(`
         insert into endereco_veterinario (id_endereco, cidade, bairro, rua)
         values (?, ?, ?, ?)
      `)
         .run([id_endereco, cidade, bairro, rua], function (err) {

            if (err) return reject(err)
            resolve(this)
         })
   })
}

async function createVeterinario({
   cod_veterinario, id_endereco, cpf, nome
}) {

   await new Promise((resolve, reject) => {

      db.prepare(`
         insert into veterinario (codigo_veterinario, cpf, nome, id_endereco)
         values (?, ?, ?, ?)
      `)
         .run([cod_veterinario, cpf, nome, id_endereco], function (err) {

            if (err) return reject(err)
            resolve(this)
         })
   })
}

async function getEnderecoByVeterinarioId(id) {

   const { id_endereco } = await new Promise((resolve, reject) => {
      db.prepare("select * from veterinario where codigo_veterinario = ?")
         .get(id, (err, row) => {

            if (err) return reject(err)
            resolve(row)
         })
   })

   const endereco = await new Promise((resolve, reject) => {
      db.prepare("select * from endereco_veterinario where id_endereco = ?")
         .get(id_endereco, (err, row) => {

            if (err) return reject(err)
            resolve(row)
         })
   })

   return endereco
}

async function updateVeterinarioById({ id, cpf, nome }) {

   await new Promise((resolve, reject) => {

      db.prepare("update veterinario set nome = ?, CPF = ? where codigo_veterinario = ?")
         .run([nome, cpf, id], function (err) {

            if (err) return reject(err)
            resolve(this)
         })
   })
}

async function updateVeterinarioEndereco({ id_endereco, cidade, bairro, rua }) {

   await new Promise((resolve, reject) => {

      db.prepare(`
         update endereco_veterinario set
            cidade = ?, bairro = ?, rua = ?
         where id_endereco = ?
      `)
         .run([cidade, bairro, rua, id_endereco], function (err) {

            if (err) return reject(err)
            resolve(this)
         })
   })

}

async function getTelefoneVeterinarioByIdAndNumber({ id, numero }) {

   const telefone = await new Promise((resolve, reject) => {

      db.prepare("select * from telefones_veterinario where id_veterinario = ? and numero = ?")
         .get([id, numero], (err, rows) => {

            if (err) return reject(err)
            resolve(rows)
         })
   })

   return telefone
}

async function createTelefoneVeterinario({ id, numero }) {

   await new Promise((resolve, reject) => {

      db.prepare("insert into telefones_veterinario (id_veterinario, numero) values (?, ?)")
         .run([id, numero], function (err) {

            if (err) return reject(err)
            resolve(this)
         })
   })
}

async function getAllTelefonesVeterinario(id) {

   const telefones = await new Promise((resolve, reject) => {
      db.prepare("select * from telefones_veterinario where id_veterinario = ?")
         .all(id, (err, rows) => {

            if (err) return reject(err)
            resolve(rows)
         })
   })

   return telefones
}

async function deleteTelefoneVeterinario({ id, numero }) {

   await new Promise((resolve, reject) => {

      db.prepare("delete from telefones_veterinario where id_veterinario = ? and numero = ?")
         .run([id, numero], function (err) {

            if (err) return reject(err)
            resolve(this)
         })
   })
}

async function deleteAllTelefonesVeterinario(id) {

   await new Promise((resolve, reject) => {

      db.prepare("delete from telefones_veterinario where id_veterinario = ?")
         .run(id, function(err) {

            if(err) return reject(err)
            resolve(this)
         })
   })
}

async function deleteEnderecoById(id) {

   await new Promise((resolve, reject) => {

      db.prepare("delete from endereco_veterinario where id_endereco = ?")
         .run(id, function(err) {

            if(err) return reject(err)
            resolve(this)
         })
   })

}

async function deleteVeterinarioById(id) {

   await new Promise((resolve, reject) => {

      db.prepare("delete from veterinario where codigo_veterinario = ?")
         .run(id, function (err) {

            if (err) return reject(err)
            resolve(this)
         })
   })
}

export {
   getVeterinarioById, getAllVeterinarios, createEndereco,
   createVeterinario, getEnderecoByVeterinarioId, updateVeterinarioById,
   updateVeterinarioEndereco, createTelefoneVeterinario,
   getTelefoneVeterinarioByIdAndNumber, getAllTelefonesVeterinario,
   deleteTelefoneVeterinario, deleteVeterinarioById,
   deleteAllTelefonesVeterinario, deleteEnderecoById
}