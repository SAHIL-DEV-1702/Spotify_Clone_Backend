const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    musics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Music",
    }],
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
    { timestamps: true })

const AlbumModel = mongoose.model("Album", AlbumSchema);

module.exports = AlbumModel;
