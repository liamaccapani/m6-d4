// define() the model here and export it

import { sequelize } from "../db.js";
import s from "sequelize";

const { DataTypes } = s

const Category = sequelize.define(
    "category", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
)

export default Category