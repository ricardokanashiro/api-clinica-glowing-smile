import { 
   registerTipoPetService, getAllTiposPetService, editTipoPetService, deletePetService 
} from "../services/tipoPetService.js"

async function registerTipoPet(req, rep) {
   
   const { tipo, raca } = req.body

   const newTipo = await registerTipoPetService({ tipo, raca })

   return rep.status(201).send(newTipo)
}

async function getAllTipoPet(req, rep) {
   
   const tipos = await getAllTiposPetService()

   return rep.status(200).send(tipos)
}

async function editTipoPet(req, rep) {
   const { id } = req.params
   const { tipo, raca } = req.body

   const updatedTipo = await editTipoPetService({ id, tipo, raca })

   return rep.status(200).send(updatedTipo)
}

async function deleteTipoPet(req, rep) {
   const { id } = req.params

   await deletePetService(id)

   return rep.status(200).send("Tipo deletado com sucesso")
}

export { registerTipoPet, getAllTipoPet, editTipoPet, deleteTipoPet }