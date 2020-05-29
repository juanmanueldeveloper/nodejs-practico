const remote = require('../mysql/remote');
const config = require('../config');

module.exports = new remote(config.mysqlService.host, config.mysqlService.port);