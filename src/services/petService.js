import { v4 as uuidv4 } from "uuid"

import { 
   getPetById, createPet, getAllPets, updatePetById, deletePetById 
} from "../models/petModel"

import { deleteConsultaByParam } from "../models/consultaModel"

function registerPetService({
   nome, idade, situacao, id_tipo, cpf_responsavel
}) {

   const codigo_pet = uuidv4().substring(0, 12)

   createPet({
      codigo_pet, nome, idade, situacao, id_tipo, cpf_responsavel
   })

   const newPet = getPetById(id)

   return newPet
}

function getAllPetsService() {
   const allPets = getAllPets()

   return allPets
}

function getPetService(id) {
   const pet = getPetById(id)

   return pet
}

function editPetService({
   id, nome, idade, situacao, id_tipo, cpf_responsavel
}) {

   updatePetById({
      id, nome, idade, situacao, id_tipo, cpf_responsavel
   })

   const updatedPet = getPetById(id)

   return updatedPet
}

async function deletePetService(id) {

   await deleteConsultaByParam("id_pet", id)
   deletePetById(id)
}

export { registerPetService, getAllPetsService, getPetService, editPetService, deletePetService }