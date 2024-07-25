import { db } from "../config/db"

async function getResponsavelByCpf(cpf) {

   const responsavel = await new Promise((resolve, reject) => {
      db.prepare("select * from responsavel where CPF = ?")
         .get(cpf, (err, row) => {

            if (err) return reject(err)
            resolve(row)
         })
   })

   return responsavel
}

async function getAllReponsaveis() {

   const responsaveis = await new Promise((resolve, reject) => {
      db.prepare("select * from responsavel").all((err, rows) => {

         if (err) return reject(err)
         resolve(rows)
      })
   })

   return responsaveis
}

async function createResponsavel({ cpf, nome, id_endereco }) {

   await new Promise((resolve, reject) => {

      db.prepare("insert into responsavel (CPF, nome, id_endereco) values (?, ?, ?)")
         .run([cpf, nome, enderecoId], function (err) {

            if (err) return reject(err)
            resolve(this)
         })
   })
}

async function getEnderecoById(id) {

   const endereco = await new Promise((resolve, reject) => {

      db.prepare("select * from endereco_responsavel where id_endereco = ?")
         .get(id, (err, row) => {

            if (err) return reject(err)
            resolve(row)
         })
   })

   return endereco
}

async function updateResponsavel({
   nome, cpf
}) {

   await new Promise((resolve, reject) => {

      db.prepare("update responsavel set nome = ? where CPF = ?")
         .run([nome, cpf], function (err) {

            if (err) return reject(err)
            resolve(this)
         })
   })
}

async function updateEnderecoResponsavel({
   cidade, bairro, rua, id_endereco
}) {

   await new Promise((resolve, reject) => {

      db.prepare("update endereco_responsavel set cidade = ?, bairro = ?, rua = ? where id_endereco = ?")
         .run([cidade, bairro, rua, id_endereco], function (err) {

            if (err) return reject(err)
            resolve(this)
         })
   })
}

async function deleteEnderecoResponsavel(id) {

   await new Promise((resolve, reject) => {

      db.prepare("delete from endereco_responsavel where id_endereco = ?")
         .run(id, function (err) {

            if (err) return reject(err)
            resolve(this)
         })
   })

}

async function deleteResponsavelByCpf(cpf) {

   await new Promise((resolve, reject) => {

      db.prepare("delete from responsavel where CPF = ?")
         .run(cpf, function (err) {

            if (err) return reject(err)
            resolve(this)
         })
   })

}

async function deleteTelefonesResponsavelByCpf(cpf) {

   await new Promise((resolve, reject) => {

      db.prepare("delete from telefones_responsavel where CPF_responsavel = ?")
         .run(cpf, function (err) {

            if (err) return reject(err)
            resolve(this)
         })
   })
}

async function createTelefoneResponsavel({ cpf, numero }) {

   await new Promise((resolve, reject) => {

      db.prepare("insert into telefones_responsavel (CPF_responsavel, numero) values (?, ?)")
         .run([cpf, numero], function (err) {

            if (err) return reject(err)
            resolve(this)
         })
   })

}

async function getTelefoneResponsavelByCpfandNumber({ cpf, numero }) {

   const newTelefone = await new Promise((resolve, reject) => {

      db.prepare("select * from telefones_responsavel where CPF_responsavel = ? and numero = ?")
         .get([cpf, numero], (err, row) => {

            if (err) return reject(err)
            resolve(row)
         })
   })

   return newTelefone
}

async function getAllTelefonesResponsavel(cpf) {

   const numeros = await new Promise((resolve, reject) => {

      db.prepare("select * from telefones_responsavel where CPF_responsavel = ?")
         .all(cpf, (err, rows) => {

            if (err) return reject(err)
            resolve(rows)
         })
   })

   return numeros
}

async function deleteTelefoneResponsavelByCpfandNumber({ cpf, numero }) {

   await new Promise((resolve, reject) => {

      db.prepare("delete from telefones_responsavel where CPF_responsavel = ? and numero = ?")
         .run([cpf, numero], function(err) {

            if(err) return reject(err)
            resolve(this)
         })
   })
}

export {
   getResponsavelByCpf, getAllReponsaveis, createResponsavel,
   getEnderecoResponsavelByCpf, getEnderecoById, updateResponsavel,
   updateEnderecoResponsavel, deleteResponsavelByCpf,
   deleteEnderecoResponsavel, deleteTelefonesResponsavelByCpf,
   createTelefoneResponsavel, getTelefoneResponsavelByCpfandNumber,
   getAllTelefonesResponsavel, deleteTelefoneResponsavelByCpfandNumber
}