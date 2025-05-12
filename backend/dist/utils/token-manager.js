import dotenv from "dotenv";
import { auth } from "express-oauth2-jwt-bearer";
dotenv.config();
export const checkJwt = auth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
});
//# sourceMappingURL=token-manager.js.map