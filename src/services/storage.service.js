
const ImageKit = require("@imagekit/nodejs");

const imagekitInstance = new ImageKit({

    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,

});

const uploadFile = async (buffer) => {

    const result = await imagekitInstance.files.upload({
        file: buffer.toString("base64"),
        filename: "music_" + Date.now() + ".mp3",
        folder: "/Musicweb_app" // Optional: Specify a folder in ImageKit to store the file
    })
    return result;
}

module.exports = {
    uploadFile
};