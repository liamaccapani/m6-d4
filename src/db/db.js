// create template instance for database test an connection
import { Sequelize } from "sequelize";

const { PGDATABASE, PGHOST, PGPASSWORD, PGPORT, PGUSER } = process.env

// create an instance with sequelize constructor
export const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    // port: PGPORT,
    host: PGHOST,
    dialect: "postgres"
})

// use instance to establish connection --> ⚠ connection = async operation
/* 1. check if credential are ok --> authenticate() */
export const testDB = async () => {
    try {
        await sequelize.authenticate()
        console.log("👌 DB is authenticated")
    } catch (error) {
        console.log(error)
    }
}

/* 2. establish connection --> sync() */
export const connectDB = async () => {
    try {
       await sequelize.sync({alter: true})
       console.log("🔗 DB is connected") 
    } catch (error) {
        console.log(error)
    }
}