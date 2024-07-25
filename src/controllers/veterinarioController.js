import { 
   getVeterinarioService, getAllVeterinariosService, 
   registerVeterinarioService, editVeterinarioService, 
   getEnderecoVeterinarioService, editEnderecoVeterinarioService, 
   registerTelefoneVeterinarioService, getTelefonesVeterinarioService, 
   deleteTelefoneVeterinarioService, deleteVeterinarioService
} from "../services/veterinarioService.js"

async function getVeterinario(req, rep) {

   const { id } = req.params

   const veterinario = await getVeterinarioService(id)

   return rep.status(200).send(veterinario)
}

async function getAllVeterinarios(req, rep) {

   const allVeterinarios = await getAllVeterinariosService()

   return rep.send(allVeterinarios)
}

async function registerVeterinario(req, rep) {
   const { cidade, bairro, rua, cpf, nome } = req.body
   
   registerVeterinarioService({
      cidade, bairro, rua, cpf, nome
   })

   const newVeterinarioAndEndereco = await registerVeterinarioService({
      cidade, bairro, rua, cpf, nome
   })

   return rep.status(201).send(newVeterinarioAndEndereco)
}

async function editVeterinario(req, rep) {
   const { nome, cpf } = req.body
   const { id } = req.params

   const updatedVeterinario = await editVeterinarioService({ id, cpf, nome })

   return rep.status(200).send(updatedVeterinario)
}

async function deleteVeterinario(req, rep) {
   const { id } = req.params

   await deleteVeterinarioService(id)

   return rep.status(200).send('Veterinário deletado com sucesso!')
}

async function getEnderecoVeterinario(req, rep) {
   const { id } = req.params

   const endereco = await getEnderecoVeterinarioService(id)

   return rep.status(200).send(endereco)
}

async function editEnderecoVeterinario(req, rep) {

   const { cidade, bairro, rua } = req.body
   const { id } = req.params

   const updatedEndereco = await editEnderecoVeterinarioService({ id, cidade, bairro, rua })

   return rep.status(200).send(updatedEndereco)
}

async function registerTelefoneVeterinario(req, rep) {
   const { numero } = req.body
   const { id } = req.params

   const newTelefone = await registerTelefoneVeterinarioService({ id, numero })

   return rep.status(201).send(newTelefone)
}

async function getTelefonesVeterinario(req, rep) {
   const { id } = req.params

   const telefones = await getTelefonesVeterinarioService(id)

   return rep.status(200).send(telefones)
}

async function deleteTelefoneVeterinario(req, rep) {
   const { id } = req.params
   const { numero } = req.body

   await deleteTelefoneVeterinarioService({ id, numero })

   return rep.status(200).send('Telefone deletado com sucesso!')
}

export {
   getAllVeterinarios, getEnderecoVeterinario, registerVeterinario,
   registerTelefoneVeterinario, getTelefonesVeterinario, 
   deleteTelefoneVeterinario, editVeterinario, editEnderecoVeterinario, 
   deleteVeterinario, getVeterinario
}