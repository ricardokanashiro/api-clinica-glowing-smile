import { 
   getAllVeterinarios, getEnderecoVeterinario, registerVeterinario,
   registerTelefoneVeterinario, getTelefonesVeterinario, deleteTelefoneVeterinario,
   editVeterinario, editEnderecoVeterinario, deleteVeterinario
} from "../controllers/veterinarioController.js"

function veterinarioRoutes(server, opts, done) {

   server.get("/", getAllVeterinarios)
   server.get("/endereco/:id", getEnderecoVeterinario)
   server.post("/", registerVeterinario)
   server.post("/telefone/:id", registerTelefoneVeterinario)
   server.get("/telefone/:id", getTelefonesVeterinario)
   server.delete("/telefone/:id", deleteTelefoneVeterinario)
   server.put("/:id", editVeterinario)
   server.put("/endereco/:id", editEnderecoVeterinario)
   server.delete("/:id", deleteVeterinario)

   done()
}

export default veterinarioRoutes