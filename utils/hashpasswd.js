// import crypto module for password encryption
const crypto = require('crypto')

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
    saltHashPassword,
    randomString,
};
