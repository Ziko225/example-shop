import { config } from "dotenv";
import { sequelize } from "./db.js";
import express from 'express';
import "./models/models.js";

config();

const PORT = process.env.PORT || 5500;

const app = express();

const startApp = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`server was started at ${PORT} port `));

    } catch (error) {
        console.log(error);
    }
};


startApp();