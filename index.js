const express = require('express')
const bodyParser = require('body-parser')
const { createUser, authenticate, getUsers, getUser, deleteUser } = require('./models')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

// Create a new user
app.post('/user/create', (req, res) => {
    const { username, password } = req.body
    createUser({ username, password })
        .then( ({success, message}) => {
            if (!success) {
                res.send(message)
            } else {
                res.sendStatus(200)
            }
        })
})

// Check if user exists in db
app.post('/user/authenticate', (req, res) => {
    const { username, password } = req.body
    authenticate({ username, password })
        .then(({ success }) => {
            if (success) {
                res.sendStatus(200)
            } else {
                res.sendStatus(401)
            }
        })
})

// Get all users from db
app.get('/users/all', (req, res) => {
    getUsers()
        .then( (data) => res.json(data))
})

// Get single user from db
app.get('/user/:id', (req, res) => {
    const { id } = req.params
    getUser({ id })
        .then( (data) => res.json(data))
})

// Delete user from db
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params
    deleteUser( {id} )
        .then( (data) => res.json(data))
})

// Set server to listen on port 7555
const port = 7555
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})