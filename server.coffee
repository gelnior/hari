americano = require 'americano'
express = require 'express'
expressPouchDB = require 'express-pouchdb'


start = module.exports.start = (options, callback) ->
    options ?= {}
    options.name ?= 'hari'
    options.port ?= process.env.PORT or 9673
    options.host ?= "0.0.0.0"
    options.root ?= __dirname
    options.PouchDB ?= require 'pouchdb'

    americano.start options, (app, server) ->
        opts = {}
        app.use '/cozy', expressPouchDB(options.PouchDB, opts)
        options.db ?= new options.PouchDB 'db'

        callback? null, app, server

start() unless module.parent
