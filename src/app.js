import fastify from "fastify"

import { 
   consultaRoutes, petRoutes, responsavelRoutes, veterinarioRoutes
} from "./routes/index.js"

const server = fastify()

server.register(consultaRoutes, { prefix: "/consulta" })
server.register(responsavelRoutes, { prefix: "/responsavel" })
server.register(veterinarioRoutes, { prefix: "/veterinario" })
server.register(petRoutes, { prefix: "/pet" })

export { server }