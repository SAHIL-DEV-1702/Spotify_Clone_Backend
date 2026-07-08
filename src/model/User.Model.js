
const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: true
        },
        role: {
            type: String,
            enum: ["user", "artist"],
            default: "user"
        }
    },
    { timestamps: true }
)

const UserModal = mongoose.model("user", UserSchema)

module.exports = UserModal