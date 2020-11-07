import { drawEverySnake , foodDraw } from "./drawer.js"
let socket = null
export default class Game {
	constructor() {
		this.canInteract = true
		this.direction = ""
		this.delay = 55
		document.addEventListener("keydown", this.keyDownHandler)

		/**
		 * Joins the websocket connection that the HTTP server has established.
		 * More precisely, it connects the client to the default namespace `'/'`
		 * - You can think of it as joining in on an on-going conference call
		 */
		socket = io()

		socket.on("CONN_ACK", (msg) => {
			console.log(msg)
			this.initGame()
		})
	}

	/**
	 * Initialises the game on the browser
	 * @param {SocketIO.Socket} socket Used for communicating with the server
	 */
	initGame() {
		socket.on("new_pos", (data) => {
			// Clears the map before drawing every frame
			document.getElementById("game-map").innerHTML = ""
			drawEverySnake(data.snakes)
			foodDraw(data.food)
		})
	}

	// handleMovement(e){
	// 	// this.keyDownHandler(this.socket,e)
	// 	console.log("Working" + this.socket)
	// }

	keyDownHandler(e) {
		var key = e.key || e.keyCode || e.key
		if (e.key === 68 || e.key == "d" || e.key == "ArrowRight") {
			//d
			if (this.direction != "left") {
				this.direction = "right"
				socket.emit("keyDown", { dir: this.direction })
			}
		} else if (key === 83 || e.key == "s" || e.key == "ArrowDown") {
			//s
			if (this.direction != "up") {
				this.direction = "down"
				socket.emit("keyDown", { dir: this.direction })
			}
		} else if (key === 65 || e.key == "a" || e.key == "ArrowLeft") {
			//a
			if (this.direction != "right") {
				this.direction = "left"
				socket.emit("keyDown", { dir: this.direction })
			}
		} else if (key === 87 || e.key == "w" || e.key == "ArrowUp") {
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
