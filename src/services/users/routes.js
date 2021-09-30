import createHttpError from "http-errors";
import db from "../../db/models/index.js";
import express from "express";
import s from "sequelize";


const router = express.Router()
const { Review, User } = db
const { Op } = s

// get user and reviews
router.get("/", async (req, res, next) => {
    try {
        const data = await User.findAll({
            attributes: {exclude: ["createdAt", "updatedAt"]}, // "id"
            include: Review
        })
        res.send(data)

    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const data = await User.create(req.body)
        res.status(201).send(data)

    } catch (error) {
    console.log(error)
    next(error)  
    }
    
})

router.get("/:userId", async (req, res, next) => {
    try {
        const data = await User.findAll({
            where: { id: req.params.userId },
            include: Review
        })
        res.send(data)
        
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.put("/:userId", async (req, res, next) => {
    try {
        const data = await User.update(req.body, {
            where: { id: req.params.userId },
            returning: true
        })

        res.send(data[1][0])
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.delete("/:userId", async (req, res, next) => {
    try {
        const rows = await User.destroy({
            where: { id: req.params.userId }
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