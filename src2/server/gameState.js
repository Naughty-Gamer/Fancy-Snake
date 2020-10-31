const Snake = require("./game/snake.js")

let socket_list = {} // associative array id:<Socket>

/**
 * Manages the state of the game
 * @param {SocketIO.Server} io the server whose state will be managed
 */
function manageState(io){
    
    // Event listener for every time someone joins the websocket connection
    io.sockets.on('connection', function (clientSocket){
        
        // Print to the server's terminal that a player connected
        console.log("Player with ID:",clientSocket.id,"connected")
        
        clientSocket.emit('CONN_ACK',"You succesfully connected")
        
        let my_snake = new Snake(20,74)
        clientSocket.snake = my_snake
        
        socket_list[clientSocket.id] = clientSocket // adding each socket connection to an associative array
        
        clientSocket.on('disconnect',function(){

            // Print to the server's terminal that a user disconnected
            console.log("Player with ID:",clientSocket.id,"disconnected")
            delete socket_list[clientSocket.id]
        })
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

    for (let socket_index in socket_list) {
        let socket = socket_list[socket_index]
        socket.emit('new_pos', pack)
    }

},1000)


exports.manageState = manageState
