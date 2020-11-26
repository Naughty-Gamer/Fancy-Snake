import { drawEverySnake, foodDraw, drawScoreBoard } from "./drawer.js"
import Snake from "./models/snake.js"

Snake.player_list = {}

const waitingText = document.getElementById("waiting-text")
const waitingBox = document.getElementById("waiting-box")
const gameMap = document.getElementById("game-map")
const scoreBoard = document.getElementById("scoreboard")
const back2leaderBoardBtn = document.getElementById("back2leaderBoardBtn")
const table = document.getElementById("tableScoreboard")
let countdownText = "Waiting for players..."
export let renderID = null

/**
 * Game class
 * - Updates the client's state of the game every time it receives data from the server
 * - Draws the state of the game on the client's screen
 */
export default class Game {
	constructor(socket) {
		this.snakeIsDead = false
		this.direction = ""
		document.addEventListener("keydown", this.keyDownHandler(socket))

		//recieve the countdown timer from the server.
		socket.on("countdown", (data) => {
			countdownText = data.time
		})

		//Recieve the 90 seconds timer from the server to be able to draw it on the clients side.
		socket.on("timetilldead", (data) => {
			this.timeTillDeath = data.seconds
		})

		//Acknowledging that a user joined the game.
		socket.on("CONN_ACK", (confirmation) => {
			console.log(confirmation)
			this.startRendering()
			this.registerListeners(socket)
		})
	}
	// Registers all the listeners that waits for data to be sent by the server
	registerListeners(socket) {
		// adds a new snake to the client's list of snakes every time a new player joins
		socket.on("init", (data) => {
			data.snakes.forEach((snake) => {
				new Snake(snake)
			})
		})

		// changes the state of every snake every time the server sends an update
		socket.on("update", (snakepack) => {
			snakepack.snakes.forEach((server_snake) => {
				let client_snake = Snake.player_list[server_snake.socketid]
				if (client_snake) {
					if (server_snake.headLocation !== undefined) {
						client_snake.body = server_snake.body
						client_snake.tailIndex = server_snake.tailIndex
					}
				}
			})
		})

		// removes the snakes that are authorized to be removed by the server
		socket.on("remove", (data) => {
			data.IDs.forEach((socketid) => {
				delete Snake.player_list[socketid]
			})
		})

		// Recieve updated locations of food
		socket.on("food", (data) => {
			this.food = data.food // acting as state for food
		})

		// sets the snake's "dead" state to true if the server says it is dead
		socket.on("dead", () => {
			this.snakeIsDead = true
		})

		// sets the snake's "snakeWon" state to true if the server says it has won
		socket.on("win", () => {
			this.snakeWon = true
		})
	}

	// starts rendering the client's state of the game
	startRendering() {
		const fps = 60
		const delayBetweenFramesInMs = 1000 / fps
		renderID = setInterval(() => {
			waitingText.innerText = countdownText
			//when the snake dies display some css to show him that he died.
			if (this.snakeIsDead) {
				waitingText.innerText = "PATHETIC"
				back2leaderBoardBtn.style.display = "block"
				waitingBox.style.opacity = "80%"
				waitingText.style.marginTop = "35%"
				//when the snake wins display some css to show him that he Won the game.
			} else if (this.snakeWon) {
				waitingText.innerText = "CHAMPION"
				waitingText.style.color = "#FFD700"
				gameMap.style.boxShadow = " 0 0 0px 0 #FFD700"
				waitingBox.style.boxShadow = " 0 0 50px 0 #FFD700"
				table.style.borderColor = "#FFD700"
				gameMap.style.borderColor = "#FFD700"
				waitingBox.style.borderColor = "#FFD700"
				scoreBoard.style.boxShadow = " 0 0 0px 0 #FFD700"
				scoreBoard.style.borderColor = "#FFD700"
				document.body.style.borderColor = "#FFD700"
				back2leaderBoardBtn.style.display = "block"
				waitingBox.style.opacity = "80%"
				waitingText.style.marginTop = "35%"
			} else {
				//while the game continue Display the timer on the screen.
				if (countdownText <= 1) {
					gameMap.style.display = "grid"
					gameMap.style.zIndex = 0
					waitingBox.style.display = "block"
					waitingBox.style.zIndex = 1
					waitingText.style.fontSize = "10vmin"
					waitingText.style.textAlign = "center"
					waitingText.style.marginTop = "45%"
					waitingBox.style.opacity = "30%"
					waitingText.style.color = "#892be28c"
					waitingText.innerText = this.timeTillDeath
				}
			}
			drawScoreBoard(Snake.player_list)
			document.getElementById("game-map").innerHTML = ""
			drawEverySnake(Snake.player_list)
			foodDraw(this.food)
		}, delayBetweenFramesInMs)
	}

	// sends the server the player's inputs
	keyDownHandler(socket) {
		return function (e) {
			let key = e.key || e.keyCode
			if (key === 68 || key == "d" || key == "ArrowRight") {
				//d
				if (this.direction != "left") {
					this.direction = "right"
					socket.emit("keyDown", { dir: this.direction })
				}
			} else if (key === 83 || key == "s" || key == "ArrowDown") {
				//s
				if (this.direction != "up") {
					this.direction = "down"
					socket.emit("keyDown", { dir: this.direction })
				}
			} else if (key === 65 || key == "a" || key == "ArrowLeft") {
				//a
				if (this.direction != "right") {
					this.direction = "left"
					socket.emit("keyDown", { dir: this.direction })
				}
			} else if (key === 87 || key == "w" || key == "ArrowUp") {
				// w
				if (this.direction != "down") {
					this.direction = "up"
					socket.emit("keyDown", { dir: this.direction })
				}
			}
		}
	}
}
