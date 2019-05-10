# Brief

In index.js file the server is listening on port 7555.

When it receives calls for specific routes, it will respond with the corresponding method according to the type of the request (GET, POST, UPDATE, DELETE)

Methods are stored in the /api folder and grouped by purpose in 2 files : users.js and auth.js
auth.js contains methods used to authenticate or create a user in DB
users.js contains methods used to GET, UPDATE or DELETE users from DB


# Todo

! ## Create /auth/signup and /auth/login routes

! ## Group users methods in /users route

! ## Create updateUser method on PUT request