pouch = require '../lib/db'

BaseView = require '../lib/base_view'


module.exports = class DailyNoteWidget extends BaseView
    el: '#daily-note'
    template: require './templates/daily_note_widget'


    events:
        'keyup textarea': 'saveNote'
        'click .remove': 'deleteNote'


    afterRender: ->
        @textField = @$ 'textarea'
        @dateField = @$ '.date-field'
        @isSaving = false


    # Save note to database after 3s.
    saveNote: =>
        unless @isSaving
            @isSaving = true
            setTimeout =>
                @model.set 'date', @day
                @model.set 'text', @textField.val()
                pouch.notes.save @model.attributes, (err) =>
                    console.log err if err
                    @isSaving = false
            , 3000


    # Delete current note.
    deleteNote: =>
        pouch.notes.remove @model, =>
            Backbone.history.navigate 'archives', trigger: true

    # Resize text area (useful when window is resized).
    resizeTextArea: ->
        @textField?.height $(window).height() - 180


    # Display current widget for given day.
    # Reload text, if the widget is already visible.
    show: (day) ->

        unless @isSaving or @isTyping
            @day = day
            @_showEl()

            @showLoading()
            pouch.notes.get day, (err, model) =>
                @hideLoading()

                @model = model
                @textField.val model.get 'text'
                @dateField.html model.get 'date'

                @_focusTextarea()


    # Focus on given text area.
    _focusTextarea: ->
        @textField.focus()
        len = @textField.val().length
        @textField[0].setSelectionRange len, len


    # Show element.
    _showEl: ->
        @resizeTextArea()
        @$el.show()

