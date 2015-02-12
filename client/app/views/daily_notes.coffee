pouch = require '../lib/db'
ViewCollection = require '../lib/view_collection'
DailyNotesCollection = require '../collections/daily_notes'
DailyNoteView = require './daily_note'

# Represents the archive note list.
module.exports = class DailyNotesView extends ViewCollection
    el: '#daily-notes'
    collectionEl: '#daily-notes'

    collection: new DailyNotesCollection()
    itemview: DailyNoteView

    # Set events:
    # * Render the whole list if the collections is reset.
    # * Render one line if the an element is added.
    afterRender: ->
        @collection.on 'reset', @renderAll
        @collection.on 'add', @renderOne

        @showLoading()
        @collection.fetch
            success: =>
                @hideLoading()
            error: (err) =>
                console.log err

