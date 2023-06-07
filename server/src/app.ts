import { config } from "dotenv";
import { sequelize } from "./db.js";
import express from 'express';
import cors from "cors";
import router from "./routes/index.js";
import "./models/models.js";

config();

const PORT = process.env.PORT || 5500;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

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