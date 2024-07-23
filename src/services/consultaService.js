import { v4 as uuidv4 } from "uuid";

import { 
   createConsulta, getAllConsultas, getConsultaById, 
   editConsultaById, deleteConsultaById 
} from "../models/consultaModel.js";

function registerConsultaService({ 
   data, horario, id_pet, id_responsavel, id_veterinario, nome, descricao
}) {

   const id_consulta = uuidv4().substring(0, 12)

   createConsulta({ 
      id_consulta, data, horario, id_pet, id_responsavel, id_veterinario, nome, descricao 
   })

   const newConsulta = getConsultaById(id_consulta)

   return newConsulta
}

function getAllConsultasService() {
   const consultas = getAllConsultas()

   return consultas
}

function getConsultaService(id) {
   const consulta = getConsultaById(id)

   return consulta
}

function editConsultaService({
   data, horario, id_responsavel, id_pet, id_veterinario, nome, descricao, id
}) {

   editConsultaById({
      data, horario, id_responsavel, id_pet, id_veterinario, nome, descricao, id
   })

   const updatedConsulta = getConsultaById(id)

   return updatedConsulta
}

function deleteConsultaService(id) {
   deleteConsultaById(id)
}

export { 
   registerConsultaService, getAllConsultasService,
   getConsultaService, editConsultaService,
   deleteConsultaService
}