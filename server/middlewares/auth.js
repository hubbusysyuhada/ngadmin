const {decoding} = require('../helpers/jwt')

function authentication (req, res, next) {
    const token = req.headers.access_token
    if (token) {
        req.loggedUser = decoding(token)
        next()
    } else {
        next({
            name: 'custom error',
            code: 403,
            message: 'forbidden'
        })
    }
}

module.exports = authentication