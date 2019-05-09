const knexConfig = require('../db/config')
const knex = require('knex') (knexConfig)
const { saltHashPassword } = require('../utils/hashpasswd')

const createUser =  (req, res) => {
    const {username, password } = req.body
    console.log(`Adding user ${username}`)
    const { salt, hash } = saltHashPassword({password})

    // Check if user exists in db
    return knex('user').where({username})
        .then( ([user]) => {
            // if user exists send message and prevent inserting
            if (user) {
                res.send({
                    success: false,
                    message: 'User already exists'
                }) 
            } 
            else {
                // execute query and insert user
                return knex('user').insert({
                    salt,
                    encrypted_password: hash,
                    username
                })
                .then( user => {
                    res.send({
                        success: true,
                        message: 'User successfully inserted in db',
                        user
                    })
                })
            }
        })
}

const getUsers = (req, res) => {
    console.log('Listing all users')
    return knex.select().table('user')
        .then( users => {
            res.send(users) 
        })
}

module.exports = {
    createUser,
    getUsers
}
