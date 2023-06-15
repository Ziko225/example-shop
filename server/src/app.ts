import { config } from "dotenv";
import { sequelize } from "./db.js";
import staticDirHandler from "./util/staticDirHandler.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import express from 'express';
import router from "./routes/index.js";
import cors from "cors";
import path from "path";
import "./models/models.js";

config();
staticDirHandler();

const PORT = process.env.PORT || 5500;
const hostUrlSameClientUrl = process.env.HOST_URL_IS_SAME_CLIENT_URL === "true";

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: !hostUrlSameClientUrl
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve("src", "static")));
app.use(fileUpload({}));
app.use("/api", router);

app.use(errorMiddleware);

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