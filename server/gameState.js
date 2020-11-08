const Snake = require("./game/snake.js")
const AllFood = require("./game/food.js")
const Collision = require("./game/collision.js")

/**
 * @type {"Socket.id : Socket"}
 */
let socket_list = {}

/**
 * @type {"Socket.id : Snake"}
 */
Snake.player_list = {}

let sendingUpdateID = 0
let gameUpdateID = 0

/**
 * Manages the state of the game
 * @param {SocketIO.Server} server the websocket server whose sockets will be used
 */
function manageState(server) {
	// Event listener for every time someone joins the websocket connection
	server.sockets.on("connection", function (clientSocket) {
		if (Object.keys(socket_list).length == 0) {
			startUpdatingGame()
			startSendingUpdates()
		}

		Snake.onConnect(clientSocket)

		clientSocket.on("disconnect", function () {
			Snake.onDisconnect(clientSocket)

			if (Object.keys(socket_list).length == 0) {
				terminateConnection(server)
			}
		})
	})
}

/**
 * Carries out tasks related to terminating a websocket server connection
 * @param {SocketIO.Server} server
 */
function terminateConnection(server) {
	let terminateGamePromise = new Promise((log) => {
		/**
		 * * When both setIntervals are closed, the Express server shuts down,
		 * * but I can choose to only terminate only one of them
		 * TODO: Keep Express server running
		 */
		clearInterval(gameUpdateID)
		clearInterval(sendingUpdateID)
		log()
	})

	let terminateConnectionPromise = new Promise((log) => {
		server.close()
		log()
	})

	terminateGamePromise.then((_) => {
		console.log("\nGame terminated")
	})

	terminateConnectionPromise.then((_) => {
		console.log("\nWebsocket server closed")
	})
}

/**
 * @returns {Game} a new game instance
 */
// function getNewGame() {
// 	return new Game(player_list,socket_list)
// }

/**
 * Carries out tasks related to terminating a player from a game
 * @param {SocketIO.Socket} clientSocket the websocket connection that the player is communicating on
 */
Snake.onDisconnect = function (clientSocket) {
	// Print to the server's terminal that a user disconnected
	console.log("Player with ID:", clientSocket.id, "disconnected")
	delete Snake.player_list[clientSocket.id]
	delete socket_list[clientSocket.id]
}

/**
 * Carrying out tasks related to initialising a player into the game
 * @param {SocketIO.Socket} clientSocket the websocket connection that the player is communicating on
 */
Snake.onConnect = function (clientSocket) {
	// Print to the server's terminal that a player connected
	console.log("Player with ID:", clientSocket.id, "connected")

	clientSocket.emit("CONN_ACK", "You succesfully connected")

	let snake = new Snake(20, 74, clientSocket.id)
	snake.addToBody(19, 74)
	snake.addToBody(18, 74)
	snake.addToBody(17, 74)
	snake.addToBody(16, 74)
	snake.addToBody(15, 74)

	// const tickrate = 1000/16.667
	// setInterval( function () {
	clientSocket.on("keyDown", (data) => {
		snake.setdirectionHeading(data.dir) // move this inside update
		// snake.move()
		console.log(data)
	})
	// },tickrate)

	socket_list[clientSocket.id] = clientSocket // adding each socket connection to an associative array
	// player_list[clientSocket.id] = snake // ADD IT TO SNAKE.
}

let allFood = new AllFood(75, 75, 0.75)

function startUpdatingGame() {
	const game_speed = 30
	const delayBetweenTicksInMs = 1000 / game_speed
	gameUpdateID = setInterval(function () {
		for (let socket_id in Snake.player_list) {
			let snake = Snake.player_list[socket_id]
			snake.update()
		}
		Collision.updateFood(Snake.player_list, allFood)
		// snake.move()
	}, delayBetweenTicksInMs)
}

Snake.getUpdatedSnakes = function () {
	let snakes = []
	for (let socket_id in Snake.player_list) {
		let snake = Snake.player_list[socket_id]
		// let snake = socket.snake
		// snake.update() //! This is updating the snakes, NOT checking for updates. Fix this.
		snakes.push({
			// This updates the client on the position of the snake (x and y)
			snake: snake,
		})
	}
	return snakes
}

function startSendingUpdates() {
	const tickrate = 15
	const delayBetweenTicksInMs = 1000 / tickrate
	sendingUpdateID = setInterval(function () {
		let pack = {
			snakes: Snake.getUpdatedSnakes(),
			food: allFood.getAllFood(),
		}

		for (let socket_id in socket_list) {
			let socket = socket_list[socket_id]
			socket.emit("new_pos", pack)
		}
	}, delayBetweenTicksInMs)
}

module.exports.manageState = manageState

//Our snake should move continuously so it should be inside a setinterval which will make it move continuously. Which will make the speed of the snake the speed of the setInterval.
