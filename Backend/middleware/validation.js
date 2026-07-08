const { body, validationResult } = require("express-validator");

const registerValidation = [

    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .isEmail()
        .withMessage("Valid email is required"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")

];

const loginValidation = [

    body("email")
        .isEmail()
        .withMessage("Valid email required"),

    body("password")
        .notEmpty()
        .withMessage("Password required")

];

const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({

            success: false,

            errors: errors.array()

        });

    }

    next();

};

module.exports = {
    registerValidation,
    loginValidation,
    validate
};