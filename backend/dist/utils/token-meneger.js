import { auth } from "express-oauth2-jwt-bearer";
import config from "../config/config.js";
const authenticateUser = auth({
    audience: config.audience,
    issuerBaseURL: config.issuerBaseUrl,
});
export default authenticateUser;
//# sourceMappingURL=token-meneger.js.map