//   const userMessage = async (message) => {
//     console.log("User message received:", message);

//     try {
//       if (!state.userName) {
//         // Save the user's name and update the welcome message
//         state.userName = message;
//         await botMessage(
//           `Welcome to the ChatBot, ${state.userName}! Place an order\n 1. Typehere \n 99. Typehere \n 98. Typehere\n 97. Typehere\n 0. Cancel order`
             
//           );
//       } else {
//         switch (message) {
//           case "1":
//             // Generate the list of items dynamically
//             const itemOptions = Object.keys(fastFoods)
//               .map((key) => `${key}. ${fastFoods[key]}`)
//               .join("\n");
//             await botMessage(
//               `Here is a list of items you can order:\n ${itemOptions} \nPlease select one by typing its number.`
//             );
//             break;
//           case "2":
//           case "3":
//           case "4":
//           case "5":
//             case "6":
//             // Parse the number from the user input and add the corresponding item to the current order
//             const selectedIndex = parseInt(message);
//             if (fastFoods.hasOwnProperty(selectedIndex)) {
//               const selectedItem = fastFoods[selectedIndex];
//               state.currentOrder.push(selectedItem);
//               await botMessage(
//                 `${selectedItem} has been added to your order. Do you want to add more items to your order? Type numbers. If not, type 99 to checkout.`
//               );
//             } else {
//               await botMessage("Invalid selection.");
//             }
//             break;
//           case "99":
//             if (state.currentOrder.length === 0) {
//               await botMessage(
//                 "No order to place. Place an order\n1. See menu"
//               );
//             } else {
//               orderHistory.push(state.currentOrder);
//               await botMessage("Order placed");
//               state.currentOrder = [];
//             }
//             break;
//           case "98":
//             if (orderHistory.length === 0) {
//               await botMessage("No previous orders");
//             } else {
//               const orderHistoryString = orderHistory
//                 .map(
//                   (order, index) => `Order ${index + 1}. ${order.join(", ")}`
//                 )
//                 .join("\n");
//               await botMessage(
//                 `Here are your previous orders:\n${orderHistoryString}`
//               );
//             }
//             break;
//           case "97":
//             if (state.currentOrder.length === 0) {
//               // await botMessage(
//               //   `Here is your current order:\n${currentOrderString}`
//               // );
//               await botMessage("No current order");
//             } else {
//               const currentOrderString = state.currentOrder.join(", ");
//               // await botMessage("No current order");
//               await botMessage(
//                 `Here is your current order:\n${currentOrderString}`
//               );
//              }
//             break;
//           case "0":
//             if (state.currentOrder.length === 0) {
//               await botMessage("No order to cancel");
//             } else {
//               state.currentOrder = [];
//               await botMessage("Order canceled");
//             }
//             break;
//           default:
//             await botMessage("Invalid input");
//         }
//       }
//     } catch (err) {
//       console.log(err);
//       await botMessage("An error occurred while processing your request.");
//     }
//   };

//   socket.on("user-message", userMessage);

// //  socket io disconnection 
//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id)
//   });
// });


