BaseView = require '../lib/base_view'

# Represents a note displayed in the archive list.
module.exports = class DailyNoteView extends BaseView
    template: require './templates/daily_note'
    className: 'daily-note'

    # Set a max length for text attribute before rendering the line.
    getRenderData: ->
        data =
            date: @model.get 'date'
            text: @model.get 'text'

        maxLength = 80
        if data.text?.length > maxLength
            data.text = "#{data.text.substring 0, maxLength}..."

        data
