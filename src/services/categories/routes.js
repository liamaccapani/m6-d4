import createHttpError from "http-errors";
import db from "../../db/models/index.js";
import express from "express";
import s from "sequelize";

// FILTER BY CATEGORY
const router = express.Router()
const { Category } = db
const { Op } = s

router.get("/", async (req, res, next) => {
    try {
        const data = await Category.findAll({
            attributes: {exclude: ["createdAt"]}, // "id"
        })
        res.send(data)

    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const data = await Category.create(req.body)
        res.status(201).send(data)

    } catch (error) {
    console.log(error)
    next(error)  
    }

})

router.get("/:categoryId", async (req, res, next) => {
    try {
        const data = await Category.findByPk(req.params.categoryId)
        res.send(data)
        
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.put("/:categoryId", async (req, res, next) => {
    try {
        const data = await Category.update(req.body, {
            where: { id: req.params.categoryId },
            returning: true
        })

        res.send(data[1][0])
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.delete("/:categoryId", async (req, res, next) => {
    try {
        const rows = await Category.destroy({
            where: { id: req.params.categoryId }
        })

        if(rows > 0){
            res.send(204)

        } else {
            next(createHttpError(404), "Category not found")
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})

export default router