exports.config =
    files:
        javascripts:
            joinTo:
                'javascripts/app.js': /^app/
                'javascripts/vendor.js': /^(bower_components|vendor)/
            order:
                # Files in `vendor` directories are compiled before other files
                # even if they aren't specified in order.
                before: [
                    'vendor/javascripts/jquery-2.1.1.min.js'
                    'vendor/javascripts/underscore-1.6.0.min.js'
                    'vendor/javascripts/backbone-1.1.2.min.js'
                    'vendor/javascripts/bootstrap-3.1.1.min.js'
                    'vendor/javascripts/moment-2.9.0.min.js'
                    'vendor/javascripts/moment-2.9.0.min.js'
                    'bower_components/crypto-js/crypto-js.js'
                ]

        stylesheets:
            joinTo: 'stylesheets/app.css'
            order:
                before: []
                after: ['vendor/stylesheets/helpers.css']

        templates:
            defaultExtension: 'jade'
            joinTo: 'javascripts/app.js'
