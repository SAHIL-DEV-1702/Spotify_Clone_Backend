const express = require("express")
const router = express.Router();
const createMusic = require("../controller/music.controller.js")
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/uploadmusic", upload.single("music"), createMusic)




module.exports = router
