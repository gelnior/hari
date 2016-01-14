BaseView = require '../lib/base_view'
simpleCrypto = require '../lib/crypto'
State = require './state'


module.exports = class DailyNoteWidget extends BaseView
    el: '#daily-note'
    template: require './templates/daily_note_widget'


    events:
        'click .remove': 'deleteNote'


    afterRender: ->
        @textField = @$ 'textarea'
        @dateField = @$ '.date-field'
        @isSaving = false
        @previousContent = ''


    # Save note to database. Encrypt content before updating the model and
    # saving. That way only encrypted content is stored on the server.
    saveNote: =>
        content = @textField.val()
        vector = simpleCrypto.createNewVector()

        unless content is @previousContent
            simpleCrypto.encrypt(content, State.key, vector)
            .then( (encryptedContent) =>
                @previousContent = content
                @model.set
                    content: encryptedContent
                    vector: simpleCrypto.arrayBufferToString vector
                @model.save()
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
    # Decrypt content is content comes from the model. Data are stored
    # encrypted, so decryption is required.
    show: (note) ->
        @model = note

        @_showEl()

        encryptedContent = @model.get('content') or ''
        vector = @model.get('vector') or ''

        if encryptedContent.length is 0 or vector.length is 0
            @_showContent content
        else
            cipherBuffer = simpleCrypto.stringToArrayBuffer encryptedContent
            vector = simpleCrypto.stringToArrayBuffer vector

            simpleCrypto.decrypt(cipherBuffer, State.key, vector)
            .then(@_showContent)
            .catch (err) =>
                console.log err
                alert '''
An error occured will decrypting your message. Is your key right?'''
                @_showContent ''

        clearInterval @saveInterval
        @saveInterval = setInterval @saveNote, 1000


    # Fill content with given text and focus on the text area.
    _showContent: (text) =>
        text = '' unless typeof(text) is 'string'
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

