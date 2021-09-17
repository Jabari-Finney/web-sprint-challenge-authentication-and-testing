const db = require('./../../data/dbConfig')

function getAll(){
    return db('users')
}
function getBy(filter){
    return db('users').where(filter)
}
function getById(id){
    return db('users').where('id', id).first();
}
async function add({username,password}){
    const [id] = await db('users').insert({username,password})
    return getById(id)
}



module.exports = {
    getAll,
    getBy,
    getById,
    add,

}