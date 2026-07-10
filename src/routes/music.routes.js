const express = require("express")
const router = express.Router();
const { createMusic, createAlbum, getAllMusic } = require("../controller/music.controller.js")
const multer = require("multer");
const authArtist = require("../middlewares/auth.middleware.js");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/uploadmusic", authArtist, upload.single("music"), createMusic)

router.post("/album", authArtist, createAlbum)

router.get("/getallmusic", getAllMusic)

module.exports = router
