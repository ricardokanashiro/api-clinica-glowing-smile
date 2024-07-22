import { server } from "./app.js"

const startServer = async () => {
   try {
      await server.listen({ port: 4444 })
      console.log("Server listening on localhost:4444")
   } catch (error) {
      console.log("Error starting server, error: " + error)
   }
}

startServer()