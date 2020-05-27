const store = require('../../../store/dummy')
const { nanoid } = require('nanoid')
const auth = require('../auth')

const TABLE = 'user'

module.exports = (injectedStore) => {
    let store = injectedStore
    if(!store){
        store = require('../../../store/dummy')
    }

    const list = () => {
        return store.list(TABLE)
    }

    const get = (id) => {
        return store.get(TABLE, id)
    }

    const upsert = async (data) => {
        const user = {
            name: data.name,
            username: data.username
        }

        if (data.id) {
            user.id = data.id;
        } else {
            user.id = nanoid();
        }

        if(data.password || data.username){
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: data.password
            })
        }

        return store.upsert(TABLE, user);
    }

    const remove = (id) => {
        return store.remove(TABLE, id)
    }

    return {
        list,
        get,
        upsert,
        remove
    }
}
