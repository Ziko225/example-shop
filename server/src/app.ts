import { config } from "dotenv";
import express from 'express';

config();

const PORT = process.env.PORT || 5500;

const app = express();

const startApp = () => {
    try {
        app.listen(PORT, () => console.log(`server was started at ${PORT} port `));

    } catch (error) {
        console.log(error);
    }
};

startApp();