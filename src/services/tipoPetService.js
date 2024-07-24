import { v4 as uuidv4 } from "uuid"

import { getPetById, createTipoPet, getAllTiposPet, updateTipoPet, deleteTipoPet } from "../models/tipoPetModel"
import { deletePetByTipoId } from "../models/petModel"

function registerTipoPetService({ tipo, raca }) {

   const id_tipo = uuidv4().substring(0, 12)

   createTipoPet({ id_tipo, tipo, raca })

   return getPetById(id_tipo)
}

function getAllTiposPetService() {
   return getAllTiposPet()
}

function editTipoPetService(id, tipo, raca) {

   updateTipoPet({ id, tipo, raca })

   return getPetById(id)
}

async function deletePetService(id) {

   await deletePetByTipoId(id)
   deleteTipoPet(id)
}

export { registerTipoPetService, getAllTiposPetService, editTipoPetService, deletePetService }