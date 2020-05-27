const express = require('express')
const response =  require('../../../network/response')
const controller = require('./index')
const router = express.Router()

const login = (req, res) => {
    controller.login(req.body.username, req.body.password)
    .then((result) => {
        response.success(req, res, result, 200)
    }).catch((err) => {
        response.error(req, res, err.message, 500, err)
    })
}

router.post('/login', login)

module.exports = router