const express = require('express');
const config = require('../config');
const router = require('./network');
const errors = require('../network/errors')

const app = express();

app.use(express.json());

//ROUTES
app.use('/', router)
app.use(errors)

app.listen(config.cacheService.port, () => {
    console.log(`API Redis-Cache listening port: ${config.cacheService.port}`)
})
