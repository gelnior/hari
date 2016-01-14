BaseView = require '../lib/base_view'
simpleCrypto = require '../lib/crypto'
State = require './state'


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
        content = @textField.val()
        vector = simpleCrypto.createNewVector()
        simpleCrypto.encrypt(content, State.key, vector)
        .then( (encryptedContent) =>
            @model.set
                content: encryptedContent
                vector: simpleCrypto.arrayBufferToString vector
            @model.save
                always: =>
        )


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
        @model = note

        @_showEl()

        encryptedContent = @model.get('content') or ''
        vector = @model.get('vector') or ''

        if encryptedContent.length is 0 or vector.length is 0
            @showContent content
        else
            cipherBuffer = simpleCrypto.stringToArrayBuffer encryptedContent
            vector = simpleCrypto.stringToArrayBuffer vector

            simpleCrypto.decrypt(cipherBuffer, State.key, vector)
            .then(@showContent)
            .catch (err) ->
                console.log 'bouh', err

        clearInterval @saveInterval
        @saveInterval = setInterval @saveNote, 1000


    showContent: (text) =>
        @textField.val text
        @dateField.html moment(@model.get 'date').format 'll'

        @_hideLoading()
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

