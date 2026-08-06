const { json } = require('express')
const UserModal = require('../model/User.Model.js')
const model = require('../model/User.Model.js')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const cookie = require("cookie-parser")
const { set } = require('mongoose')


const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const isAlreadyExists = await UserModal.findOne({
            $or: [{ email }, { name }],
        });

        if (isAlreadyExists) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await UserModal.create({
            name,
            email,
            password: hash,
            role,
        });

        const { password: _, ...userWithoutPassword } = user._doc;

        res.status(201).json({
            message: "User created successfully",
            user: userWithoutPassword,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

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

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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

const getCurrentUser = async (req, res) => {
    try {
        const user = await UserModal
            .findById(req.user.id)
            .select("-password");

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};


module.exports = { registerUser, loginUser, logoutUser, getCurrentUser }