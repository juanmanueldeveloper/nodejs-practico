const express = require('express')
const config = require('../config')
const user = require('./components/user/network')
const auth = require('./components/auth/network')
const swaggerUi = require('swagger-ui-express');

const app = express()
const swaggerDoc = require('./swagger.json');

app.listen(config.api.port, () => {
    console.log(`API listening port: ${config.api.port}`)
})

app.use(express.json())
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
