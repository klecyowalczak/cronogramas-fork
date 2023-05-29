import { AppDataSource } from "./src/databases/data-source"

const express = require("express")
const app = express()

app.use(express.json())

app.get('/', (request, response) => {
    return response.json("Server tá ON")
})

app.listen(3333)

AppDataSource.initialize()