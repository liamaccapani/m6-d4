import { body } from "express-validator"

export const productValidation = [
  body("name").exists().withMessage("Name is a mandatory field!").isString().withMessage('It has to be a string'),
  body("category").exists().withMessage("Category is a mandatory field!").isString().withMessage('It has to be a string'),
  body("price").exists().withMessage("Price is a mandatory field!").isNumeric().withMessage('it has to be a number')
]