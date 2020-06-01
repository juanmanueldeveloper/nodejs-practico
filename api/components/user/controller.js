const { nanoid } = require('nanoid')
const auth = require('../auth')

const TABLE = 'user'

module.exports = (injectedStore, injectedCache) => {
    let cache = injectedCache
    let store = injectedStore
    if(!store){
        store = require('../../../store/dummy')
    }

    if(!cache){
        cache = require('../../../store/dummy')
    }

    const list = async () => {
        let users = await cache.list(TABLE)

        if(!users){
            console.log('CACHE CLEAR')
            users = await store.list(TABLE)
            await cache.upsert(TABLE, users)
        }else{
            console.log('CACHE VALIDATE')
        }
        
        return users
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

    const follow = (from, to) => {
        return store.upsert(`${TABLE}_follow`, {
            user_from: from,
            user_to: to
        })
    }

    const following = async (user) => {
        const join = {}
        join[TABLE] = 'user_to'; // { user: 'user_to' }
        const query = { user_from: user };
		
		return await store.query(`${TABLE}_follow`, query, join);
    }
    
    return {
        list,
        get,
        upsert,
        remove,
        follow,
        following
    }
}
