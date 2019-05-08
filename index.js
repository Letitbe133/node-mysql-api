const express = require('express')
const bodyParser = require('body-parser')
const models = require('./models')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

// Intercepts post requests on /createUser endpoint
// Create a new user
app.post('/createUser', (req, res) => {
    models
        .createUser({
            username: req.body.username,
            password: req.body.password
        })
        .then( ({success, message}) => {
            if (!success) {
                res.send(message)
            } else {
                res.sendStatus(200)
            }
        })
})

// Intercepts post requests on /login endpoint
// Check if user exists in db
app.post('/login', (req, res) => {
    models
        .authenticate({
            username: req.body.username,
            password: req.body.password
        })
        .then(({ success }) => {
            if (success) {
                res.sendStatus(200)
            } else {
                res.sendStatus(401)
            }
        })
})

// Intercepts get requests on /list endpoint
// List all users in db
app.get('/users/list', (req, res) => {
    models
        .listAllUsers()
            .then( (data) => res.send(data))
})

// Intercepts get requests on /delete:id endpoint
// Delete user from db
app.delete('/delete/:id', (req, res) => {
    models
        .deleteUser({
            id: req.params.id
        })
            .then( (data) => res.send(data))
})


// Intercepts get requests on /user:id endpoint
// Retrieve user from db
app.get('/user/:id', (req, res) => {
    models
        .getUser({
            id: req.params.id
        })
            .then( (data) => res.send(data))
})


// Set server to listen on port 7555
const port = 7555
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})