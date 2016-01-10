module.exports = class DailyNote extends Backbone.Model

    urlRoot: 'daily-notes'

    constructor: ->
        super
        @set 'id',  @get('date').format('YYYY-MM-DD')
