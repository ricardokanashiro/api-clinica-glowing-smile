async function getPetById(id) {
   await new Promise((resolve, reject) => {
      db.prepare("select * from tipo_pet where id_tipo = ?")
         .get(id_tipo, (err, row) => {
            resolve(row)
         })
   })
}

async function createTipoPet({ id_tipo, tipo, raca }) {
   await db.prepare("insert into tipo_pet (id_tipo, tipo, raca) values (?, ?, ?)")
      .run([id_tipo, tipo, raca])
}

export { getPetById, createTipoPet }