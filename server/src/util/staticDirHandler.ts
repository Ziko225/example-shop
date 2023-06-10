import { existsSync, mkdirSync } from "fs";
import path from "path";

const staticDirHandler = () => {
    const pathToStatic = path.resolve("src", "static");

    if (!existsSync(pathToStatic)) {
        try {
            mkdirSync(pathToStatic);
            console.log('Directory created successfully!');
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }
};

export default staticDirHandler;