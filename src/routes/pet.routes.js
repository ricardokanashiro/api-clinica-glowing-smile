import { 
   registerPet, getAllPets, getPet, editPet, deletePet 
} from "../controllers/petController.js"

function petRoutes(server, opts, done) {

   server.post("/", registerPet)
   server.get("/all", getAllPets)
   server.get("/:id", getPet)
   server.put("/:id", editPet)
   server.delete("/:id", deletePet)

   done()
}

export default petRoutes