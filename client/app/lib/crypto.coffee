crypto = window.crypto

encoder = new TextEncoder("utf-8")
decoder = new TextDecoder("utf-8")

module.exports = simpleCrypto =


    stringToArrayBuffer: (str) ->
        #return encoder.encode str
        buf = new ArrayBuffer str.length
        bufView = new Uint8Array buf
        for i in [0..str.length]
            bufView[i] = str.charCodeAt(i)
        return bufView


    arrayBufferToString: (buffer) ->
        #return decoder.decode buffer
        return String.fromCharCode.apply(null, new Uint8Array(buffer))


    createNewVector: ->
        crypto.getRandomValues new Uint8Array 16


    createKey: (password) ->
        salt = "556392fd2f545ef8f456faa0e065f7a"
        iterations = 100
        hash = "SHA-256"
        passBuffer = simpleCrypto.stringToArrayBuffer password
        saltBuffer = simpleCrypto.stringToArrayBuffer salt

        crypto.subtle.importKey(
            "raw",
            passBuffer,
            name: "PBKDF2",
            false,
            ["deriveKey"]
        ).then((baseKey) =>
            opts =
                name: "PBKDF2"
                salt: saltBuffer
                iterations: iterations
                hash: hash

            algo =
                name: "AES-CBC"
                length: 256

            return crypto.subtle.deriveKey(
                opts, baseKey, algo, true, ["encrypt", "decrypt"])
        ).catch( (err) ->
            console.log 'An error occured while generating encryption key'
            console.log err
        )


    encrypt: (text, key, vector) ->
        opts =
            name: 'AES-CBC'
            iv: vector
        textBuffer = simpleCrypto.stringToArrayBuffer text

        crypto.subtle.encrypt(opts, key, textBuffer)
        .then (result) ->
            new Promise (resolve, reject) ->
                resolve simpleCrypto.arrayBufferToString result


    decrypt: (cipher, key, vector) ->
        opts =
            name: 'AES-CBC'
            iv: vector

        crypto.subtle.decrypt(opts, key, cipher)
        .then (result) ->
            console.log 'result', result
            new Promise (resolve, reject) ->
                console.log 'result', result
                resolve simpleCrypto.arrayBufferToString result


    createEncrypter: (key) ->
        new Encrypter key


