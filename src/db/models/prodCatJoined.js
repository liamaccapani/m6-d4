// define() the model here and export it

import { sequelize } from "../db.js";
import s from "sequelize";

const { DataTypes } = s

const ProductCategory = sequelize.define(
    "productCategory", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true 
        }
    },
    {
        timestamps: false
    }
)

// ProductCategory.sync({force: true})
export default ProductCategory