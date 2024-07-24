import { 
   registerPetService, getAllPetsService, getPetService, editPetService, deletePetService
} from "../services/petService"

async function registerPet(req, rep) {
   const { nome, idade, situacao, id_tipo, cpf_responsavel } = req.body

   const newPet = await registerPetService({
      nome, idade, situacao, id_tipo, cpf_responsavel
   })

   return rep.status(201).send(newPet)
}

async function getAllPets(req, rep) {
   
   const allPets = await getAllPetsService()

   return rep.status(200).send(allPets)
}

async function getPet(req, rep) {
   const { id } = req.params

   const pet = await getPetService(id)

   return rep.status(200).send(pet)
}

async function editPet(req, rep) {
   const { id } = req.params
   const { nome, idade, situacao, id_tipo, cpf_responsavel } = req.body

   const updatedPet = await editPetService({
      id, nome, idade, situacao, id_tipo, cpf_responsavel
   })

   return rep.status(200).send(updatedPet)
}

async function deletePet(req, rep) {
   const { id } = req.params

   await deletePetService(id)

   return rep.status(200).send("Pet deletado com sucesso")
}

export { 
   registerPet, getAllPets, getPet, editPet, deletePet
}