americano = require 'americano'
express = require 'express'
expressPouchDB = require 'express-pouchdb'
PouchDB = require 'pouchdb'


start = module.exports.start = (options, callback) ->
    options ?= {}
    options.name ?= 'hari'
    options.port ?= process.env.PORT or 9673
    options.host ?= "0.0.0.0"
    options.root ?= __dirname

    americano.start options, (app, server) ->
        opts = {}
        unless options.db?
            app.use '/db', expressPouchDB(PouchDB, opts)
            options.db = new PouchDB 'cozy'

        callback? null, app, server

start() unless module.parent
