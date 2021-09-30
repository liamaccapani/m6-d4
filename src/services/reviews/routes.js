import createHttpError from "http-errors";
import db from "../../db/models/models.js";
import express from "express";
import s from "sequelize";
import { reviewValidation } from "./validation.js";
import { validationResult } from "express-validator";


const router = express.Router()
const { Product, Review } = db
const { Op } = s

router.get("/", async (req, res, next) => {
    try {
        const data = await Review.findAll({
            attributes: {exclude: ["createdAt"]}, // "id"
        })
        res.send(data)

    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.post("/", reviewValidation, async (req, res, next) => {
    const errorsList = validationResult(req);
    if (!errorsList.isEmpty()) {
        next(createHttpError(400, { errorsList }));

    } else {
        try {
            const data = await Review.create(req.body)
            res.status(201).send(data)

        } catch (error) {
        console.log(error)
        next(error)  
        }
    }
})

router.get("/:reviewId", async (req, res, next) => {
    try {
        const data = await Review.findByPk(req.params.reviewId)
        res.send(data)
        
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.put("/:reviewId", async (req, res, next) => {
    try {
        const data = await Review.update(req.body, {
            where: { id: req.params.reviewId },
            returning: true
        })

        res.send(data[1][0])
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.delete("/:reviewId", async (req, res, next) => {
    try {
        const rows = await Review.destroy({
            where: { id: req.params.reviewId }
        })

        if(rows > 0){
            res.send(204)

        } else {
            next(createHttpError(404), "Review not found")
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})


export default router