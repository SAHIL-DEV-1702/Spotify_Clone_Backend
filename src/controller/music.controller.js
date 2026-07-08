const MusicModel = require('../model/Music.Model')
const jwt = require('jsonwebtoken')
const { uploadMusic } = require('../services/storage.service.js')

const createMusic = async (req, res) => {

    const token = req.cookies.token

    // console.log(token)

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "You Dont Have Access To Create Music" })
        }


        const { title, } = req.body
        const file = req.file
        console.log(file, "file")
        const result = await uploadMusic(file.buffer)

        // console.log(result, "result of file upload")

        const newMusic = new MusicModel({
            title,
            url: result.url,
            artist: decoded.id
        })

        res.status(201).json({
            message: "Music Created Successfully", music: {
                _id: newMusic._id,
                title: newMusic.title,
                url: newMusic.url,
                artist: newMusic.artist
            }
        })


    } catch (error) {
        res.status(401).json({ message: "Invalid Token" })
    }




}

module.exports = createMusic  