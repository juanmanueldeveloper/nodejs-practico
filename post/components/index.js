const controller = require('./controller')
//const store = require('../../../store/dummy')
const store = require('../../mysql/controller')

module.exports = controller(store)