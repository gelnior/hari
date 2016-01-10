
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


    # After the main view is rendered, it builds the daily note widget
    # that allows the user to write his note.
    afterRender: ->
        @widgets = $ '.widget'

        @noteWidget = new DailyNoteWidget
        $(window).resize @noteWidget.resizeTextArea
        $(window).on 'unload', @noteWidget.saveNote

        @archivesWidget = $ '#archives'
        @notes = new DailyNotes


    # Display given widget (note editor, note list...)
    showWidget: (widget, date) ->
        @widgets.hide()
        @[widget] date if @[widget]?


    # Load an display given note.
    dailyNote: (day) ->
        if day?
            day = moment(day).startOf 'day'
        else
            day = moment().startOf 'day'

        dayValue = "#{day.format 'YYYY-MM-DDT00:00:00.000'}Z"
        note = @notes.collection.findWhere
            date: dayValue

        if note?
            note.set 'id',  day.format('YYYY-MM-DD')
            @noteWidget.show note
        else
            note ?= new DailyNote date: day
            note.fetch
                success: (model) =>
                    note.set 'id',  day.format('YYYY-MM-DD')
                    @noteWidget.show note
                error: (model) =>
                    @noteWidget.show model


    # Show archives widget.
    archives: ->
        @archivesWidget.show()

