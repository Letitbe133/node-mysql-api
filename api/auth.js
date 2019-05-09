const knexConfig = require('../db/config')
const knex = require('knex') (knexConfig)
const { saltHashPassword } = require('../utils/hashpasswd')

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

module.exports = { authenticate }
