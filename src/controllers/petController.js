async function registerPet(req, rep) {
   const codigo_pet = uuidv4().substring(0, 12)
   const { nome, idade, situacao, id_tipo, cpf_responsavel } = req.body

   db.prepare("insert into pet (codigo_pet, nome, idade, situacao, id_tipo, cpf_responsavel) values (?, ?, ?, ?, ?, ?)")
      .run([codigo_pet, nome, idade, situacao, id_tipo, cpf_responsavel])

   const newPet = await new Promise((resolve, reject) => {
      db.prepare("select * from pet where codigo_pet = ?")
         .get(codigo_pet, (err, row) => {
            resolve(row)
         })
   })

   return rep.status(201).send(newPet)
}

async function getAllPets(req, rep) {
   const allPets = await new Promise((resolve, reject) => {
      db.prepare("select * from pet")
         .all((err, rows) => {
            resolve(rows)
         })
   })

   return rep.status(200).send(allPets)
}

async function getPet(req, rep) {
   const { id } = req.params

   const pet = await new Promise((resolve, reject) => {
      db.prepare("select * from pet where codigo_pet = ?")
         .get(id, (err, rows) => {
            resolve(rows)
         })
   })

   return rep.status(200).send(pet)
}

async function editPet(req, rep) {
   const { id } = req.params
   const { nome, idade, situacao, id_tipo, cpf_responsavel } = req.body

   db.prepare("update pet set nome = ?, idade = ?, situacao = ?, id_tipo = ?, cpf_responsavel = ? where codigo_pet = ?")
      .run([nome, idade, situacao, id_tipo, cpf_responsavel, id])

   const updatedPet = await new Promise((resolve, reject) => {
      db.prepare("select * from pet where codigo_pet = ?")
         .get(id, (err, row) => {
            resolve(row)
         })
   })

   return rep.status(200).send(updatedPet)
}

async function deletePet(req, rep) {
   const { id } = req.params

   db.prepare("delete from consulta where id_pet = ?")
      .run(id)

   db.prepare("delete from pet where codigo_pet = ?")
      .run(id)

   return rep.status(200).send("Pet deletado com sucesso")
}

export { 
   registerPet, getAllPets, getPet, editPet, deletePet
}