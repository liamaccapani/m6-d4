import express from "express";
import cors from "cors";
import { connectDB, testDB } from "./db/db.js";
import { badRequest, forbidden, notFound, serverError } from "./errorHandlers.js";
import categoriesRouter from "./services/categories/routes.js";
import productsRouter from "./services/products/routes.js";
import reviewsRouter from "./services/reviews/routes.js";
import usersRouter from "./services/users/routes.js";
// import db from "./db/models/index.js"

const server = express()

const { PORT = 5000 } = process.env

server.use(cors())
server.use(express.json())

server.use("/products", productsRouter)
server.use("/reviews", reviewsRouter)
server.use("/users", usersRouter)
server.use("/categories", categoriesRouter)

server.use(badRequest)
server.use(forbidden)
server.use(notFound)
server.use(serverError)

server.listen(PORT, async () => {
    console.log(`👂👂 Server listening on port ${PORT}`)
    await testDB()
    await connectDB()
})

server.on("error", (error) => {
    console.log("⛔ Server stopped", error)
})