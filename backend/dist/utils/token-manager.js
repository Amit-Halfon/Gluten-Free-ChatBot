import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return token;
};
//# sourceMappingURL=token-manager.js.map