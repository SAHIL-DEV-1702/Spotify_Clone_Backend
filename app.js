const express = require("express")
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
const app = express();
const cookieParser = require('cookie-parser');
const connectDb = require("./src/db/Db.Connection.js")
const authroute = require('./src/routes/auth.routes.js')
const musicroute = require('./src/routes/music.routes.js')

app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin: process.env.App_Origin,
        credentials: true,
    }
))

// app.use(
//     cors({
//         origin: true,
//         credentials: true,
//     })
// );

app.use("/api/auth", authroute)
app.use("/api/music", musicroute)

connectDb()

const PORT = process.env.PORT || 8000

app.listen(PORT, (req, res) => {

    console.log("Server Run On port", PORT)
})