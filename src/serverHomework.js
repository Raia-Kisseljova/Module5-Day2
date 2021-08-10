
import express from "express" 
import cors from "cors"
import authorsRouter from "./authors/index.js"

const server = express()

const port = 3001

server.use(cors())
server.use(express.json()) 


server.use("/authors", authorsRouter)

server.listen(port, () => {
  console.log("Server listening on port " + port)
})