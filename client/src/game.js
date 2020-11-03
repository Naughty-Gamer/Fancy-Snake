import { drawEverySnake } from "./drawer.js"

export default class Game {
	constructor() {
		/**
		 * Joins the websocket connection that the HTTP server has established.
		 * More precisely, it connects the client to the default namespace `'/'`
		 * - You can think of it as joining in on an on-going conference call
		 */
		var socket = io()

		socket.on("CONN_ACK", (msg) => {
			console.log(msg)
			this.initGame(socket)
		})
	}

	/**
	 * Initialises the game on the browser
	 * @param {SocketIO.Socket} socket Used for communicating with the server
	 */
	initGame(socket) {
		socket.on("new_pos", (snakes) => {
			// Clears the map before drawing every frame
			document.getElementById("game-map").innerHTML = ""
			drawEverySnake(snakes)
		})
	}
}
