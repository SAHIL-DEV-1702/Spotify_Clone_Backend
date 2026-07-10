const jwt = require('jsonwebtoken')


const authArtist = async (req, res, next) => {

    const token = req.cookies.token
    if (!token) {
        res.status(401).json({ message: "Unothorized" })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role !== "artist") {
        return res.status(403).json({ message: "You don't have not acess " })
    }

    req.user = decoded
    next()
}

module.exports = authArtist