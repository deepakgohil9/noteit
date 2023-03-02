const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async (req, res, next) => {
    try {
        let data = req.body

        let salt = await bcrypt.genSalt()
        data.password = await bcrypt.hash(data.password, salt)

        let user = new User(data)
        await user.save()

        res.send({ status: "user created", data: { id: user._id, name: user.name, email: user.email } })

    } catch (error) {
        req.err = error
        next()
    }
}

const login = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            throw new Error("user don't exist")
        }

        let isvalid = await bcrypt.compare(req.body.password, user.password)
        if (!isvalid) {
            throw new Error("invalid password")
        }

        let payload = { id: user._id, name: user.name, email: user.email }
        let token = jwt.sign(payload, process.env.JWT)

        res.cookie("access_token", token, { httpOnly: true }).send({ status: "user logged in", data: { id: user._id, name: user.name, email: user.email } })
    } catch (error) {
        req.err = error
        next()
    }
}

module.exports = { register, login }