cozydb = require 'cozydb'


module.exports = DailyNote = cozydb.getModel 'DailyNote',
    date: Date
    content: String
    vector: String


DailyNote.all = (callback) ->
    DailyNote.request 'byDate', callback


DailyNote.getByDate = (date, callback) ->
    DailyNote.request 'byDate', key: date, (err, notes) ->
        return callback err if err
        callback null, notes[0]

