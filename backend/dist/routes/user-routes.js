import { Router } from "express";
import { getAllUsers, userSignup, verifyUser, } from "../controllers/user-controllers.js";
import { checkJwt } from "../utils/token-manager.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers); // domain/api/v1/user
userRoutes.post("/signup", checkJwt, userSignup);
// userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", checkJwt, verifyUser);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map