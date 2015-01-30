AppView = require 'views/app_view'


module.exports = class Router extends Backbone.Router


    routes:
        '': 'main'
        'archives': 'archives'
        ':date': 'note'


    main: ->
        @displayWidget 'dailyNote'


    archives: ->
        @displayWidget 'archives'


    note: (date) ->
        @displayWidget 'dailyNote', date


    displayWidget: (view, id) ->
        @mainView = new AppView() unless mainWidget?
        @mainView.showWidget view, id

