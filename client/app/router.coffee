AppView = require 'views/app_view'


module.exports = class Router extends Backbone.Router


    routes:
        '': 'main'
        'archives': 'archives'
        'key': 'key'
        ':date': 'note'


    main: ->
        day = moment()
        @navigate day.format('YYYY-MM-DD'), trigger: true


    key: ->
        @displayWidget 'key'


    archives: ->
        @displayWidget 'archives'


    note: (date) ->
        @displayWidget 'dailyNote', date


    displayWidget: (view, date) ->
        @mainView ?= new AppView()
        @mainView.showWidget view, date

