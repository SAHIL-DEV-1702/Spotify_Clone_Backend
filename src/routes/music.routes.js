const express = require("express")
const router = express.Router();
const { createMusic, createAlbum, getAllMusic, getAllAlbums, getAlbumById } = require("../controller/music.controller.js")
const multer = require("multer");
const { authArtist, authUser, } = require("../middlewares/auth.middleware.js");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/uploadmusic", authArtist, upload.single("music"), createMusic)

router.post("/album", authArtist, createAlbum)

router.get("/getallmusic", authUser, getAllMusic)

router.get("/getAlbums", authUser, getAllAlbums)

router.get("/albums/:albumId", authUser, getAlbumById)

module.exports = router
