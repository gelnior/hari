# Base component to build widgets.
module.exports = class BaseView extends Backbone.View

    template: ->

    initialize: ->
        @render()

    getRenderData: ->
        model: @model?.toJSON()

    render: ->
        @beforeRender()
        @$el.html @template(@getRenderData())
        @afterRender()
        @

    beforeRender: ->

    afterRender: ->

    destroy: ->
        @undelegateEvents()
        @$el.removeData().unbind()
        @remove()
        Backbone.View::remove.call @

    showLoading: ->
        @$('.spinner').show()

    hideLoading: ->
        @$('.spinner').hide()
