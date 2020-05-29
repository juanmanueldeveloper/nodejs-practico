const express = require('express')
const response =  require('../../network/response')
const controller = require('./')
//const secure = require('./secure')
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

router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)
router.put('/', upsert)

module.exports = router