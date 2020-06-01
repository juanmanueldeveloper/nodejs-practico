const controller = require('./controller')
const config = require('../../../config')
//const store = require('../../../store/dummy')
let store
if(config.remoteDB){
    store = require('../../../store/remote-mysql')
}else{
    store = require('../../../mysql/controller')
}

module.exports = controller(store)