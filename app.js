const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const cookie_parser = require("cookie-parser")

const auth_route = require("./routes/auth")
const note_route = require("./routes/note")

dotenv.config()
const connect = () => {
    mongoose.connect(process.env.MONGO)
        .then(() => {
            console.log("connected to database!")
        })
        .catch((err) => {
            throw new Error(err)
        })
}

const PORT = process.env.PORT || 3000
const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(cookie_parser())

// custom routes
app.use("/auth", auth_route)
app.use("/note", note_route)

app.use((req, res) => {
    if (req.err) {
        console.log("in handler")
        console.log(req.err)
        res.status(400).send({ error: req.err })
    }
    else {
        res.status(404).send({ error: "404 not found" })
    }
})

app.listen(PORT, () => {
    connect()
    console.log("server started!")
})