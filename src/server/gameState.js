// Server needs to send data about the state of the game back to the players

function manageState(io){

    let pcount = 0
    let clicks = 0

    // Event listener for every time someone joins the websocket connection
    io.sockets.on('connection', function (clientSocket){
        
        clientSocket.emit('CONN_ACK',"You succesfully connected")

        // Print to the server's terminal that a player connected
        console.log("Player with ID:",clientSocket.id,"connected")
        console.log(`Number of players connected: ${++pcount}`)
        
        clientSocket.on('test', function(data){
            console.log("We've received test data from client:",data)
            clientSocket.emit('TEST_ACK',`You succesfully sent test data ${++clicks} times`)
        })

        // clientSocket.on('test', function(data){​​
        //     console.log("We've received test data from client:",data)
        // }​​)
        
        clientSocket.on('disconnect',function(){
            // Print to the server's terminal that a user disconnected
            console.log("Player with ID:",clientSocket.id,"disconnected")
            console.log(`Number of players connected: ${--pcount}`)
        })

        // clientSocket.on('disconnect',function(){​​​​
        //     // Print to the server's terminal that a user disconnected
        //     console.log("Player with ID:",clientSocket.id,"disconnected")
        //     console.log(`Number of players connected: ${--pcount}`)
        // }​​​​)
        
    })
    
}

exports.manageState = manageState
