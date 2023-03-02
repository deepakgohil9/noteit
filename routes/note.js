const express = require("express")
const verify_token = require("../utils/verify_token")
const { add_note, get_notes, update_note, delete_note } = require("../controllers/note")
const route = express.Router()

route.post("/", verify_token, add_note)
route.get("/", verify_token, get_notes)
route.put("/:noteid", verify_token, update_note)
route.delete("/:noteid", verify_token, delete_note)

module.exports = route