import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("name").isAlpha().withMessage("Name must be alphabetic"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("lastName").isAlpha().withMessage("Last name must be alphabetic"),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").notEmpty().withMessage("Password is required"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
];
//# sourceMappingURL=validators.js.map