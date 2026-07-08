const express = require("express")
const router = express.Router();
const { createMusic } = require("../controller/music.controller.js")


router.post("/uploadmusic", createMusic)




module.exports = router
