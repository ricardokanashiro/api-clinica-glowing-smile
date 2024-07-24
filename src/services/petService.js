import { v4 as uuidv4 } from "uuid"

import { 
   getPetById, createPet, getAllPets, updatePetById, deletePetById 
} from "../models/petModel"

import { deleteConsultaByParam } from "../models/consultaModel"

async function registerPetService({
   nome, idade, situacao, id_tipo, cpf_responsavel
}) {

   const codigo_pet = uuidv4().substring(0, 12)

   await createPet({
      codigo_pet, nome, idade, situacao, id_tipo, cpf_responsavel
   })

   const newPet = getPetById(id)

   return newPet
}

async function getAllPetsService() {
   const allPets = await getAllPets()

   return allPets
}

async function getPetService(id) {
   const pet = await getPetById(id)

   return pet
}

async function editPetService({
   id, nome, idade, situacao, id_tipo, cpf_responsavel
}) {

   await updatePetById({
      id, nome, idade, situacao, id_tipo, cpf_responsavel
   })

   const updatedPet = getPetById(id)

   return updatedPet
}

async function deletePetService(id) {

   await deleteConsultaByParam("id_pet", id)
   await deletePetById(id)
}

export { registerPetService, getAllPetsService, getPetService, editPetService, deletePetService }