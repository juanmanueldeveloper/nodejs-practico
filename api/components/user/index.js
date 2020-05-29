const controller = require('./controller')
//const store = require('../../../store/dummy')
const store = require('../../../store/remote-mysql')

module.exports = controller(store)