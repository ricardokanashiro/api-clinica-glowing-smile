import { v4 as uuidv4 } from "uuid"

import { getPetById, createTipoPet } from "../models/tipoPetModel"

function registerTipoPetService({ tipo, raca }) {

   const id_tipo = uuidv4().substring(0, 12)

   createTipoPet({ id_tipo, tipo, raca })

   return getPetById(id_tipo)
}

export { registerTipoPetService }