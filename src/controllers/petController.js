import { 
   registerPetService, getAllPetsService, getPetService, editPetService, deletePetService
} from "../services/petService"

function registerPet(req, rep) {
   const { nome, idade, situacao, id_tipo, cpf_responsavel } = req.body

   const newPet = registerPetService({
      nome, idade, situacao, id_tipo, cpf_responsavel
   })

   return rep.status(201).send(newPet)
}

function getAllPets(req, rep) {
   
   const allPets = getAllPetsService()

   return rep.status(200).send(allPets)
}

function getPet(req, rep) {
   const { id } = req.params

   const pet = getPetService(id)

   return rep.status(200).send(pet)
}

function editPet(req, rep) {
   const { id } = req.params
   const { nome, idade, situacao, id_tipo, cpf_responsavel } = req.body

   const updatedPet = editPetService({
      id, nome, idade, situacao, id_tipo, cpf_responsavel
   })

   return rep.status(200).send(updatedPet)
}

function deletePet(req, rep) {
   const { id } = req.params

   deletePetService(id)

   return rep.status(200).send("Pet deletado com sucesso")
}

export { 
   registerPet, getAllPets, getPet, editPet, deletePet
}