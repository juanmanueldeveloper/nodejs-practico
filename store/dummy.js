const db = {
    'user': [
        {
            id : '1',
            name : 'juan'
        },
    ]
}

const list = async (table) => {
    return db[table] || []
}

const get = async (table, id) => {
    let col = await list(table)
    return col.filter( item => item.id === id)[0] || null
}

const upsert = async (table, data) => {
    if(!db[table]){
        db[table] = []
    }
    console.log(db)
    return db[table].push(data)
}

const remove = async (table, id) => {
    return true
}

const query = async (table, q) => {
    let col = await list(table)
    let keys = Object.keys(q)
    let key = keys[0]

    return col.filter( item => item[key] === q[key])[0] || null
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}