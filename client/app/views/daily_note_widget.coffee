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
                @model.set 'content', @textField.val()
                @model.save
                    success: =>
                        @isSaving = false
                        @saveNote()
                    error: ->
                        @isSaving = false
                        @saveNote()
            , 3000


    # Delete current note.
    deleteNote: =>
        @model.destroy()
        Backbone.history.navigate 'archives', trigger: true


    # Resize text area (useful when window is resized).
    resizeTextArea: ->
        @textField?.height $(window).height() - 180


    # Display current widget for given day.
    # Reload text, if the widget is already visible.
    show: (note) ->
        @_hideLoading()
        @model = note

        @_showEl()

        @textField.val @model.get('content') or ''
        @dateField.html moment(@model.get 'date').format 'll'

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


    _showLoading: ->
        @$('.spinner').show()


    _hideLoading: ->
        @$('.spinner').hide()

