moment = require 'moment'
DailyNote = require '../models/dailynote'


module.exports =

    all: (req, res, next) ->
        DailyNote.all (err, notes) ->
            return next err if err
            res.send notes


    get: (req, res, next) ->
        date = moment(req.params.date, 'YYYY-MM-DD').startOf('day')
        note = DailyNote.getByDate date, (err, note) ->
            return next err if err

            res.send note


    createOrUpdate: (req, res, next) ->
        date = moment(req.params.date, 'YYYY-MM-DD').startOf('day')
        note = DailyNote.getByDate date, (err, note) ->
            return next err if err

            content = req.body.content
            if note?
                note.updateAttributes {content}, (err) ->
                    return next err if err
                    res.send success: true
            else
                DailyNote.create {date, content}, (err) ->
                    return next err if err
                    res.send success: true

