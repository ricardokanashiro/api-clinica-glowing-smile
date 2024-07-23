async function registerConsulta(req, rep) {
   const id_consulta = uuidv4().substring(0, 12)
   const { data, horario, id_pet, id_responsavel, id_veterinario, nome, descricao } = req.body

   db.prepare(
      `insert into consulta (id_consulta, data, horario, id_pet, id_responsavel, id_veterinario, nome, descricao)
       values (?, ?, ?, ?, ?, ?, ?, ?)`
   )
      .run([id_consulta, data, horario, id_pet, id_responsavel, id_veterinario, nome, descricao])

   const newConsulta = await new Promise((resolve, reject) => {
      db.prepare("select * from consulta where id_consulta = ?")
         .get(id_consulta, (err, row) => {
            resolve(row)
         })
   })

   return rep.status(201).send(newConsulta)
}

async function getAllConsultas(req, rep) {
   const consultas = await new Promise((resolve, reject) => {
      db.prepare("select * from consulta")
         .all((err, rows) => {
            resolve(rows)
         })
   })

   return rep.status(200).send(consultas)
}

async function getConsulta(req, rep) {
   const { id } = req.params

   const consulta = await new Promise((resolve, reject) => {
      db.prepare("select * from consulta where id_consulta = ?")
         .get(id, (err, row) => {
            resolve(row)
         })
   })

   return rep.status(200).send(consulta)
}

async function editConsulta(req, rep) {
   const { id } = req.params
   const { data, horario, id_responsavel, id_pet, id_veterinario, nome, descricao } = req.body

   db.prepare(`
      update consulta set 
         data = ?, horario = ?, id_responsavel = ?, id_pet = ?, id_veterinario = ?, nome = ?, descricao = ?
      where id_consulta = ?
   `)
      .run([data, horario, id_responsavel, id_pet, id_veterinario, nome, descricao, id])

   const updatedConsulta = await new Promise((resolve, reject) => {
      db.prepare("select * from consulta where id_consulta = ?")
         .get(id, (err, row) => {
            resolve(row)
         })
   })

   return rep.status(200).send(updatedConsulta)
}

async function deleteConsulta(req, rep) {
   const { id } = req.params

   db.prepare("delete from consulta where id_consulta = ?")
      .run(id)

   return rep.status(200).send("Consulta deletada com sucesso")
}

export { registerConsulta, getAllConsultas, getConsulta, editConsulta, deleteConsulta }