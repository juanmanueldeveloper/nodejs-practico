const express = require('express')
const response =  require('../../../network/response')
const controller = require('./index')
const secure = require('./secure')
const router = express.Router()

const login = (req, res, next) => {
    controller.login(req.body.username, req.body.password)
    .then((result) => {
        response.success(req, res, result, 200)
    }).catch(next)
}

router.post('/login', secure('read'), login)

module.exports = router