import { createSecretKey } from "crypto"; // npm i crypto
import dotenv from "dotenv";
dotenv.config();

const create = () => {
    return createSecretKey(process.env.APP_JWT_PRIVATE, "utf-8");
}

export default create;