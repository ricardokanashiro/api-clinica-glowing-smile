import fastify from "fastify"

import { 
   consultaRoutes, petRoutes, responsavelRoutes, veterinarioRoutes, tipoPetRoutes
} from "./routes/index.js"

const server = fastify()

server.register(consultaRoutes, { prefix: "/consulta" })
server.register(responsavelRoutes, { prefix: "/responsavel" })
server.register(veterinarioRoutes, { prefix: "/veterinario" })
server.register(petRoutes, { prefix: "/pet" })
server.register(tipoPetRoutes, { prefix: "/pet/tipo" })

export { server }