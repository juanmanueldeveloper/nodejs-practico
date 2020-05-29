const express = require('express')
const response =  require('../network/response')
const store = require('./controller')
//const secure = require('./secure')
const router = express.Router()

const list = async (req, res, next) => {
    await store.list(req.params.table)
    .then((result) => {
        response.success(req, res, result, 200)
    }).catch(next)

}

const get = async (req, res, next)=> {
    await store.get(req.params.table, req.params.id)
    .then((result) => {
        response.success(req, res, result, 200)
    }).catch(next)
}

const upsert = async (req, res, next) => {
    await store.upsert(req.params.table, req.body)
    .then((result) => {
        response.success(req, res, result, 200)
    }).catch(next)
}


const query = async (req, res, next) => {
    await store.query(req.params.table, req.body.query, req.body.join)
    .then((result) => {
        response.success(req, res, result, 200)
    }).catch(next)
}

//ROUTES
router.get('/:table', list)
router.get('/:table/:id', get)
router.post('/:table', upsert)
router.put('/:table/', upsert)
router.post('/:table/query', query);

module.exports = router