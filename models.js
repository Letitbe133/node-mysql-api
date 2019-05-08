// import crypto module for password encryption
const crypto = require('crypto')

// import knex config
const knexConfig = require('./knexfile')

// import knex
const knex = require('knex') (knexConfig)

function createUser ({ username, password }) {
    console.log(`Adding user ${username}`)
    const { salt, hash } = saltHashPassword({password})

    // Check if user exists in db
    return knex('user').where({username})
        .then( ([user]) => {
            // if user exists send message and prevent inserting
            if (user) {
                console.log(result)
                return { success: false, message: 'User already exists'}
            } 
            else {
                // execute query and insert user
                return knex('user').insert({
                    salt,
                    encrypted_password: hash,
                    username
                }).debug()
            }
        })
}

function deleteUser({id}) {
    console.log(`Deleting user ${id}`)

    return knex('user').where({id: id}).del().debug()
        .then( (user) => {
            if(user) {
                return {success: true, Message: 'User successfully deleted from db' }
            } else {
                return { success: false, Message: 'User does not exist in db' }
            }
        })
}

function authenticate({ username, password }) {
    console.log(`Authenticating ${username}`)
    return knex('user').where({ username }).debug()
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

function listAllUsers() {
    console.log('Listing all users')
    return knex.select().table('user').debug()
        .then( users => {
            return users
        })
}

function getUser({id}) {
    console.log(`Retrieving user ${id}`)
    return knex('user').where({ id : id }).debug()
        .then( (user) => {
            if (user) {
                // return {success: true, Message: 'User successfully retrieved', User: user}
                return {success: true, Message: 'User successfully retrieved', User: {id: user[0].id, name: user[0].username}}

            }
        })
}


// function to hash password
function saltHashPassword({
    password,
    salt = randomString()
}) {
    const hash = crypto
        .createHmac('sha512', salt)
        .update(password)

    return {
        salt,
        hash: hash.digest('hex')
    }
}

// function to generate random salt
function randomString() {
    return crypto.randomBytes(4).toString('hex')
}

module.exports = {
    getUser,
    createUser,
    listAllUsers,
    authenticate,
    deleteUser,
    // getPublication,
    // listComments,
    // listUsers,
    // updateUser,
    // deleteUser,
    // login,
    // updatePublication,
    // addPublicationMedia,
    // deletePublication,
    // createMediaComment,
    // getPublicationComments,
    // getComment,
    // deleteComment,
    // updateComment
};


module.exports;