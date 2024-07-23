async function registerTipoPet(req, rep) {
   const id_tipo = uuidv4().substring(0, 12)
   const { tipo, raca } = req.body

   db.prepare("insert into tipo_pet (id_tipo, tipo, raca) values (?, ?, ?)")
      .run([id_tipo, tipo, raca])

   let newTipo = await new Promise((resolve, reject) => {
      db.prepare("select * from tipo_pet where id_tipo = ?")
         .get(id_tipo, (err, row) => {
            resolve(row)
         })
   })

   return rep.status(201).send(newTipo)
}

async function getAllTipoPet(req, rep) {
   let tipos = await new Promise((resolve, reject) => {
      db.prepare("select * from tipo_pet")
         .all((err, rows) => {
            resolve(rows)
         })
   })

   return rep.status(200).send(tipos)
}

async function editTipoPet(req, rep) {
   const { id } = req.params
   const { tipo, raca } = req.body

   db.prepare("update tipo_pet set tipo = ?, raca = ? where id_tipo = ?")
      .run([tipo, raca, id])

   let updatedTipo = await new Promise((resolve, reject) => {
      db.prepare("select * from tipo_pet where id_tipo = ?")
         .get([id], (err, row) => {
            resolve(row)
         })
   })

   return rep.status(200).send(updatedTipo)
}

async function deleteTipoPet(req, rep) {
   const { id } = req.params

   db.prepare("delete from pet where id_tipo = ?")
      .run(id)

   db.prepare("delete from tipo_pet where id_tipo = ?")
      .run(id)

   return rep.status(200).send("Tipo deletado com sucesso")
}

export { registerTipoPet, getAllTipoPet, editTipoPet, deleteTipoPet }