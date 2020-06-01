const redis = require('redis')
const config = require('../config')

const client = redis.createClient({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password
})

const list = (table) => {
    return new Promise((resolve, reject) =>{
        client.get(table, (err, data) =>{
            if(err) reject(err)

            let result = data || null
            if(data){
                result = JSON.parse(data)
            }

            resolve(result)
        })
    })
}

const get = async (table, id) => {
        const key = `${table}_${id}`
        const data = list(key)
        return data
}

const upsert = (table, data) => {
    return new Promise((resolve, reject) =>{
        let key = table
        if(data && data.id){
            key = `${key}_${data.id}`
        }

        client.setex(key, 10, JSON.stringify(data), (err, data) => {
            if(err) reject(err)

            resolve(data)
        })
    })
}

module.exports = {
    list,
    get,
    upsert
}