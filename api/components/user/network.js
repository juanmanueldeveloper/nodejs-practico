const express = require('express')
const response =  require('../../../network/response')
const controller = require('./index')
const secure = require('./secure')
const router = express.Router()

const list = (req, res, next)=> {
    controller.list()
    .then((result) => {
        response.success(req, res, result, 200)
    }).catch(next)
}

const get = (req, res, next)=> {
    controller.get(req.params.id)
    .then((result) => {
        response.success(req, res, result, 200)
    }).catch(next)
}

const upsert = (req, res, next)=> {
    controller.upsert(req.body)
    .then((result) => {
        response.success(req, res, result, 200)
    }).catch(next)
}

const remove = (req, res, next)=> {
    controller.remove(req.params.id)
    .then((result) => {
        response.success(req, res, result, 200)
    }).catch(next)
}

//ROUTES
router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)
router.put('/', secure('update'), upsert)
router.post('/:id', remove)

module.exports = router