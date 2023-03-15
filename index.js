const express = require("express")
const session = require("express-session");
const http = require("http");
const { Server } = require("socket.io")
require("dotenv").config()


const app = express();
const server = http.createServer(app)
const io = new Server(server);

const  PORT = process.env.PORT 


// Menu Items object
const fastFoods = {
  2:"Combo package",
  3: "Pasta",
  4: "Salad",
  5: "Rice",
  6:"coleslaw"
}

const  orderHistory = [] ;


const sessionMiddleware = session({
  secret: "secret-key",
  resave: false,
  saveUninitialized: true,
})


// Session middleware  for express
app.use(sessionMiddleware)

// middleware for connection to index.html file 
app.get("/" , (req,res) => {
      res.render("index")
})

app.set('view engine', 'ejs');
app.set('view engine')
// middle for connection to public folder
app.use(express.static('public'))
app.use(express.json());




// Session middleware for socket io 
io.use((socket, next) => {
  sessionMiddleware(socket.request , socket.request.res , next)
})

// Socket io server connection and disconnection  
io.on("connection" , (socket) => {
  console.log("User connected:", socket.id )
  
  const state = {
    userName: "",
    currentOrder: [],
  };

  const botMessage = async (message) => {
    console.log("Bot message received:", message);
    socket.emit("bot-message", message);
  };

  const userMessage = async (message) => {
    console.log("User message received:", message);

    try {
      if (!state.userName) {
        // Save the user's name and update the welcome message
        state.userName = message;
        await botMessage(
          `Welcome to the Nikki  Restaurant Chatbot App , ${state.userName}!\n
          Follow this instruction\n 1. To place  order\n 99. checkout order\n 98. See order\n 97. See current order\n 0. Cancel order`
             
          );
      } else {
        switch (message) {
          case "1":
            // Generate the list of items dynamically
            const itemOptions = Object.keys(fastFoods)
              .map((key) => `${key}. ${fastFoods[key]}`)
              .join("\n");
            await botMessage(
              `Here is a list of items you can order:\n ${itemOptions} \nPlease select one by typing its number.`
            );
            break;
          case "2":
          case "3":
          case "4":
          case "5":
            case "6":
            // Parse the number from the user input and add the corresponding item to the current order
            const selectedIndex = parseInt(message);
            if (fastFoods.hasOwnProperty(selectedIndex)) {
              const selectedItem = fastFoods[selectedIndex];
              state.currentOrder.push(selectedItem);
              await botMessage(
                `${selectedItem} has been added to your order. Do you want to add more items to your order? Type numbers. If not, type 99 to checkout.`
              );
            } else {
              await botMessage("Invalid selection.");
            }
            break;
          case "99":
            if (state.currentOrder.length === 0) {
              await botMessage(
                "No order to place. Place an order\n1. See menu"
              );
            } else {
              orderHistory.push(state.currentOrder);
              await botMessage("Order placed");
              state.currentOrder = [];
            }
            break;
          case "98":
            if (orderHistory.length === 0) {
              await botMessage("No previous orders");
            } else {
              const orderHistoryString = orderHistory
                .map(
                  (order, index) => `Order ${index + 1}. ${order.join(", ")}`
                )
                .join("\n");
              await botMessage(
                `Here are your previous orders:\n${orderHistoryString}`
              );
            }
            break;
          case "97":
            if (state.currentOrder.length === 0) {
              // await botMessage(
              //   `Here is your current order:\n${currentOrderString}`
              // );
              await botMessage("No current order");
            } else {
              const currentOrderString = state.currentOrder.join(", ");
              // await botMessage("No current order");
              await botMessage(
                `Here is your current order:\n${currentOrderString}`
              );
             }
            break;
          case "0":
            if (state.currentOrder.length === 0) {
              await botMessage("No order to cancel");
            } else {
              state.currentOrder = [];
              await botMessage("Order canceled");
            }
            break;
          default:
            await botMessage("Invalid input");
        }
      }
    } catch (err) {
      console.log(err);
      await botMessage("An error occurred while processing your request.");
    }
  };

  socket.on("user-message", userMessage);

//  socket io disconnection 
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  });
});



// Server port 
server.listen(PORT, () => {
  console.log( `listening on port ${PORT}`)
})

// const div = document.createElement("div")
// div.classList.add('message') // add('message)
// div.innerHTML =  `${message}`// text(`${message}`)