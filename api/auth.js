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


const authenticate = (req, res) => {
    const {username, password} = req.body
    console.log(`Authenticating ${username}`)
    return knex('user').where({ username })
        .then(([user]) => {
            // if no username found
            if (user == undefined) {
                res.send ({
                    success: false,
                    message: 'User not found in db'
                })
            }

            // compute encrypted password using user salt
            const { hash } = saltHashPassword({
                password,
                salt: user.salt
            })
            // if computed hash matches user encrypted password
            res.send({
                success: hash === user.encrypted_password,
                message: 'User authenticated',
                user: {
                    id: user.id,
                    username
                }
            })
        })
}

module.exports = { authenticate, createUser }
