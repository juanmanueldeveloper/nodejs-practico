const express = require('express');
const config = require('../config');
const router = require('./network');
const errors = require('../network/errors')

const app = express();

app.use(express.json());

//ROUTES
app.use('/', router)
app.use(errors)

app.listen(config.mysqlService.port, () => {
    console.log(`API MySQL listening port: ${config.mysqlService.port}`)
})
