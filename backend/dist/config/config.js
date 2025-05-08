import dotenv from "dotenv";
dotenv.config();
const config = {
    audience: process.env.AUDIENCE || "",
    issuerBaseUrl: process.env.ISSUER_BASE_URL || "",
    jwsSecret: process.env.JWT_SECRET || "",
};
export default config;
//# sourceMappingURL=config.js.map