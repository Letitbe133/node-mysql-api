const knexConfig = require('../db/config')
const knex = require('knex') (knexConfig)

const getUsers = (req, res) => {
    console.log('Listing all users')
    return knex.select().table('user')
        .then( users => {
            res.send(users) 
        })
}

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

const updateUser = (req, res) => {
    const { id } = req.params
    const data = req.body
    console.log(`Updating user ${id}`)

    return knex("user").update(data).where({id})
        .then( (user) => {
            if(user) {
                res.send({
                    success: true,
                    message: `User ${id} successfully updated`,
                    user
                })
            } else {
                res.send({
                    success: false,
                    message: 'User not found'
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
    getUsers,
    getUser,
    updateUser,
    deleteUser
}
