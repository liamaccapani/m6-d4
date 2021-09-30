// define() the model here and export it

import { sequelize } from "../db.js";
import s from "sequelize";

const { DataTypes } = s

const User = sequelize.define(
    "user", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true 
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: "https://image.shutterstock.com/image-vector/default-avatar-profile-icon-grey-260nw-518740753.jpg"
        }
    }
)

export default User