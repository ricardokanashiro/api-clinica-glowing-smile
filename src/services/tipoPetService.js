import { v4 as uuidv4 } from "uuid"

import { getPetById, createTipoPet, getAllTiposPet, updateTipoPet, deleteTipoPet } from "../models/tipoPetModel.js"
import { deletePetByTipoId } from "../models/petModel.js"

async function registerTipoPetService({ tipo, raca }) {

   const id_tipo = uuidv4().substring(0, 12)

   await createTipoPet({ id_tipo, tipo, raca })

   return getPetById(id_tipo)
}

async function getAllTiposPetService() {
   return await getAllTiposPet()
}

async function editTipoPetService({ id, tipo, raca }) {

   await updateTipoPet({ id, tipo, raca })

   return await getPetById(id)
}

async function deletePetService(id) {

   await deletePetByTipoId(id)
   await deleteTipoPet(id)
}

export { registerTipoPetService, getAllTiposPetService, editTipoPetService, deletePetService }