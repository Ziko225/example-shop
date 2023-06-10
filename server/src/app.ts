import { config } from "dotenv";
import { sequelize } from "./db.js";
import staticDirHandler from "./util/staticDirHandler.js";
import errorHandler from "./middleware/errorHandler.js";
import fileUpload from "express-fileupload";
import express from 'express';
import router from "./routes/index.js";
import cors from "cors";
import path from "path";
import "./models/models.js";

config();
staticDirHandler();

const PORT = process.env.PORT || 5500;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve("src", "static")));
app.use(fileUpload({}));
app.use("/api", router);

app.use(errorHandler);

const startApp = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`server was started at ${PORT} port `));
    } catch (error) {
        console.error(error);
    }
};

startApp();