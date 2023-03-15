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

// var session = require("express-session")({
//     secret: "my-secret",
//     resave: true,
//     saveUninitialized: true








// });



// const express = require("express")
// const session = require("express-session");
// const http = require("http");
// const { Server } = require("socket.io")


// const app = express();
// const server = http.createServer(app)
// const io = new Server(server);




// // Menu Items object
// const fastFoods = {
//   2:"Burger",
//   3: "Pasta",
//   4: "Salad",
//   5: "Rice",
//   6:"coleslaw"
// }

// const  orderHistory = [] ;


// const sessionMiddleware = session({
//   secret: "secret-key",
//   resave: false,
//   saveUninitialized: true,
// })


// // Session middleware  for express
// app.use(sessionMiddleware)

// // middleware for connection to index.html file 
// app.get("/" , (req,res) => {
//       res.sendFile(__dirname + "/index.html")
// })

// // middle for connection to public folder
// app.use(express.static('public'))
// app.use(express.json());




// // Session middleware for socket io 
// io.use((socket, next) => {
//   sessionMiddleware(socket.request , socket.request.res , next)
// })

// // Socket io server connection and disconnection  
// io.on("connection" , (socket) => {
//   console.log("User connected:", socket.id )
  
//   const state = {
//     userName: "",
//     currentOrder: [],
//   };

//   const botMessage = async (message) => {
//     console.log("Bot message received:", message);
//     socket.emit("bot-message", message);
//   };


// // Server port 
// server.listen(3000, () => {
//   console.log('listening on port 3000')
// })

// const div = document.createElement("div")
// div.classList.add('message') // add('message)
// div.innerHTML =  `${message}`// text(`${message}`)


















module.exports = { session }