const express = require("express")
const { registerValidator, loginValidator } = require('../validator/auth.validation.js')
const { registerUser, loginUser, logoutUser, getCurrentUser } = require("../controller/auth.controller.js")
const { authUser } = require("../middlewares/auth.middleware.js")
const { loginLimiter } = require("../middlewares/auth.middleware.js")

const router = express.Router();


router.post("/register", registerValidator, registerUser)

router.post("/login", loginValidator, loginLimiter, loginUser)

router.get("/logout", logoutUser)

router.get("/me", authUser, getCurrentUser)

module.exports = router