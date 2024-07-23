import { 
   registerTipoPet, getAllTipoPet, editTipoPet, deleteTipoPet
} from "../controllers/tipoPetController.js"

function tipoPetRoutes(server, opts, done) {

   server.post("/", registerTipoPet)
   server.get("/all", getAllTipoPet)
   server.put("/:id", editTipoPet)
   server.delete("/:id", deleteTipoPet)

   done()
}

export default tipoPetRoutes