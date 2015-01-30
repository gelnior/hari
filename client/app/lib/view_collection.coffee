BaseView = require 'lib/base_view'

module.exports = class ViewCollection extends BaseView

    itemview: null

    views: {}

    template: -> ''

    itemViewOptions: ->

    collectionEl: null

    # add 'empty' class to view when there is no subview
    onChange: ->
        @$el.toggleClass 'empty', _.size(@views) is 0

    # can be overriden if we want to place the subviews somewhere else
    appendView: (view) ->
        @$collectionEl.append view.el

    # bind listeners to the collection
    initialize: ->
        if not @collectionEl?
            collectionEl = @el

        super
        @views = {}
        @listenTo @collection, "reset",   @onReset
        @listenTo @collection, "add",     @addItem
        @listenTo @collection, "remove",  @removeItem

        @render()

    # if we have views before a render call, we detach them
    render: ->
        view.$el.detach() for id, view of @views
        super
        @$collectionEl = $(@collectionEl)

    renderAll: =>
        @appendView view.$el for id, view of @views
        @onReset @collection
        @onChange @views

    # after render, we reattach the views
    afterRender: ->
        @$collectionEl = $(@collectionEl)
        @appendView view.$el for id, view of @views
        @onReset @collection
        @onChange @views

    # destroy all sub views before remove
    remove: ->
        @onReset []
        super

    # event listener for reset
    onReset: (newcollection) ->
        view.remove() for id, view of @views
        newcollection.forEach @addItem

    # event listeners for add
    addItem: (model) =>
        options = _.extend {}, {model: model}, @itemViewOptions(model)
        view = new @itemview(options)
        @views[model.cid] = view.render()
        @appendView view
        @onChange @views

    # event listeners for remove
    removeItem: (model) =>
        @views[model.cid].remove()
        delete @views[model.cid]

        @onChange @views
