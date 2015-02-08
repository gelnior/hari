DailyNote = require '../models/daily_note'

module.exports = pouch =

    db: new PouchDB 'db'


    notes:

        get: (day, callback) ->
            pouch.db.get "dailynote-#{day}", (err, doc) ->
                doc ?=
                    _id: "dailynote-#{day}"
                    docType: "DailyNote"
                    date: day
                    text: ''

                callback err, new DailyNote doc


        remove: (doc, callback) ->
            pouch.db.remove doc.attributes, (err) ->
                callback?()


        save: (doc, callback) ->
            pouch.db.get doc._id, (err, dbDoc) =>

                if err and err.status isnt 404
                    console.log 'An error occured with PouchDB:'
                    console.log err

                else
                    doc._rev = dbDoc._rev if dbDoc?
                    pouch.db.put doc, (err, doc) =>

                        if err
                            console.log 'An error occured with PouchDB:'
                            console.log err

                        else
                            doc._rev = doc.rev

                        callback?()


        all: (callback) ->
            pouch.db.allDocs include_docs: true, (err, res) =>

                if err
                    callback err

                else
                    notes = []
                    for doc in res.rows
                        if doc.doc.docType is 'DailyNote'
                            notes.push new DailyNote doc.doc

                    callback null, notes


    sync: (options) ->

        syncOptions =
            filter: (doc) -> doc.docType is 'DailyNote'

        url = window.location.protocol + '//' + \
              window.location.host + '/db/cozy'

        pouch.db.allDocs include_docs: true, (err, docs) ->
            for doc in docs.rows
                pouch.db.remove doc.doc unless doc.doc.date

        pouch.db.sync url, syncOptions
            .on 'complete', ->
                setInterval ->
                    sync = pouch.db.sync url, syncOptions
                        .on 'change', options.onChange
                        .on 'uptodate',  options.onUpToDate
                        .on 'error',  options.onUpToDate
                , 2000
