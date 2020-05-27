const jwt = require('../../../jwt')
const TABLE = 'auth'

module.exports = (injectedStore) => {
    let store = injectedStore
    if(!store){
        store = require('../../../store/dummy')
    }

    const login = async (username, password) => {
        const data = await store.query(TABLE, { username })
        if(data.password === password){
            //TOKEN GENERATE
            return jwt.sign(data)
        }else{
            throw new Error('Invalid information')
        }
        return data
    }

    const upsert = (data) => {
        const authData = {
            id: data.id
        }

        if(data.username){
            authData.username = data.username
        }

        if(data.password){
            authData.password = data.password
        }

        return store.upsert(TABLE, authData)
    }

    return {
        upsert,
        login
    }
}