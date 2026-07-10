const express = require("express")
const { registerValidator, loginValidator } = require('../validator/auth.validation.js')
const { registerUser, loginUser, logoutUser } = require("../controller/auth.controller.js")
const { authUser } = require("../middlewares/auth.middleware.js")

const router = express.Router();


router.post("/register", registerValidator, registerUser)

router.post("/login", loginValidator, loginUser)

router.get("/logout", authUser, logoutUser)

module.exports = router