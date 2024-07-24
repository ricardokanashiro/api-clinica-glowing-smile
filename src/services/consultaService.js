import { v4 as uuidv4 } from "uuid";

import { 
   createConsulta, getAllConsultas, getConsultaById, 
   editConsultaById, deleteConsultaById 
} from "../models/consultaModel.js";

async function registerConsultaService({ 
   data, horario, id_pet, id_responsavel, id_veterinario, nome, descricao
}) {

   const id_consulta = uuidv4().substring(0, 12)

   await createConsulta({ 
      id_consulta, data, horario, id_pet, id_responsavel, id_veterinario, nome, descricao 
   })

   const newConsulta = getConsultaById(id_consulta)

   return newConsulta
}

async function getAllConsultasService() {
   const consultas = await getAllConsultas()

   return consultas
}

async function getConsultaService(id) {
   const consulta = await getConsultaById(id)

   return consulta
}

async function editConsultaService({
   data, horario, id_responsavel, id_pet, id_veterinario, nome, descricao, id
}) {

   await editConsultaById({
      data, horario, id_responsavel, id_pet, id_veterinario, nome, descricao, id
   })

   const updatedConsulta = await getConsultaById(id)

   return updatedConsulta
}

async function deleteConsultaService(id) {
   await deleteConsultaById(id)
}

export { 
   registerConsultaService, getAllConsultasService,
   getConsultaService, editConsultaService,
   deleteConsultaService
}