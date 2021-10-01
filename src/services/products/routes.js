import createHttpError from "http-errors";
import db from "../../db/models/index.js";
import express from "express";
import s from "sequelize";
import { productValidation } from "./validation.js";
import { validationResult } from "express-validator";
// import User from "../../db/models/users.js";


const router = express.Router()
const { Category, Product, ProductCategory, Review, User } = db
const { Op } = s


// category + user + reviews [ user who wrote review ] ✅
router.get("/", async (req, res, next) => {
    try {
        const data = await Product.findAll({
            attributes: {exclude: ["createdAt"]},
            include: [
                { model: Review, include: User}
            ]
        })
        res.send(data)

    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.post("/", productValidation, async (req, res, next) => {
    const errorsList = validationResult(req);
    if (!errorsList.isEmpty()) {
        next(createHttpError(400, { errorsList }));

    } else {
        try {
            const product = await Product.create(req.body)
            res.status(201).send(product)

        } catch (error) {
        console.log(error)
        next(error)  
        }
    }
})

router.get("/:productId", async (req, res, next) => {
    try {
        const data = await Product.findAll({
            where: { id: req.params.productId },
            include: [
                { model: Review, include: User}
            ]
        })
        res.send(data)
        
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.put("/:productId", async (req, res, next) => {
    try {
        const data = await Product.update(req.body, {
            where: { id: req.params.productId },
            returning: true
        })

        res.send(data[1][0])
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.delete("/:productId", async (req, res, next) => {
    try {
        const rows = await Product.destroy({
            where: { id: req.params.productId }
        })

        if(rows > 0){
            res.send(204)

        } else {
            next(createHttpError(404), "Product not found")
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})


export default router