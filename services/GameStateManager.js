const Snake = require("../models/snake.js")
const AllFood = require("../models/food.js")
const Collision = require("./GameCollision.js")
const KillTimer = require("./KillTimer.js")
const MAX_PLAYER = 2 //Change it later on to 5 players (2 is for testing).
let numPlayer = 0
let timer = 3
let isnewGame = true

class GameStateManager {
	constructor(server) {
		// this.server = server;
		/**
		 * @type {"Socket.id : Socket"}
		 */
		GameStateManager.socket_list = {}

		/**
		 * @type {Socket.id : Snake}
		 */
		Snake.player_list = {}

		GameStateManager.sendingUpdateID = 0
		GameStateManager.gameUpdateID = 0
		GameStateManager.killTimerID = 0

		GameStateManager.initpack = { snakes: [] }
		GameStateManager.removepack = { IDs: [] }

		// Event listener for every time someone joins the websocket connection
		server.sockets.on("connection", function (clientSocket) {
			if (Object.keys(GameStateManager.socket_list).length == 0) {
				console.log("\nNew game starting up")
				GameStateManager.allFood = new AllFood(75, 75, 0.75)
				// clearInterval(GameStateManager.sendingUpdateID)
				// clearInterval(GameStateManager.gameUpdateID)
				GameStateManager.startGame()
				GameStateManager.startSendingUpdates()
			}

			Snake.onConnect(clientSocket)

			clientSocket.on("disconnect", function () {
				Snake.disconnect(clientSocket)

				if (Object.keys(GameStateManager.socket_list).length == 0) {
					GameStateManager.terminateGame(server)
				}
			})
		})
	}
}

GameStateManager.startSendingUpdates = function (tickrate = 30) {
	const delayBetweenTicksInMs = 1000 / tickrate
	GameStateManager.sendingUpdateID = setInterval(function () {
		// console.log("Sending updates to client");
		let snakepack = {
			snakes: Snake.getUpdatedSnakes(),
		}

		let foodpack = {
			food: GameStateManager.allFood.getAllFood(),
		}

		for (let socket_id in GameStateManager.socket_list) {
			let socket = GameStateManager.socket_list[socket_id]
			socket.emit("init", GameStateManager.initpack) // if nobody new joins, then this just sends an empty object
			socket.emit("update", snakepack)
			socket.emit("food", foodpack)
			socket.emit("remove", GameStateManager.removepack) // if nobody leaves, then this just sends an empty object
		}
		GameStateManager.initpack.snakes = []
		GameStateManager.removepack.IDs = []
	}, delayBetweenTicksInMs)
}

GameStateManager.startGame = function (game_speed = 15) {
	const delayBetweenTicksInMs = 1000 / game_speed
	GameStateManager.gameUpdateID = setInterval(function () {
		for (let socket_id in Snake.player_list) {
			let snake = Snake.player_list[socket_id]
			snake.update()
			if (snake.isDead) {
				// GameStateManager.socket_list[socket_id].on("dead_ack", function () {
				GameStateManager.socket_list[socket_id].emit("dead")
				Snake.disconnect(GameStateManager.socket_list[socket_id])
				// })
				// })
				//re direct him into you died screen.
			}
		}
		Collision.updateFood(Snake.player_list, GameStateManager.allFood)
		// console.log("Currently", Object.keys(GameStateManager.socket_list).length, "players");
	}, delayBetweenTicksInMs)
}

/**
 * Carries out tasks related to terminating a websocket server connection
 * @param {SocketIO.Server} server
 */
GameStateManager.terminateGame = function (server) {
	clearInterval(GameStateManager.gameUpdateID)
	clearInterval(GameStateManager.sendingUpdateID)
	clearInterval(GameStateManager.killTimerID)
	numPlayer = 0
	console.log("\nGame terminated")
}

/**
 * Carries out tasks related to terminating a player from a game
 * @param {SocketIO.Socket} clientSocket the websocket connection that the player is communicating on
 */
Snake.disconnect = function (clientSocket) {
	if (numPlayer !== MAX_PLAYER) {
		numPlayer--
	}
	// Print to the server's terminal that a user disconnected
	console.log("Player with ID:", clientSocket.id, "disconnected")
	delete GameStateManager.socket_list[clientSocket.id]
	delete Snake.player_list[clientSocket.id]
	GameStateManager.removepack.IDs.push(clientSocket.id)
}

/**
 * Carrying out tasks related to initialising a player into the game
 * @param {SocketIO.Socket} clientSocket the websocket connection that the player is communicating on
 */
Snake.onConnect = function (clientSocket) {
	// Print to the server's terminal that a player connected
	console.log("Player with ID:", clientSocket.id, "connected")
	console.log("num of players", numPlayer)

	clientSocket.emit("CONN_ACK", "You succesfully connected")

	if (numPlayer <= MAX_PLAYER) {
		numPlayer++
	}

	GameStateManager.socket_list[clientSocket.id] = clientSocket // adding each socket connection to an associative array

	if (numPlayer >= MAX_PLAYER) {
		let countdownID = setInterval(() => {
			for (let socket_id in GameStateManager.socket_list) {
				let socket = GameStateManager.socket_list[socket_id]
				socket.emit("countdown", { time: timer })
			}
			timer--
			console.log("///////////////", timer, "//////////////")
			if (timer <= 0) clearInterval(countdownID)
		}, 1000)
		if (isnewGame) {
			// This is here to let this killTimer start only once, when there is the appropriate amount of players inside the game. (We dont want to run it more than once.)
			isnewGame = false
			GameStateManager.killTimerID = KillTimer.startKillTimer(GameStateManager.socket_list, Snake.player_list)
		}
		// socket.emit("timetilldead", { seconds: KillTimer.secondsUntilDeath })
	}

	let snake = new Snake(clientSocket.id, Math.floor(Math.random() * 74), Math.floor(Math.random() * 74))

	GameStateManager.initpack.snakes.push(snake)

	clientSocket.on("keyDown", (data) => {
		console.log("Received:", data)
		// added this to fix the bug were direction of the player changes, because they were able to send data over,whilst the game wasn't started.
		if (timer <= 0) {
			snake.setdirectionHeading(data.dir) // move this inside update
			console.log(clientSocket.id, "moving", data.dir)
			// snake.move()
		}
	})

	clientSocket.emit("init", { snakes: Snake.getInitSnakes() })
}

/**
 * @param {Snake} snake the snake being packed
 * @param {boolean} isInit is the snake being initialised?
 */

Snake.pack = function (snake, isInit = false) {
	let pack = {
		socketid: snake.socketid,
		headLocation: snake.headLocation,
		tailIndex: snake.tailIndex,
		tailLocation: snake.tailLocation,
	}
	if (isInit) pack.body = snake.body

	return pack
}

Snake.getInitSnakes = function () {
	let snakepack = []
	for (const socketid in Snake.player_list) {
		const snake = Snake.player_list[socketid]
		let snake_lite = Snake.pack(snake, true)
		snakepack.push(snake_lite)
	}
	return snakepack
}

Snake.getUpdatedSnakes = function () {
	// added this if statments.
	if (numPlayer >= MAX_PLAYER) {
		// console.log("Getting updated snakes");
		// checks if the players are sufficent to start the game or not.
		let snakes = []
		for (let socket_id in Snake.player_list) {
			let snake = Snake.player_list[socket_id]
			let snake_lite = Snake.pack(snake, true)
			snakes.push(snake_lite)
		}
		return snakes
	}
}

module.exports = GameStateManager

//Our snake should move continuously so it should be inside a setinterval which will make it move continuously. Which will make the speed of the snake the speed of the setInterval.
