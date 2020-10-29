// Server needs to send data about the state of the game back to the players

const IO = require("socket.io")

function manageState(server){
    
    const io = IO(server,{})

    // connect event listener

    io.sockets.on('connection', clientSocket => {​​
        // Print to the server's terminal that a user connected
        console.log('A user connected with ID:'+clientSocket.id);
    }​​);

    clientSocket.on('test', () => {​​

        console.log('testing if we recieve this from the player');

    }​​);
    // disconnect event listener
    clientSocket.on('disconnect', () => {​​​​
        
        // Print to the server's terminal that a user disconnected
        console.log('user disconnected');
    }​​​​);
}

exports.manageState = manageState
