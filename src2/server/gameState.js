const Snake = require("./game/snake.js")
const Game = require("./game/game.js")

/**
 * Object that serves as an associative array
 * @type {"Socket.id : Socket"}
 */
let socket_list = {}

/**
 * Manages the state of the game
 * @param {SocketIO.Server} server the websocket server whose sockets will be used
 */
function manageState(server){

    // Event listener for every time someone joins the websocket connection
    server.sockets.on('connection', function (clientSocket){

        let newgame = null

        if (Object.keys(socket_list).length == 0) {
            newgame = getNewGame()
        }
        
        initPlayer(clientSocket)
        
        clientSocket.on('disconnect',function(){
            
            terminatePlayer(clientSocket)

            if (Object.keys(socket_list).length == 0) {
                terminateGame(server,newgame)
            }
        })
    })
}

function terminateGame(server, game){
    delete game
    server.close()
    console.log("\nWebsocket server closed\n")
}

function getNewGame(){
    return new Game(socket_list)
}

function terminatePlayer(clientSocket){
    
    // Print to the server's terminal that a user disconnected
    console.log("Player with ID:",clientSocket.id,"disconnected")
    delete socket_list[clientSocket.id]

}

function initPlayer(clientSocket){

    // Print to the server's terminal that a player connected
    console.log("Player with ID:",clientSocket.id,"connected")
        
    clientSocket.emit('CONN_ACK',"You succesfully connected")
    
    let my_snake = new Snake(20,74)
    clientSocket.snake = my_snake
    
    socket_list[clientSocket.id] = clientSocket // adding each socket connection to an associative array

}

exports.manageState = manageState
