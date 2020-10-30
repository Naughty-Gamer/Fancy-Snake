const Path = require('path') // Module containing utilities for working with filepaths
const Http = require('http') // Module for building/creating HTTP servers
const Express = require('express') // Module for spinning up a powerful HTTP server
const WebSocketServer = require("socket.io") // Module for spinning up a websocket server
const GameState = require('./gameState') // Module that handles the state of the game


const port = process.env.PORT || 3000 // Will use the host's PORT environment variable or 3000 for development purposes
const express_app = Express() // Creating an Express application
const express_server = Http.createServer(express_app) // Spinning up the Express server

express_server.listen(port, function () {
    console.log(`\nListening on port ${port}\n`)
})

express_app.use('/src',Express.static('src'))

express_app.get('/', function (req,res) {
	res.sendFile(Path.resolve("index.html"))
})

/**
 * Spins up a websocket server that works with the Express server
 * - You can think of it as starting a conference call alone
 * - Listens to the default namespace `/` and connects to it by default
 * - `/` has nothing to do with the URL—it is just a name
 * - `io` handles the namespace connection which allows us to work with that connection
 */
const io = WebSocketServer(express_server)

GameState.manageState(io)