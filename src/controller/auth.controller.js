const { json } = require('express')
const UserModal = require('../model/User.Model.js')
const model = require('../model/User.Model.js')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const cookie = require("cookie-parser")
const { set } = require('mongoose')


const registerUser = async (req, res) => {

    const { name, email, password, role } = req.body

    const isAlreadyExists = await UserModal.findOne({
        $or: [
            { email },
            { name }
        ]
    })

    if (isAlreadyExists) {
        return res.status(409).json("user already exists")
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await UserModal.create({
        name: name,
        email: email,
        password: hash,
        role: role
    }
    )

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET
    )
    console.log(token)
    res.cookie("token", token)
    res.status(200).json({ message: "user created successfully", user })

}

const loginUser = async (req, res) => {

    const { name, email, password } = req.body

    const user = await UserModal.findOne({
        $or: [
            { email },
            { name }
        ]
    })

    if (!user) {
        return res.status(401).json({ message: "Invalid Creadentials" })
    }
    console.log(password, user.password)

    const isPasswordvalid = await bcrypt.compare(password, user.password)

    console.log("validpassword", isPasswordvalid)

    if (!isPasswordvalid) {
        return res.status(401).json({ message: "Invalid Creadentials" })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token)
    res.status(200).json({
        message: "loggedinn successfully", user: {
            email: user.email,
            name: user.name,
            id: user._id,
            role: user.role
        }
    })
}

const logoutUser = (req, res) => {

    try {
        res.clearCookie("token")
        res.status(200).json({ message: "logged out successfully" })
    } catch (error) {
        res.status(401).json({ "messege": "failed to logout" })
    }

}


module.exports = { registerUser, loginUser, logoutUser }