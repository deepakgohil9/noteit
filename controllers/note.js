const Note = require("../models/note")

const add_note = async (req, res, next) => {
    try {
        req.body.user_id = req.user.id
        let note = new Note(req.body)
        await note.save()
        res.send({ status: "note created", data: note })
    } catch (error) {
        req.err = error
        next()
    }
}

const get_notes = async (req, res, next) => {
    try {
        let notes = await Note.find({ user_id: req.user.id })
        res.send(notes)
    } catch (error) {
        req.err = error
        next()
    }
}

const update_note = async (req, res, next) => {
    try {
        let data = await Note.findByIdAndUpdate(req.params.noteid, req.body)
        res.send({ status: "note updated", data: data })
    } catch (error) {
        req.err = error
        next()
    }
}

const delete_note = async (req, res, next) => {
    try {
        let data = await Note.findByIdAndDelete(req.params.noteid)
        res.send({ status: "note deleted", data: data })
    } catch (error) {
        req.err = error
        next()
    }
}

module.exports = { add_note, get_notes, update_note, delete_note }