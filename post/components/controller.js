const { nanoid } = require('nanoid')

const TABLE = 'post'

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
        const post = {
            text: data.text,
            user: data.user
        }

        if (data.id) {
            post.id = data.id;
        } else {
            post.id = nanoid();
        }

        return store.upsert(TABLE, post);
    }

    return {
        list,
        get,
        upsert
    }
}
