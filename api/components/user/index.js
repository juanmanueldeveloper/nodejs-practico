const controller = require('./controller')
const config = require('../../../config')
//const store = require('../../../store/dummy')
let store
let cache
if(config.remoteDB){
    store = require('../../../store/remote-mysql')
    cache = require('../../../store/remote-redis')
}else{
    store = require('../../../mysql/controller')
    cache = require('../../../redis-cache/controller')
}

module.exports = controller(store, cache)