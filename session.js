// const session = require("express-session")



//session configuration
// const sessionMiddleware = session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         secure: false,
//         //set expiry time for session to 7 days
//         maxAge: 1000 * 60 * 60 * 24 * 7,
//     },
// });

var session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true








});



















module.exports = { session }