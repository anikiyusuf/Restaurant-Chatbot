const express = require("express")
const session = require("express-session");
const http = require("http");
const {Server} = require("socket.io")


const app = express();
const server = http.createServer(app)
const io = new Server(server);




// Menu Items object
const nikkiFoodMenu = {
  2:"Burger",
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
app.get("/" , async(req,res) => {
      res.sendFile(__dirname + "/index.html")
})

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

    // Chatbot Reply from the server connected to the socket io server
    // User Name input 
    const state = {
      userName:"",
      currentOrder: [],
    }    

  //  Bot message response 
    const botMessage = async (message) => {
      console.log("Bot message received:", message);
      socket.emit("bot-message" , message);
 
    }

 const userMessage = async (message) => {
  console.log("User message received:", message)

try{
  if(!state.userName){
      // Save the user's name and the update the welcome message
      state.userName = message;
      await botMessage(
        `Welcome to the Nikki Restaurant ChatBot, ${state.userName}!\n
        To perform any action on this  chatbot app select any number pf your choice\n
           1. Place an order\n
           99.  Checkout order\n
           98. See order history\n
           97. See current order\n
           0. cancel order
            `
      )
    }else {
      switch(message){
        case "1":
          // Generate the list of items dynamically
          const itemOptions = Object.keys(nikkiFoodMenu)
          .map((key) => `${key}. ${nikkiFoodMenu[key]}`)
          .join("\n")
          await  botMessage(
            `Here is a list of items you can order:\n ${itemOptions} \nPlease select one by typing its number.`
          );
          break;
          case "2":
            case "3":
              case "4":
                case "5":
                  case "6":
                   //Parse the number from the user input  and the corresponding item to the current order 
            const selectedIndex= parseInt(message);
            if(nikkiFoodMenu.hasOwnProperty(selectedIndex)){
              const selectedItem = nikkiFoodMenu[selectedIndex];
              state.currentOrder.push(selectedItem);
              await botMessage(
                ` ${selectedItem} has been added to your order.\n
                Do you want to add more items to your order?\n
               If not, type 99 to checkout.`
              )
            }else{
              await botMessage("Invalid selection.")
            }
            break;
            case "99":
              if(state.currentOrder.length === 0){
                await botMessage(
                  "No order to place. Place an order\nby selecting option 1 to See menu"
                )
              }else{
                orderHistory.push(state.currentOrder);
                await botMessage("Order placed")
                state.currentOrder = []
              }
              break;
               case "98":
                if (orderHistory.length === 0){
                  await botMessage("No previous orders");
                }else{
                  const orderHistoryString = orderHistory
                  .map(
                    (order , index) => `Order ${index + 1}. ${order.join(", ")}`
                  )
                  .join("\n");
                  await  botMessage(
                    `Here are your previous orders:\n${orderHistoryString}`
                  )
                }
                break;
                case "97":
                  if(state.currentOrder.length === 0){
                    await botMessage("No current order")
                  }else {
                    const currentOrderString = state.currentOrder.join(",")
                      await botMessage(
                        `Here is your current order:\n${currentOrderString}` 
                      )
                  }
                  break;
                  case "0":
                    if(state.currentOrder.length === 0){
                      await botMessage("No message to cancel")
                    }else {
                      state.currentOrder = [];
                      await botMessage("Order canceled")
                    }
                    break;
                    default:
                      await botMessage("Invalid input");
       } 
    }
}catch(err){
  console.log(err);
  await botMessage("An error occurred while processing your request.");
}

}

// User Message connection
socket.on("User-message", userMessage) 

//  socket io disconnection 
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  });
});



// Server port 
server.listen(3000, () => {
  console.log('listening on port 3000')
})

// const div = document.createElement("div")
// div.classList.add('message') // add('message)
// div.innerHTML =  `${message}`// text(`${message}`)