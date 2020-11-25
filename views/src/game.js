import { drawEverySnake, foodDraw, drawScoreBoard } from "./drawer.js"
import Snake from "./models/snake.js"

Snake.player_list = {}

const waitingText = document.getElementById("waiting-text")
const waitingBox = document.getElementById("waiting-box")
const gameMap = document.getElementById("game-map")
const scoreBoard = document.getElementById("scoreboard")
// const container = document.getElementById("container")
const back2leaderBoardBtn = document.getElementById("back2leaderBoardBtn")
const table = document.getElementById("tableScoreboard")

//still not implemented:
// const clock = document.getElementById("clock")
// const numbers = document.getElementById("numbers")

let countdownText = "Waiting for players..."

export default class Game {
	constructor(socket) {
		this.snakeIsDead = false
		this.direction = ""
		// this.delay = 55
		document.addEventListener("keydown", this.keyDownHandler(socket))

		socket.on("countdown", (data) => {
			countdownText = data.time
		})

		socket.on("timetilldead", (data) => {
			this.timeTillDeath = data.seconds
			console.log("Until Death:", data.seconds)
		})

		socket.on("CONN_ACK", (confirmation) => {
			console.log(confirmation)
			this.startRendering()
			this.registerListeners(socket)
		})
	}

	registerListeners(socket) {
		socket.on("init", (data) => {
			data.snakes.forEach((snake) => {
				new Snake(snake)
			})
		})

		socket.on("update", (snakepack) => {
			snakepack.snakes.forEach((server_snake) => {
				let client_snake = Snake.player_list[server_snake.socketid]
				if (client_snake) {
					if (server_snake.headLocation !== undefined) {
						// client_snake.updateBody(
						// 	server_snake.headLocation,
						// 	server_snake.tailLocation
						// )
						client_snake.body = server_snake.body // naive implementation -- could just send head and tail
						client_snake.tailIndex = server_snake.tailIndex
						// client_snake.socketid = server_snake.socketid
					}
				}
			})
		})

		socket.on("remove", (data) => {
			data.IDs.forEach((socketid) => {
				delete Snake.player_list[socketid]
			})
		})

		// naive implementation -- need to have state for food
		socket.on("food", (data) => {
			this.food = data.food // acting as state for food
		})

		socket.on("dead", () => {
			this.snakeIsDead = true
		})

		socket.on("win", () => {
			this.snakeWon = true
		})
	}

	startRendering() {
		const fps = 60
		const delayBetweenFramesInMs = 1000 / fps
		setInterval(() => {
			waitingText.innerText = countdownText
			if (this.snakeIsDead) {
				waitingText.innerText = "PATHETIC"
				back2leaderBoardBtn.style.display = "block"
				waitingBox.style.opacity = "80%"
				waitingText.style.marginTop = "35%"
			} else if (this.snakeWon) {
				waitingText.innerText = "CHAMPION"
				waitingText.style.color = "#FFD700" //Test the gold color.
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
