BaseView = require '../lib/base_view'
State = require './state'
simpleCrypto = require '../lib/crypto'

module.exports = class KeyManagementWidget extends BaseView
    el: '#key-management'
    template: require './templates/key_management_widget'


    events:
        'click button': 'onUseKeyClicked'


    afterRender: ->
        @textField = @$ '#key-field'
        @useKeyButton = @$ 'button'
        @textField.focus()

    onUseKeyClicked: ->
        @showLoading()
        passphrase =  @textField.val()
        simpleCrypto.createKey('passphrase')
        .then( (key) =>
            State.key = key
            @hideLoading()

            alert(
                'Key registered. All your messages will be encrypted with that key.'
            )
            @textField.val null
            window.app.router.navigate '', trigger: true
        )

    show: ->
        @$el.show()
        @useKeyButton.val null

