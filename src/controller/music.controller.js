const MusicModel = require('../model/Music.Model')
const jwt = require('jsonwebtoken')
const { uploadMusic } = require('../services/storage.service.js')

const createMusic = async (req, res) => {

    const token = req.cookies.token

    console.log(token)

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "You Dont Have Access To Create Music" })
        }

    } catch (error) {
        res.status(401).json({ message: "Invalid Token" })
        console.log(error)
    }

    const { title, } = req.body
    const { file } = req.files

    const result = await uploadMusic(file.data)

    const newMusic = new MusicModel({
        title,
        url: result.url,
        artist: decoded.id
    })

    res.status(201).json({ message: "Music Created Successfully", music: newMusic })


}

module.exports = { createMusic } 