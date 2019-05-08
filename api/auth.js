const { saltHashPassword } = require('../utils/hashpasswd')

const authenticateUser = (req, res) => {
    const {username} = req.body
    console.log(`Authenticating ${username}`)
    return knex('user').where({ username })
        .then(([user]) => {
            // if no username found
            if (user == undefined) return { success: false, Message: 'User not found in db' }

            // compute encrypted password using user salt
            const { hash } = saltHashPassword({
                password,
                salt: user.salt
            })
            // return success: true if comput hash matches user encrypted password
            return {
                success: hash === user.encrypted_password,
                Message: 'User authenticated',
                User: {
                    id: user.id,
                    username
                }
            }
        })
}

module.exports = { authenticateUser }
