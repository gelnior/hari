app = require 'application'
db = require 'lib/db'

# The function called from index.html
$ ->
    require 'lib/app_helpers'

    db.initialize()
    app.initialize()
