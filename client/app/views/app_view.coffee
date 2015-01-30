pouch = require '../lib/db'

BaseView = require '../lib/base_view'
DailyNote = require '../models/daily_note'
DailyNotes = require './daily_notes'
DailyNoteWidget = require './daily_note_widget'


# Represents main view, the one that builds widgets and display them
# depending on state given by the router.
# Sets window listeners to adapte the UI when resize occurs and to save current
# writing when the window is closed.
module.exports = class AppView extends BaseView

    el: 'body.application'
    template: require('./templates/home')


    getRenderData: ->
        date: moment().format 'DD/MM/YYYY'


    afterRender: ->
        @widgets = $ '.widget'

        @noteWidget = new DailyNoteWidget
        $(window).resize @noteWidget.resizeTextArea
        $(window).on 'unload', @noteWidget.saveNote

        @archivesWidget = $ '#archives'
        @notes = new DailyNotes

        @setSync()


    showWidget: (widget, id) ->
        @widgets.hide()
        @[widget] id if @[widget]?


    dailyNote: (day) ->
        day ?= moment().format 'YYYY-MM-DD'
        @noteWidget.show day


    archives: ->
        @archivesWidget.show()


    setSync: ->
        pouch.sync
            onChange: (info) =>
                console.log "change:"
                console.log info
                if info.direction is 'pull' and info.change.docs_written > 0
                    @noteWidget.show @noteWidget.model.date
            onUpToDate: (info) ->
                console.log "uptodate:"
                console.log info
            onError: (err) ->
                console.log "An error occured while synchronizing data:"
                console.log err

