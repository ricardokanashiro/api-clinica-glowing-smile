import { registerTipoPetService, getAllTiposPetService, editTipoPetService, deletePetService } from "../services/tipoPetService"

function registerTipoPet(req, rep) {
   
   const { tipo, raca } = req.body

   const newTipo = registerTipoPetService({ tipo, raca })

   return rep.status(201).send(newTipo)
}

function getAllTipoPet(req, rep) {
   
   const tipos = getAllTiposPetService()

   return rep.status(200).send(tipos)
}

function editTipoPet(req, rep) {
   const { id } = req.params
   const { tipo, raca } = req.body

   const updatedTipo = editTipoPetService(id, tipo, raca)

   return rep.status(200).send(updatedTipo)
}

async function deleteTipoPet(req, rep) {
   const { id } = req.params

   await deletePetService(id)

   return rep.status(200).send("Tipo deletado com sucesso")
}

export { registerTipoPet, getAllTipoPet, editTipoPet, deleteTipoPet }