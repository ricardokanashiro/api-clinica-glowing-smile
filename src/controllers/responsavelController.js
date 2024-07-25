import { 
   deleteResponsavelService,deleteTelefoneResponsavelService,editEnderecoResponsavelService,
   editResponsavelService, getAllReponsaveisService, 
   getAllTelefonesResponsavelService, 
   getEnderecoResponsavelService, getResponsavelService,
   registerTelefoneResponsavelService
} from "../services/responsavelService"

async function registerResponsavel(req, rep) {
   const { cpf, nome, cidade, bairro, rua } = req.body
   const enderecoId = uuidv4().substring(0, 12)

   db.prepare("insert into endereco_responsavel (id_endereco, cidade, bairro, rua) values (?, ?, ?, ?)")
      .run([enderecoId, cidade, bairro, rua])

   let newResponsavel = await new Promise((resolve, reject) => {
      db.prepare("select * from responsavel where cpf = ?")
         .get(cpf, (err, row) => {
            resolve(row)
         })
   })

   let newEndereco = await new Promise((resolve, reject) => {
      db.prepare("select * from endereco_responsavel where id_endereco = ?")
         .get(enderecoId, (err, row) => {
            resolve(row)
         })
   })

   return rep.status(201).send([newResponsavel, newEndereco])
}

async function getAllReponsaveis(req, rep) {
   
   const responsaveis = await getAllReponsaveisService()

   return rep.status(200).send(responsaveis)
}

async function getResponsavel(req, rep) {
   const { cpf } = req.params

   const responsavel = await getResponsavelService(cpf)

   return rep.status(200).send(responsavel)
}

async function getEnderecoResponsavel(req, rep) {
   const { cpf } = req.params

   const endereco = await getEnderecoResponsavelService(cpf)

   return rep.status(200).send(endereco)
}

async function editResponsavel(req, rep) {
   const { cpf } = req.params
   const { nome } = req.body

   const updatedResponsavel = await editResponsavelService({ cpf, nome })

   return rep.status(200).send(updatedResponsavel)
}

async function editEnderecoResponsavel(req, rep) {
   const { cpf } = req.params
   const { cidade, bairro, rua } = req.body

   const updatedEndereco = await editEnderecoResponsavelService({ cpf, cidade, bairro, rua })

   return rep.status(200).send(updatedEndereco)
}

async function deleteResponsavel(req, rep) {
   const { cpf } = req.params
   
   await deleteResponsavelService(cpf)

   return rep.status(200).send("Responsável deletado com sucesso")
}

async function registerTelefoneResponsavel(req, rep) {
   const { cpf } = req.params
   const { numero } = req.body

   const newTelefone = await registerTelefoneResponsavelService({ cpf, numero })

   return rep.status(201).send(newTelefone)
}

async function getTelefonesReponsavel(req, rep) {
   const { cpf } = req.params

   const numeros = await getAllTelefonesResponsavelService(cpf)

   return rep.status(200).send(numeros)
}

async function deleteTelefoneResponsavel(req, rep) {
   const { cpf } = req.params
   const { numero } = req.body

   await deleteTelefoneResponsavelService({ cpf, numero })

   return rep.status(200).send("Telefone deletado com sucesso")
}

export {
   registerResponsavel, getAllReponsaveis, getResponsavel,
   getEnderecoResponsavel, editResponsavel, editEnderecoResponsavel,
   deleteResponsavel, registerTelefoneResponsavel, getTelefonesReponsavel,
   deleteTelefoneResponsavel
}