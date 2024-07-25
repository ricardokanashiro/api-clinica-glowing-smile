import { v4 as uuidv4 } from "uuid"

import { 
   getAllVeterinarios, getVeterinarioById, createEndereco,
   createVeterinario, getEnderecoByVeterinarioId, updateVeterinarioById,
   updateVeterinarioEndereco, getTelefoneVeterinarioByIdAndNumber, 
   createTelefoneVeterinario, getAllTelefonesVeterinario,
   deleteTelefoneVeterinario, deleteAllTelefonesVeterinario,
   deleteVeterinarioById, deleteEnderecoById
} from "../models/veterinarioModel.js"

import { deleteConsultaByParam } from "../models/consultaModel.js"

async function getVeterinarioService(id) {

   const veterinario = await getVeterinarioById(id)

   return veterinario
}

async function getAllVeterinariosService() {

   const allVeterinarios = await getAllVeterinarios()

   return allVeterinarios
}

async function registerVeterinarioService({
   cidade, bairro, rua, cpf, nome
}) {

   const id_endereco = uuidv4().substring(0, 12)
   const cod_veterinario = uuidv4().substring(0, 12)

   await createEndereco({ id_endereco, cidade, bairro, rua })
   await createVeterinario({ cod_veterinario, cpf, nome, id_endereco })

   const newVeterinario = await getVeterinarioById(cod_veterinario)
   const newEndereco = await getEnderecoByVeterinarioId(cod_veterinario)

   return { newVeterinario, newEndereco }
}

async function editVeterinarioService({ id, cpf, nome }) {

   await updateVeterinarioById({ id, cpf, nome })

   const updatedVeterinario = await getVeterinarioById(id)

   return updatedVeterinario
}

async function getEnderecoVeterinarioService(id) {

   const endereco = await getEnderecoByVeterinarioId(id)

   return endereco
}

async function editEnderecoVeterinarioService({ id, cidade, bairro, rua }) {

   const { id_endereco } = await getEnderecoByVeterinarioId(id)
   await updateVeterinarioEndereco({ id_endereco, cidade, bairro, rua })

   const updatedEndereco = await getEnderecoByVeterinarioId(id)

   return updatedEndereco
}

async function registerTelefoneVeterinarioService({ id, numero }) {

   await createTelefoneVeterinario({ id, numero })
   
   const newTelefone = await getTelefoneVeterinarioByIdAndNumber({ id, numero })

   return newTelefone
}

async function getTelefonesVeterinarioService(id) {

   const telefones = await getAllTelefonesVeterinario(id)

   return telefones
}

async function deleteTelefoneVeterinarioService({ id, numero }) {

   await deleteTelefoneVeterinario({ id, numero })
}

async function deleteVeterinarioService(id) {
   
   const { id_endereco } = await getEnderecoByVeterinarioId(id)
   
   await deleteConsultaByParam("id_veterinario", id)
   await deleteAllTelefonesVeterinario(id)
   await deleteVeterinarioById(id)

   await deleteEnderecoById(id_endereco)
}

export { 
   getVeterinarioService, getAllVeterinariosService, registerVeterinarioService,
   editVeterinarioService, getEnderecoVeterinarioService, editEnderecoVeterinarioService,
   registerTelefoneVeterinarioService, getTelefonesVeterinarioService,
   deleteTelefoneVeterinarioService, deleteVeterinarioService
}