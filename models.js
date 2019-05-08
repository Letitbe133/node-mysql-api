// import crypto module for password encryption
const crypto = require('crypto')

// import knex config
const knexConfig = require('./db/config')

// import knex
const knex = require('knex') (knexConfig)

const { saltHashPassword } = require('./utils/hashpasswd')

function authenticate({ username, password }) {
    console.log(`Authenticating ${username}`)
    return knex('user').where({ username })
        .then(([user]) => {
            // if no username found
            if (!user) return { success: false }
            // compute encrypted password using user salt
            const { hash } = saltHashPassword({
                password,
                salt: user.salt
            })
            // return success: true if comput hash matches user encrypted password
            return { success: hash === user.encrypted_password}
        })
}

function createUser ({ username, password }) {
    console.log(`Adding user ${username}`)
    const { salt, hash } = saltHashPassword({password})

    // Check if user exists in db
    return knex('user').where({username})
        .then( ([user]) => {
            // if user exists send message and prevent inserting
            if (user) {
                return { success: false, message: 'User already exists'}
            } 
            else {
                // execute query and insert user
                return knex('user').insert({
                    salt,
                    encrypted_password: hash,
                    username
                })
            }
        })
}

function deleteUser({id}) {
    console.log(`Deleting user ${id}`)

    return knex('user').where({id}).del()
        .then( (user) => {
            if(user) {
                return {success: true, Message: 'User successfully deleted from db' }
            } else {
                return { success: false, Message: 'User does not exist in db' }
            }
        })
}

function getUsers() {
    console.log('Listing all users')
    return knex.select().table('user')
        .then( users => {
            return users
        })
}

function getUser({id}) {
    console.log(`Retrieving user ${id}`)
    return knex('user').where({ id })
        .then( users => {
            if (users.length) {
                const [{ id, username: name}] = users
                return {
                    success: true,
                    Message: `User successfully retrieved from db`,
                    User: {
                        id,
                        name
                    }
                }
            }
        })
}

module.exports = {
    authenticate,
    createUser,
    deleteUser,
    getUsers,
    getUser
};