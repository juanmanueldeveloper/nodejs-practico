const express = require('express')
const response =  require('../../../network/response')
const controller = require('./index')
const router = express.Router()

const list = (req, res)=> {
    controller.list()
    .then((result) => {
        response.success(req, res, result, 200)
    }).catch((err) => {
        response.error(req, res, err.message, 500, err)
    });
}

const get = (req, res)=> {
    controller.get(req.params.id)
    .then((result) => {
        response.success(req, res, result, 200)
    }).catch((err) => {
        response.error(req, res, err.message, 500, err)
    });
}

const upsert = (req, res)=> {
    controller.upsert(req.body)
    .then((result) => {
        response.success(req, res, result, 200)
    }).catch((err) => {
        response.error(req, res, err.message, 500, err)
    });
}

const remove = (req, res)=> {
    controller.remove(req.params.id)
    .then((result) => {
        response.success(req, res, result, 200)
    }).catch((err) => {
        response.error(req, res, err.message, 500, err)
    });
}

//ROUTES
router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)
router.post('/:id', remove)

module.exports = router