BaseView = require '../lib/base_view'
State = require './state'
simpleCrypto = require '../lib/crypto'

module.exports = class KeyManagementWidget extends BaseView
    el: '#key-management'
    template: require './templates/key_management_widget'


    events:
        'click button': 'onUseKeyClicked'
        'keyup input': 'onTextKeyUp'


    afterRender: ->
        @textField = @$ '#key-field'
        @useKeyButton = @$ 'button'
        @textField.focus()


    onTextKeyUp: (event) ->
        @onUseKeyClicked() if 13 in [event.keyCode, event.which]


    onUseKeyClicked: ->
        @showLoading()
        passphrase =  @textField.val()
        simpleCrypto.createKey('passphrase')
        .then( (key) =>
            State.key = key
            @hideLoading()

            alert(
                'Key registered. You are now ready to use Hari!'
            )
            @textField.val null
            window.app.router.navigate '', trigger: true
        )


    show: ->
        State.key = null
        @$el.show()
        @useKeyButton.val null

