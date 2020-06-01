const remote = require('../mysql/remote');
const config = require('../config');

module.exports = new remote(config.redis.host, config.redis.port);