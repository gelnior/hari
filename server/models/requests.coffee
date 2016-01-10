# See documentation on https://github.com/frankrousseau/americano-cozy/#requests

americano = require 'americano'

module.exports =
    dailynote:
        all: americano.defaultRequests.all
        byDate: americano.defaultRequests.by 'date'

