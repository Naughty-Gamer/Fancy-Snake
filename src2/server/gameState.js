// Server needs to send data about the state of the game back to the players
const Snake = require("./game/snake.js") //mahmoud
let socket_list = {} // associative array of <id>:<socket>

function manageState(io){
    
    
    // Event listener for every time someone joins the websocket connection
    io.sockets.on('connection', function (clientSocket){
        
        
    })
}

setInterval(function(){

    let pack = []
    for (let socket_index in socket_list){ 
        let socket = socket_list[socket_index]
        let snake = socket.snake
        snake.body[0][1] -= 1 //testing
        pack.push(
            {
                snake: snake
            }
        )
    }

    

},1000)


exports.manageState = manageState
