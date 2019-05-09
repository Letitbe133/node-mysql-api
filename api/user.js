const knexConfig = require('../db/config')
const knex = require('knex') (knexConfig)

const getUser = (req, res) => {
    const { id } = req.params
    console.log(`Retrieving user ${id}`)
    return knex('user').where({ id })
        .then( users => {
            if (users.length) {
                const [{ id, username: name}] = users
                res.send({
                    success: true,
                    Message: `User successfully retrieved from db`,
                    User: {
                        id,
                        name
                    }
                })
            }
        })
}

const deleteUser = (req, res) => {
    const { id } = req.params
    console.log(`Deleting user ${id}`)

    return knex('user').where({id}).del()
        .then( (user) => {
            if(user) {
                res.send({
                    success: true,
                    message: 'User successfully deleted from db',
                    user
                })
            } else {
                res.send({
                    success: false,
                    message: 'User does not exist in db'
                })
            }
        })
}


module.exports = {
    getUser,
    deleteUser
}
