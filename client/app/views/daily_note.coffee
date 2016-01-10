BaseView = require '../lib/base_view'


# Represents a note displayed in the archive list.
module.exports = class DailyNoteView extends BaseView
    template: require './templates/daily_note'
    className: 'daily-note'


    # Set a max length for text attribute before rendering the line.
    getRenderData: ->
        date = moment(@model.get 'date').startOf 'day'
        data =
            date: date.format 'YYYY-MM-DD'
            text: @model.get 'text'

        data.displayDate = moment(data.date).format 'll'
        maxLength = 80
        if data.text?.length > maxLength
            data.text = "#{data.text.substring 0, maxLength}..."

        data

