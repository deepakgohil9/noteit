const jwt = require("jsonwebtoken")

const verify_token = async (req, res, next) => {
    let token = req.cookies.access_token

    if (!token) {
        res.status(400).send({ error: "please loggin" })
        return
    }
    try {
        req.user = jwt.verify(token, process.env.JWT)
        next()
    } catch (error) {
        res.status(400).send({ error: "invalid token" })
    }
}

module.exports = verify_token