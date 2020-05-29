const jwt = require('../../../jwt')
const bcrypt = require('bcrypt')
const error = require('../../../utils/error')
const TABLE = 'auth'

module.exports = (injectedStore) => {
    let store = injectedStore
    if(!store){
        store = require('../../../store/dummy')
    }

    const login = async (username, password) => {
        let data = await store.query(TABLE, { username: username })

        if(data.length === 0){
            throw error('Invalid information', 403)
        }

        return bcrypt.compare(password, data.password)
        .then((isValid) => {
            if(isValid){
                //TOKEN GENERATE
                return jwt.sign({ ...data })            
            }else{
                throw error('Invalid information')
            }
        }).catch((err) => {
            throw error(err.message, 403)
        })
    }

    const upsert = async (data) => {
        const authData = {
            id: data.id
        }

        if(data.username){
            authData.username = data.username
        }

        if(data.password){
            authData.password = await bcrypt.hash(data.password, 5)
        }

        return store.upsert(TABLE, authData)
    }

    return {
        login,
        upsert
    }
}