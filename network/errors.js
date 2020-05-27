const response = require('./response')

const errors = (err, req, res, next) =>{
    console.error('[ERROR]', err)
    const message = err.message || 'Internal error'
    const status = err.statusCode || 500
    response.error(req , res, message, status, err)
}

module.exports = errors