import { body } from "express-validator"

export const reviewValidation = [
  body("text").exists().withMessage("Name is a mandatory field!").isString().withMessage('It has to be a string'),
  body("username").exists().withMessage("Category is a mandatory field!").isString().withMessage('It has to be a string'),
  body("productId").exists().withMessage("Category is a mandatory field!").isNumeric().withMessage('It has to be a number')
]