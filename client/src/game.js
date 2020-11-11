import { drawEverySnake, foodDraw, drawScoreBoard } from "./drawer.js"
import Snake from "./models/snake.js"
// import AllFood from "./models/food.js"
// import Food from "./models/food.js"

let socket = null

Snake.player_list = {}

export default class Game {
	constructor() {
		this.canInteract = true
		this.direction = ""
		// this.delay = 55
		document.addEventListener("keydown", this.keyDownHandler)

		/**
		 * Joins the websocket connection that the HTTP server has established.
		 * More precisely, it connects the client to the default namespace `'/'`
		 * - You can think of it as joining in on an on-going conference call
		 */
		socket = io()

		socket.on("CONN_ACK", (msg) => {
			console.log(msg)
			this.startRendering()

			socket.on("init", (data) => {
				data.snakes.forEach((snake) => {
					new Snake(snake)
				})

				// data.allfood.forEach((foodlocation) => {
				// 	new AllFood(foodlocation)
				// })
			})

			socket.on("update", (data) => {
				data.snakes.forEach((pack) => {
					let server_snake = pack.snake
					let client_snake = Snake.player_list[server_snake.socketid]
					if (client_snake) {
						if (server_snake.headLocation !== undefined) {
							client_snake.body = server_snake.body // naive implementation -- could just send head and tail
						}
					}
				})

				// data.allfood.forEach((foodlocation) => {
				// 	let pack = foodlocation
				// })
			})

			socket.on("remove", (data) => {
				data.snakes.forEach((snake) => {
					delete Snake.player_list[snake.socketid]
				})
			})

			// naive implementation -- need to have state for food
			socket.on("food", (data) => {
				this.food = data.food
				// Clears the map before drawing every frame
				// document.getElementById("game-map").innerHTML = ""
				// drawEverySnake(data.snakes)
			})
		})
	}

	startRendering() {
		const fps = 60
		const delayBetweenFramesInMs = 1000 / fps
		setInterval(() => {
			// document.body.innerHTML = ""
			drawScoreBoard(Snake.player_list)
			document.getElementById("game-map").innerHTML = ""
			drawEverySnake(Snake.player_list)
			foodDraw(this.food)
		}, delayBetweenFramesInMs)
	}

	keyDownHandler(e) {
		var key = e.key || e.keyCode
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

	// 	setInputDelay(){
	// 		this.canInteract = false
	// 		setTimeout(()=>{
	// 			this.canInteract = true
	// 		},this.delay)
	// 	}
}
