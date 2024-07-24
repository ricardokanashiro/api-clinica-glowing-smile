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

async function getAllTiposPet() {
   let tipos = await new Promise((resolve, reject) => {
      db.prepare("select * from tipo_pet")
         .all((err, rows) => {
            resolve(rows)
         })
   })

   return tipos
}

async function updateTipoPet({
   id, tipo, raca
}) {

   await db.prepare("update tipo_pet set tipo = ?, raca = ? where id_tipo = ?")
      .run([tipo, raca, id])
}

async function deleteTipoPet(id) {
   db.prepare("delete from tipo_pet where id_tipo = ?")
      .run(id)
}

export { getPetById, createTipoPet, getAllTiposPet, updateTipoPet, deleteTipoPet }