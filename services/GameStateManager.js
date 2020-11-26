const Snake = require("../models/snake.js")
const AllFood = require("../models/food.js")
const Collision = require("./GameCollision.js")
const KillTimer = require("./KillTimer.js")
const Validation = require("./Validation.js")
const AuthenticationController = require("../controllers/AuthenticationController.js")
const LeaderboardController = require("../controllers/LeaderboardController.js")
const MAX_PLAYER = 3 //Change it later on to 3 players (2 is for testing).
let numPlayer = 0
let timer = 3
let isnewGame = true
let color_array = ["#10e39d", "#2d5ded", "#F0E68C", "#E22F2C", "#E28A2C", "#2C47E2", "#aeff00", "#ff00a2", "#6d1a99", "#e2b42b", "#dfe22b", "#e22bdf"]

class GameStateManager {
	constructor(server) {
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

		GameStateManager.joinGameRequest = false

		// Event listener for every time someone joins the websocket connection.
		server.sockets.on("connection", function (clientSocket) {
			//when it recieves the emit "login" from the client side, it checks for the validataion of the login.
			clientSocket.on("login", function (data) {
				let cleanData = Validation.validate(data)
				if (cleanData.username && cleanData.password) {
					//after passing the check we will use the clean data to continue the login process.
					let validData = { username: cleanData.username, password: cleanData.password }
					AuthenticationController.isValidLoginAttempt(validData, function (err, res) {
						//when we get a response of true from the function {callback}
						if (res == true) {
							//we emit a response that he is good to go and then it will emit it to the client side.Which will allow him to login.
							clientSocket.emit("loginResponse", { success: true, reason: cleanData.reason })
						} else {
							clientSocket.emit("loginResponse", { success: false, reason: "Username or password is incorrect" })
						}
					})
				} else {
					//Immediately return a successs fail, and give him a reason why the login failed.
					clientSocket.emit("loginResponse", { success: false, reason: cleanData.reason })
				}
			})
			//when it recieves the emit "register" from the client side, it checks for the validataion of the register.
			clientSocket.on("register", function (data) {
				let cleanData = Validation.validate(data)
				//when the password and username are clean we could start the proccess of adding the user.
				if (cleanData.username && cleanData.password) {
					let validData = { username: cleanData.username, password: cleanData.password }
					//check if there is another player already with that name.
					AuthenticationController.isUsernameTaken(validData, function (res) {
						//When the call back returns a answer, then we could allow him to register.
						if (res.length > 0) {
							clientSocket.emit("registerResponse", { success: false, reason: "User Already Exists." })
						} else {
							AuthenticationController.addUser(validData, function () {
								//add him to the leaderboard with a score of 0
								LeaderboardController.updateLeaderboardData(validData.username, 0, function () {
									clientSocket.emit("registerResponse", { success: true, reason: null })
								})
							})
						}
					})
				} else {
					clientSocket.emit("registerResponse", { success: false, reason: cleanData.reason })
				}
			})

			//This is a request from the client side to get the information about the database.
			clientSocket.on("req_lb_data", function () {
				LeaderboardController.getLeaderboardData(function (res) {
					if (res.length > 0) {
						clientSocket.emit("lb_data_req_ack", res)
					} else {
						clientSocket.emit("lb_data_req_ack", null)
					}
				})
			})

			//A request to join a game from the client side.
			clientSocket.on("joinGameRequest", function (data) {
				clientSocket.emit("request_ack")
				//if the game wasn't started start one.
				if (Object.keys(GameStateManager.socket_list).length == 0) {
					console.log("\nNew game starting up")
					GameStateManager.allFood = new AllFood(75, 75, 0.75)
					GameStateManager.startGame()
					GameStateManager.startSendingUpdates()
				}

				Snake.onConnect(clientSocket, data.user)

				clientSocket.on("disconnect", function () {
					Snake.disconnect(clientSocket)
				})
			})
		})
	}
}

//this is a setInterval that starts sending updates to the client side.
GameStateManager.startSendingUpdates = function (tickrate = 30) {
	const delayBetweenTicksInMs = 1000 / tickrate
	GameStateManager.sendingUpdateID = setInterval(function () {
		//send neccessary information about the snake.
		let snakepack = {
			snakes: Snake.getUpdatedSnakes(),
		}
		//send neccessary information about the food.
		let foodpack = {
			food: GameStateManager.allFood.getAllFood(),
		}
		//Regularly send information to the players about the status of other players.
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

//This setInterval is responsible to start up the game.
GameStateManager.startGame = function (game_speed = 15) {
	const delayBetweenTicksInMs = 1000 / game_speed
	GameStateManager.gameUpdateID = setInterval(function () {
		for (let socket_id in Snake.player_list) {
			let snake = Snake.player_list[socket_id]
			snake.update()
			//when the countdown ends you could start checking the conditions we have down below.
			if (timer <= 0) {
				//check if there is one player left in the game and emit to the client side that he won.
				if (Object.keys(Snake.player_list).length == 1) {
					GameStateManager.socket_list[socket_id].emit("win")

					let username = Snake.player_list[socket_id].username

					// get the winners old 'wins' count
					LeaderboardController.getWinsbyPlayer(username, function (res) {
						// update leaderboard with winners new 'wins' count
						LeaderboardController.updateLeaderboardData(username, res[0].wins + 1, function () {
							return
						})
					})
					Snake.disconnect(GameStateManager.socket_list[socket_id])
					//otherwise check if the players are dead or not.
				} else {
					//if the player is dead, decrease the number of players,
					//emit it to the server and kick him out of the game.
					if (snake.isDead) {
						numPlayer--
						GameStateManager.socket_list[socket_id].emit("dead")
						Snake.disconnect(GameStateManager.socket_list[socket_id])
					}
				}
			}
		}
		//Keep checking the food status.
		Collision.updateFood(Snake.player_list, GameStateManager.allFood)
	}, delayBetweenTicksInMs)
}

/**
 * Carries out tasks related to terminating a websocket server connection
 * @param {SocketIO.Server} server
 */
GameStateManager.terminateGame = function () {
	clearInterval(GameStateManager.gameUpdateID)
	clearInterval(GameStateManager.sendingUpdateID)
	clearInterval(GameStateManager.killTimerID)
	numPlayer = 0
	timer = 3
	isnewGame = true
	console.log("\nGame terminated")
}

/**
 * Carries out tasks related to terminating a player from a game
 * @param {SocketIO.Socket} clientSocket the websocket connection that the player is communicating on
 */
Snake.disconnect = function (clientSocket) {
	console.log("num of players", numPlayer)
	// Print to the server's terminal that a user disconnected
	console.log("Player with ID:", clientSocket.id, "disconnected")
	delete GameStateManager.socket_list[clientSocket.id]
	delete Snake.player_list[clientSocket.id]
	GameStateManager.removepack.IDs.push(clientSocket.id)

	if (Object.keys(GameStateManager.socket_list).length == 0) {
		GameStateManager.terminateGame()
	}
}

/**
 * Carrying out tasks related to initialising a player into the game
 * @param {SocketIO.Socket} clientSocket the websocket connection that the player is communicating on
 */
Snake.onConnect = function (clientSocket, username) {
	// Print to the server's terminal that a player connected
	console.log("Player with ID:", clientSocket.id, "connected")

	//Send an acknowlegement to the client side that the user connected.
	clientSocket.emit("CONN_ACK", "You succesfully connected")
	//Increase the number of players.
	if (numPlayer <= MAX_PLAYER) {
		numPlayer++
	}

	console.log("num of players", numPlayer)
	GameStateManager.socket_list[clientSocket.id] = clientSocket // adding each socket connection to an associative array
	//when the appropraite ammount of players is inside the game, start the countdown.
	if (numPlayer >= MAX_PLAYER) {
		let countdownID = setInterval(() => {
			for (let socket_id in GameStateManager.socket_list) {
				let socket = GameStateManager.socket_list[socket_id]
				socket.emit("countdown", { time: timer })
			}
			timer--

			if (timer <= 0) clearInterval(countdownID)
		}, 1000)
		if (isnewGame) {
			// This is here to let this killTimer start only once, when there is the appropriate amount of players inside the game. (We dont want to run it more than once.)
			isnewGame = false
			GameStateManager.killTimerID = KillTimer.startKillTimer(GameStateManager.socket_list, Snake.player_list)
		}
	}

	let color_num = Math.floor(Math.random() * color_array.length) // assing him a random color.
	let x_axis = Math.floor(Math.random() * 73) // passing him a random x-axis position.
	let y_axis = Math.floor(Math.random() * 73) // passing him a random y-axis position.
	//spawn the snake when a player joins the game.
	let snake = new Snake(clientSocket.id, x_axis, y_axis, username, color_array[color_num])

	GameStateManager.initpack.snakes.push(snake)

	//This takes in the information of the movement of each player from the client side.
	clientSocket.on("keyDown", (data) => {
		console.log("Received:", data)
		//make sure users input is not registerd until the countdown ends.
		if (timer <= 0) {
			// for security measures. If the values enterd are not the values we need we reject them.
			if (data.dir == "down" || "up" || "left" || "right") {
				snake.setdirectionHeading(data.dir)
			}
		}
	})

	clientSocket.emit("init", { snakes: Snake.getInitSnakes() })
}

/**
 * @param {Snake} snake the snake being packed
 * @param {boolean} isInit if the snake is being initialised
 */
Snake.pack = function (snake, isInit = false) {
	let pack = {
		username: snake.username,
		socketid: snake.socketid,
		headLocation: snake.headLocation,
		tailIndex: snake.tailIndex,
		tailLocation: snake.tailLocation,
		snakeColor: snake.snakeColor,
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
	let snakes = []
	for (let socket_id in Snake.player_list) {
		let snake = Snake.player_list[socket_id]
		let snake_lite = Snake.pack(snake, true)
		snakes.push(snake_lite)
	}
	return snakes
}

module.exports = GameStateManager
