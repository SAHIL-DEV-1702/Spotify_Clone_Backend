const MusicModel = require('../model/Music.Model.js')
const jwt = require('jsonwebtoken')
const { uploadMusic } = require('../services/storage.service.js')
const AlbumModel = require('../model/Album.Model.js')

const createMusic = async (req, res) => {

    const token = req.cookies.token


    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);
        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "You Dont Have Access To Create Music" })
        }

        const { title, } = req.body
        const file = req.file
        console.log(file, "file")
        const result = await uploadMusic(file.buffer)

        console.log(result, "result of file upload")

        const newMusic = new MusicModel({
            title,
            url: result.url,
            artist: decoded.id
        })

        await newMusic.save()
        console.log(newMusic, "newMusic")

        res.status(201).json({
            message: "Music Created Successfully", music: {
                _id: newMusic._id,
                title: newMusic.title,
                url: newMusic.url,
                artist: newMusic.artist
            }
        })


    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "Invalid Token" })
    }




}

const createAlbum = async (req, res) => {

    const token = req.cookies.token


    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== 'artist') {
            return res.status(403).json({ message: "You Dont Have Access To Create Music" })
        }

        const { title, musics } = req.body

        const newAlbum = new AlbumModel({
            title: title,
            musics: musics,
            artist: req.user.id
        })

        await newAlbum.save()
        console.log(newAlbum, "newAlbum")

        res.status(201).json({
            message: "Album Created Successfully", album: {
                _id: newAlbum._id,
                title: newAlbum.title,
                musics: newAlbum.musics,
                artist: newAlbum.artist
            }
        })

    }
    catch (error) {
        console.log(error, "error in createAlbum")
        res.status(401).json({ message: "Invalid Token", error: error.message })
    }



}

const getAllMusic = async (req, res) => {

    try {
        const musics = await MusicModel
            .find()
            .populate('artist', 'name email')
        res.status(200).json({ message: "All Music Retrieved Successfully", musics })
    }
    catch (error) {
        console.log(error, "error in getAllMusic")
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }

}

const getAllAlbums = async (req, res) => {

    try {
        const albums = await AlbumModel.find().select("title artist ").populate('artist', 'name email')
        res.status(200).json({ message: "All Albums Retrieved Successfully", albums })
    }
    catch (error) {
        console.log(error, "error in getAllAlbums")
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }

}

const getAlbumById = async (req, res) => {

    const albumId = req.params.albumId

    if (!albumId) {
        res.status(301).json({ message: "you have entered wrong id" })
    }

    const album = await AlbumModel.findById(albumId).populate('musics', 'title url').populate('artist', 'name email')

    return res.status(201).json({
        "message": "album fetch successfully",
        album: album
    })

}




module.exports = { createMusic, createAlbum, getAllMusic, getAllAlbums, getAlbumById }  