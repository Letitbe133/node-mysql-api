const express = require('express')
const bodyParser = require('body-parser')
const { authenticate } = require('./api/auth')
const { createUser, getUsers } = require('./api/users')
const { getUser, deleteUser } = require('./api/user')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

// Create a new user
app.post('/users', createUser)

// Get all users
app.get('/users', getUsers)

// Check login credentials
app.post('/login', authenticate)

// Get single user from db
app.get('/user/:id', getUser)
  
// Delete user from db
app.delete('/user/:id', deleteUser)

// Set server to listen on port 7555
const port = 7555
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})