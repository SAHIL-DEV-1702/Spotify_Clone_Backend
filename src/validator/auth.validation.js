const { body } = require("express-validator");
const validationMiddleware = require("../middlewares/validation.middleware.js");

const registerValidator = [

    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .isEmail()
        .withMessage("Invalid Email"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    validationMiddleware
];



const loginValidator = [
    body("email")
        .isEmail()
        .withMessage("Invalid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required"),

    validationMiddleware,
];

module.exports = { registerValidator, loginValidator }