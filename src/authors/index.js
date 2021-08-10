import { fileURLToPath } from "url" 
import { dirname, join } from "path" 
import fs from "fs" 

import express from "express" 
import uniqid from "uniqid"

const authorsRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)
const currentDirPath = dirname(currentFilePath)
const authorsJSONPath = join(currentDirPath, "authors.json")

authorsRouter.post("/", (request, response) => {
  const email = request.body.email;
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));

  if (authors.some(author => author.email === email)) {
    response.status(400).send({ email: "This email is taken." });
    return;
  }

  const newAuthor = {
    ...request.body, 
    id: uniqid(),
    avatar: `https://ui-avatars.com/api?name=${request.body.name}+${request.body.surname}`
  }

  authors.push(newAuthor)
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors))
  response.status(201).send({ id: newAuthor.id })
})

authorsRouter.get("/", (request, response) => {
  const fileContent = fs.readFileSync(authorsJSONPath) 
  response.send(JSON.parse(fileContent)) 
})

authorsRouter.get("/:authorID", (request, response) => {
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))
  const author = authors.find(a => a.id === request.params.authorID)
  response.send(author)
})

authorsRouter.put("/:authorID", (request, response) => {
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))
  const remainingAuthors = authors.filter(author => author.id !== request.params.authorID)
  const updatedAuthor = { ...request.body, id: request.params.authorID }
  remainingAuthors.push(updatedAuthor)
  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors))
  response.send(updatedAuthor)
})

authorsRouter.delete("/:authorID", (request, response) => {
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath))
  const remainingAuthors = authors.filter(author => author.id !== request.params.authorID)
  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors))
  response.status(204).send()
})

authorsRouter.post("/checkEmail", (request, response) =>{
  const email = request.body.email;
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));
  const result = authors.some(author => author.email === email)
  response.send(result)
})

export default authorsRouter