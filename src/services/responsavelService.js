import { v4 as uuidv4 } from "uuid"

import { 
   createResponsavel,
   createResponsavelEndereco, createTelefoneResponsavel,
   deleteEnderecoResponsavel,deleteResponsavelByCpf,
   deleteTelefoneResponsavelByCpfandNumber,
   deleteTelefonesResponsavelByCpf, getAllReponsaveis, getAllTelefonesResponsavel, 
   getEnderecoById, getResponsavelByCpf, getTelefoneResponsavelByCpfandNumber, 
   updateEnderecoResponsavel 
} from "../models/responsavelModel.js"

import { deleteConsultaByParam } from "../models/consultaModel.js"
import { deletePetByCpfResponsavel } from "../models/petModel.js"

async function getResponsavelService(cpf) {

   const responsavel = await getResponsavelByCpf(cpf)

   return responsavel
}

async function getAllReponsaveisService() {

   const resposaveis = await getAllReponsaveis()

   return resposaveis
}

async function registerResponsavelService({
   cpf, nome, cidade, bairro, rua
}) {

   const id_endereco = uuidv4().substring(0, 12)

   await createResponsavelEndereco({ id_endereco, cidade, bairro, rua })
   await createResponsavel({ cpf, nome, id_endereco })

   const newResponsavel = await getResponsavelByCpf(cpf)
   const newEndereco = await getEnderecoById(id_endereco)

   return { newResponsavel, newEndereco }
}

async function getEnderecoResponsavelService(cpf) {

   const { id_endereco } = await getResponsavelByCpf(cpf)
   const endereco = await getEnderecoById(id_endereco)

   return endereco
}

async function editResponsavelService({ cpf, nome }) {

   updateResponsavel({ cpf, nome })

   const updatedResponsavel = await getResponsavelByCpf(cpf)

   return updatedResponsavel
}

async function editEnderecoResponsavelService({
   cpf, cidade, bairro, rua
}) {

   const { id_endereco } = await getResponsavelByCpf(cpf)
   await updateEnderecoResponsavel({ id_endereco, cidade, bairro, rua })

   const updatedEndereco = await getEnderecoById(id_endereco)

   return updatedEndereco
}

async function deleteResponsavelService(cpf) {

   const { id_endereco } = await getResponsavelByCpf(cpf)

   await deleteConsultaByParam("id_responsavel", cpf)
   await deletePetByCpfResponsavel(cpf)
   await deleteTelefonesResponsavelByCpf(cpf)
   await deleteResponsavelByCpf(cpf)
   await deleteEnderecoResponsavel(id_endereco)
}

async function registerTelefoneResponsavelService({ cpf, numero }) {

   await createTelefoneResponsavel({ cpf, numero })
   const newTelefone = await getTelefoneResponsavelByCpfandNumber({ cpf, numero })

   return newTelefone
}

async function getAllTelefonesResponsavelService(cpf) {

   const numeros = await getAllTelefonesResponsavel(cpf)

   return numeros
}

async function deleteTelefoneResponsavelService({ cpf, numero }) {

   await deleteTelefoneResponsavelByCpfandNumber({ cpf, numero })
}

export { 
   getResponsavelService, getAllReponsaveisService,
   getEnderecoResponsavelService, editResponsavelService,
   editEnderecoResponsavelService, deleteResponsavelService,
   registerTelefoneResponsavelService, getAllTelefonesResponsavelService,
   deleteTelefoneResponsavelService, registerResponsavelService
}