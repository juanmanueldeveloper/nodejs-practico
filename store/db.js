const mysql = require('mysql')
const config = require('../config')

const DB_CONFIG = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

//OPEN CONNECTION
let connection

const handleConnection = () =>{
    connection = mysql.createConnection(DB_CONFIG)
    connection.connect((err)=>{
        if(err){
            console.error(err)
            setTimeout(handleConnection, 2000)
        }else{
            console.log('DB CONNECTED')
        }
    })

    connection.on('error', err =>{
        console.error('[DB ERROR]', err)
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleConnection
        }else{
            throw err
        }
    })
}

handleConnection()

const list = (table) => {
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM ${table}`, (err, data) =>{
            if(err) reject(err)

            resolve(data)
        })
    })
}

const get = (table, id) => {
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM ${table} WHERE id="${id}"`, (err, result) =>{
            if(err) reject(err)

            resolve(result)
        })
    })
}

const insert = (table, data) => {
    return new Promise((resolve, reject)=>{
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) =>{
            if(err) reject(err)

            resolve(result)
        })
    })
}

const update = (table, data) => {
    return new Promise((resolve, reject)=>{
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) =>{
            if(err) reject(err)

            resolve(result)
        })
    })
}

const upsert = (table, data) => {
    if(data && data.id){
        update(table, data.id)
    }else{
        insert(table, data)
    }
}

const query = (table, q) =>{
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM ${table} WHERE ?`, q , (err, result)=>{
            if(err) reject(err)
            console.log('QUERY',result)
            resolve(result[0] || null)
        })
    })
}

module.exports= {
    list,
    get,
    upsert,
    query
}
