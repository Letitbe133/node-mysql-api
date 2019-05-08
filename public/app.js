// import { get } from "http";

const CreateUser = document.querySelector('.CreateUser')

// Add listener to Createuser form when submitted
CreateUser.addEventListener('submit', (e) => {
    e.preventDefault()
    const username = CreateUser.querySelector('.username').value
    const password = CreateUser.querySelector(' .password').value
    post('/createUser', { username, password })
        .then(({ status }) => {
            if (status === 200) {
                alert('user successfully created')
            }
            else alert('failed to create user')
        })
        CreateUser.reset()
    })

const Login = document.querySelector('.Login')

// Add listener to Login form when submitted
Login.addEventListener('submit', (e) => {
    e.preventDefault()
    const username = Login.querySelector('.username').value
    const password = Login.querySelector('.password').value
    console.log(password)
    post('/login', { username, password })
        .then(({ status }) => {
            if ( status === 200) {
                alert(`${username} succefully logged in`)
            } else {
                alert('Login failed')
            }
        })
        Login.reset()
})

const listBtn = document.querySelector('.listBtn')

listBtn.addEventListener('click', () => {
    get('/users/list')
        .then( (response) => response.json())
        .then( (users) => {
            console.log(users)
            const usersContainer = document.querySelector('.users-container')
            users.map( (user) => {
                usersContainer.innerHTML += `<li>User name : ${user.username}<button class="delete-btn" data-id="${user.id}">Delete user</button></li>`
            })
        })
        .then( () => {
            const deleteBtn = document.querySelectorAll('.delete-btn')

            deleteBtn.forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    id = e.target.dataset.id

                    fetch(`/delete/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }        
                    })

                })
            })       
        })

})


// handle ajax POST request to api
const post = (path, data) => {
    console.log(JSON.stringify(data))
    return window.fetch(path,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

// handle ajax GET request to api
const get = (path) => {
    return window.fetch(path, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}