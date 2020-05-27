const jwt = require('jsonwebtoken')
const config = require('../config')

const sign = (data) => {
    return jwt.sign(data, config.api.privateKey)
}

module.exports = {
    sign
}