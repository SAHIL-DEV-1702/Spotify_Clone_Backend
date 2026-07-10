const mongoose = require("mongoose")

const MusicSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    url: {
        type: String,
        required: true
    }

},
    { timestamps: true })


const MusicModel = mongoose.model("Music", MusicSchema)



module.exports = MusicModel;