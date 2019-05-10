const express = require('express')
const bodyParser = require('body-parser')
const { authenticate, createUser } = require('./api/auth')
const { getUsers, getUser, updateUser, deleteUser } = require('./api/users')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

// Create a new user
app.post('/auth/signup', createUser)

// Get all users
app.get('/users', getUsers)

// Check login credentials
app.post('/auth/login', authenticate)

// Get single user from db
app.get('/users/:id', getUser)

// Update user
app.put('/users/:id', updateUser)
  
// Delete user from db
app.delete('/users/:id', deleteUser)

// Set server to listen on port 7555
const port = 7555
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})