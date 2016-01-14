moment = require 'moment'
DailyNote = require '../models/dailynote'


module.exports =

    # Return all notes.
    all: (req, res, next) ->
        DailyNote.all (err, notes) ->
            return next err if err
            res.send notes


    # Get note corresponding to given day.
    # Day can be considered as the note ID.
    get: (req, res, next) ->
        date = moment(req.params.date, 'YYYY-MM-DD').startOf('day')
        note = DailyNote.getByDate date, (err, note) ->
            return next err if err

            res.send note


    # Update content and vector for a given if it exists. There is no need to
    # update other fields.
    # It creates the note, if it doesn't exist.
    createOrUpdate: (req, res, next) ->
        date = moment(req.params.date, 'YYYY-MM-DD').startOf('day')
        note = DailyNote.getByDate date, (err, note) ->
            return next err if err

            {content, vector} = req.body
            if note?
                note.updateAttributes {content, vector}, (err) ->
                    return next err if err
                    res.send success: true
            else
                DailyNote.create {date, content, vector}, (err) ->
                    return next err if err
                    res.send success: true


    # Remove given note from database.
    delete: (req, res, next) ->
        date = moment(req.params.date, 'YYYY-MM-DD').startOf('day')
        note = DailyNote.getByDate date, (err, note) ->
            return next err if err

            if note?
                note.destroy (err) ->
                    return next err if err
                    res.send success: true, 204
            else
                res.sendStatus 404



