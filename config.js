module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        privateKey: process.env.JWT_PRIVATE_KEY || '#api_nodejs-redsocial.100'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || 'D93CocRS9W',
        password: process.env.MYSQL_PASSWORD || 'WY1CXdSyJr',
        database: process.env.MYSQL_DB || 'D93CocRS9W'
    },
    mysqlService: {
        host: process.env.MYSQL_SERVICE_HOST || 'localhost',
        port: process.env.MYSQL_SERVICE_PORT || 3001,
    },
    postService: {
        host: process.env.MYSQL_SERVICE_HOST || 'localhost',
        port: process.env.MYSQL_SERVICE_PORT || 3002,
    },
    remoteDB: process.env.REMOTE_DB || false,
}