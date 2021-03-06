// define() the model here and export it

import { sequelize } from "../db.js";
import s from "sequelize";

const { DataTypes } = s

const Product = sequelize.define(
    "product", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: "https://www.debonisarredo.it/site/images/joomlart/demo/default.jpg"
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }
)

// Product.sync({force: true})

export default Product