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
    // Handle other errors
    res.status(500).json({ message: "Internal Server Error" });
}
//# sourceMappingURL=error-handler.js.map