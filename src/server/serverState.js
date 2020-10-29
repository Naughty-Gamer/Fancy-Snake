// Server needs to send data about the state of the game back to the players

const IO = require("socket.io")

function manageState(server){
    
    const io = IO(server,{})

    
}

exports.manageState = manageState
