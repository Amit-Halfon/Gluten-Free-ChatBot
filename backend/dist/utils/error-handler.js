import { UnauthorizedError } from "express-oauth2-jwt-bearer";
export default function errorHandler(error, req, res, next) {
    if (error instanceof UnauthorizedError) {
        res.status(error.statusCode).json({
            error: {
                messege: error.message,
                code: "code" in error ? error.code : "ERR_AUTH",
            },
        });
        return;
    }
}
//# sourceMappingURL=error-handler.js.map