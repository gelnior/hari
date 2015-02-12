module.exports = class DailyNotesCollection extends Backbone.Collection
    model: require '../models/daily_note'
    pouch:
        options:
            query:
                fun:
                    map: (doc) ->
                        emit doc.name, null if doc.docType is 'DailyNote'
            changes:
                include_docs: true
                filter: (doc) ->
                    doc._deleted or doc.docType is 'DailyNote'
    parse: (result) ->
        _.pluck(result.rows, 'doc').reverse()
