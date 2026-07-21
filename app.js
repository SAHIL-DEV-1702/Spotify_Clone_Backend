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
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}
))



app.use("/api/auth", authroute)
app.use("/api/music", musicroute)

connectDb()

app.listen(8000, (req, res) => {

    console.log("Server Run On PortNo", 8000)
})