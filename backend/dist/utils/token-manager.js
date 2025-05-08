import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { COOKIE_NAME } from "./constants.js";
dotenv.config();
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return token;
};
export const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
};
//# sourceMappingURL=token-manager.js.map