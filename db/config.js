// config connection to db
module.exports = {
    client: 'mysql',
    connection:  {
        user: 'letitbe133',
        password: 'deepshadow2008',
        database: 'users'
    },
    debug: process.env.NODE_ENV !== 'production' // true if not in production
}