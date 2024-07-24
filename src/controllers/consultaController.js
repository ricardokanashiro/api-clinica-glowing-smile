import { 
   registerConsultaService, getAllConsultasService,
   getConsultaService, editConsultaService,
   deleteConsultaService
} from "../services/consultaService.js"

async function registerConsulta(req, rep) {
   
   const { data, horario, id_pet, id_responsavel, id_veterinario, nome, descricao } = req.body

   const newConsulta = await registerConsultaService({
       data, horario, id_pet, id_responsavel, id_veterinario, nome, descricao
   })

   return rep.status(201).send(newConsulta)
}

async function getAllConsultas(req, rep) {
   
   const consultas = await getAllConsultasService()

   return rep.status(200).send(consultas)
}

async function getConsulta(req, rep) {
   const { id } = req.params

   const consulta = await getConsultaService(id)

   return rep.status(200).send(consulta)
}

async function editConsulta(req, rep) {
   const { id } = req.params
   const { data, horario, id_responsavel, id_pet, id_veterinario, nome, descricao } = req.body

   const updatedConsulta = await editConsultaService({
      id, data, horario, id_responsavel, id_pet, id_veterinario, nome, descricao
   })

   return rep.status(200).send(updatedConsulta)
}

async function deleteConsulta(req, rep) {
   const { id } = req.params

   await deleteConsultaService(id)

   return rep.status(200).send("Consulta deletada com sucesso")
}

export { registerConsulta, getAllConsultas, getConsulta, editConsulta, deleteConsulta }