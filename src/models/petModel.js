async function getPetById(id) {
   const pet = await new Promise((resolve, reject) => {
      db.prepare("select * from pet where codigo_pet = ?")
         .get(codigo_pet, (err, row) => {
            resolve(row)
         })
   })

   return pet
}

async function createPet() {
   await db.prepare("insert into pet (codigo_pet, nome, idade, situacao, id_tipo, cpf_responsavel) values (?, ?, ?, ?, ?, ?)")
      .run([codigo_pet, nome, idade, situacao, id_tipo, cpf_responsavel])
}

async function getAllPets() {
   const allPets = await new Promise((resolve, reject) => {
      db.prepare("select * from pet")
         .all((err, rows) => {
            resolve(rows)
         })
   })

   return allPets
}

async function updatePetById({
   id, nome, idade, situacao, id_tipo, cpf_responsavel
}) {
   await db.prepare("update pet set nome = ?, idade = ?, situacao = ?, id_tipo = ?, cpf_responsavel = ? where codigo_pet = ?")
      .run([nome, idade, situacao, id_tipo, cpf_responsavel, id])
}

async function deletePetById(id) {
   await db.prepare("delete from pet where codigo_pet = ?")
      .run(id)
}

export { getPetById, createPet, getAllPets, updatePetById, deletePetById }