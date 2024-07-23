import { 
   registerResponsavel, getAllReponsaveis, getResponsavel,
   getEnderecoResponsavel, editResponsavel, editEnderecoResponsavel,
   deleteResponsavel, registerTelefoneResponsavel, getTelefonesReponsavel,
   deleteTelefoneResponsavel 
} from "../controllers/responsavelController.js"

function responsavelRoutes(server, opts, done) {

   server.post("/", registerResponsavel)
   server.get("/", getAllReponsaveis)
   server.get("/:cpf", getResponsavel)
   server.get("/endereco/:cpf", getEnderecoResponsavel)
   server.put("/:cpf", editResponsavel)
   server.put("/endereco/:cpf", editEnderecoResponsavel)
   server.delete("/:cpf", deleteResponsavel)
   server.post("/telefone/:cpf", registerTelefoneResponsavel)
   server.get("/telefone/:cpf", getTelefonesReponsavel)
   server.delete("/telefone/:cpf", deleteTelefoneResponsavel)

   done()
}

export default responsavelRoutes