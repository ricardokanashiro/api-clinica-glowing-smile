import { v4 as uuidv4 } from "uuid"

import { db } from "../config/db.js"

async function registerResponsavel(req, rep) {
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
}

async function getAllReponsaveis(req, rep) {
   let responsaveis = await new Promise((resolve, reject) => {
      db.prepare("select * from responsavel").all((err, rows) => {
         resolve(rows)
      })
   })

   return rep.status(200).send(responsaveis)
}

async function getResponsavel(req, rep) {
   const { cpf } = req.params

   let responsavel = await new Promise((resolve, reject) => {
      db.prepare("select * from responsavel where CPF = ?")
         .get(cpf, (err, row) => {
            resolve(row)
         })
   })

   return rep.status(200).send(responsavel)
}

async function getEnderecoResponsavel(req, rep) {
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
}

async function editResponsavel(req, rep) {
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
}

async function editEnderecoResponsavel(req, rep) {
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
}

async function deleteResponsavel(req, rep) {
   const { cpf } = req.params

   let { id_endereco } = await new Promise((resolve, reject) => {
      db.prepare("select id_endereco from responsavel where CPF = ?")
         .get(cpf, (err, row) => {
            resolve(row)
         })
   })

   db.prepare("delete from consulta where id_responsavel = ?")
      .run(cpf)

   db.prepare("delete from pet where cpf_responsavel = ?")
      .run(cpf)

   db.prepare("delete from telefones_responsavel where CPF_responsavel = ?")
      .run(cpf)

   db.prepare("delete from responsavel where CPF = ?")
      .run(cpf)

   db.prepare("delete from endereco_responsavel where id_endereco = ?")
      .run(id_endereco)

   return rep.status(200).send("Responsável deletado com sucesso")
}

async function registerTelefoneResponsavel(req, rep) {
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
}

async function getTelefonesReponsavel(req, rep) {
   const { cpf } = req.params

   const numeros = await new Promise((resolve, reject) => {
      db.prepare("select * from telefones_responsavel where CPF_responsavel = ?")
         .all(cpf, (err, rows) => {
            resolve(rows)
         })
   })

   return rep.status(200).send(numeros)
}

async function deleteTelefoneResponsavel(req, rep) {
   const { cpf } = req.params
   const { numero } = req.body

   db.prepare("delete from telefones_responsavel where CPF_responsavel = ? and numero = ?")
      .run([cpf, numero])

   return rep.status(200).send("Telefone deletado com sucesso")
}

export {
   registerResponsavel, getAllReponsaveis, getResponsavel,
   getEnderecoResponsavel, editResponsavel, editEnderecoResponsavel,
   deleteResponsavel, registerTelefoneResponsavel, getTelefonesReponsavel,
   deleteTelefoneResponsavel
}