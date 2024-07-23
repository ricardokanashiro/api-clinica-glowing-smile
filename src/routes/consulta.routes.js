import { 
   registerConsulta, getAllConsultas, getConsulta, editConsulta, deleteConsulta
} from "../controllers/consultaController.js"

function consultaRoutes(server, opts, done) {

   server.post("/", registerConsulta)
   server.get("/all", getAllConsultas)
   server.get("/:id", getConsulta)
   server.put("/:id", editConsulta)
   server.delete("/:id", deleteConsulta)

   done()
}

export default consultaRoutes