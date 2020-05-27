module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        privateKey: process.env.JWT_PRIVATE_KEY || '#api_nodejs-redsocial.100'
    }
}