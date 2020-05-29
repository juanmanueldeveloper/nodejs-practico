const express = require('express')
const config = require('../config')
const post = require('./components/network')
const errors = require('../network/errors')
const app = express()

app.use(express.json())
app.use('/api/post', post)
app.use(errors)

app.listen(config.postService.port, () => {
    console.log(`API Post listening port: ${config.postService.port}`)
})
