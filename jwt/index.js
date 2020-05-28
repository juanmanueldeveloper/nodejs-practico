const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('../utils/error')

const sign = (data) => {
    return jwt.sign(data, config.jwt.privateKey)
}

const getToken = (authorization)=> {
    //Bearer xxxxxxxxxx
    if(!authorization){
        throw error('You must enter authorization token', 500)
    }

    if(authorization.indexOf('Bearer ') === -1){
        throw error('Invalid format token', 500)

    }

    let token = authorization.split(' ')[1]

    return token
}

const isValid = (token) => {
    return jwt.verify(token, config.jwt.privateKey)
}

const decodeHeader =  (req) => {
    const authorization = req.headers.authorization || ''
    const token = getToken(authorization)
    const decoded = isValid(token)
    req.user = decoded

    return decoded
}

const check = {
    own: function(req, owner){
        const result = decodeHeader(req)
        if(result.id !== owner){
            throw error('Permission denied', 401)
        } 
    },
    logged: function(req) {
        const result = decodeHeader(req)
    }
    
}

module.exports = {
    sign,
    check
}