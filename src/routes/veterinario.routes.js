import { 
   getAllVeterinarios, getEnderecoVeterinario, registerVeterinario,
   registerTelefoneVeterinario, getTelefonesVeterinario, deleteTelefoneVeterinario,
   editVeterinario, editEnderecoVeterinario, deleteVeterinario,
   getVeterinario
} from "../controllers/veterinarioController.js"

function veterinarioRoutes(server, opts, done) {

   server.post("/", registerVeterinario)
   server.get("/", getAllVeterinarios)
   server.get("/:id", getVeterinario)
   server.put("/:id", editVeterinario)
   server.delete("/:id", deleteVeterinario)
   server.get("/endereco/:id", getEnderecoVeterinario)
   server.put("/endereco/:id", editEnderecoVeterinario)
   server.post("/telefone/:id", registerTelefoneVeterinario)
   server.get("/telefone/:id", getTelefonesVeterinario)
   server.delete("/telefone/:id", deleteTelefoneVeterinario)

   done()
}

export default veterinarioRoutes