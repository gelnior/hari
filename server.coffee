americano = require 'americano'

process.env.TZ = 'UTC'

start = module.exports.start = (options, callback) ->
    options ?= {}
    options.name ?= 'hari'
    options.port ?= process.env.PORT or 9673
    options.host ?= process.env.HOST or "0.0.0.0"
    options.root ?= __dirname

    americano.start options, (app, server) ->
        opts = {}
        callback? null, app, server

start() unless module.parent
