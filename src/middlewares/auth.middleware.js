const jwt = require('jsonwebtoken')
const rateLimit = require('express-rate-limit')

const authArtist = async (req, res, next) => {

    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "Unothorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "You don't have acess " })
        }

        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
    }


}

const authUser = async (req, res, next) => {

    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "Unothorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch (error) {
        console.log(error, "error in authUser")
        return res.status(401).json({ message: "Invalid Token" })

    }
}

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
});

module.exports = { authArtist, authUser, loginLimiter }