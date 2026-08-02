const jwt = require('jsonwebtoken')


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

module.exports = { authArtist, authUser }