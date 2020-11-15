import { drawEverySnake, foodDraw, drawScoreBoard } from "./drawer.js";
import Snake from "./models/snake.js";

let socket = null;

Snake.player_list = {};

const waitingText = document.getElementById("waiting-text");
const waitingBox = document.getElementById("waiting-box");
const gameMap = document.getElementById("game-map");
let countdownText = "Waiting for players...";

export default class Game {
	constructor() {
		this.direction = "";
		// this.delay = 55
		document.addEventListener("keydown", this.keyDownHandler);
		/**
		 * Joins the websocket connection that the HTTP server has established.
		 * More precisely, it connects the client to the default namespace `'/'`
		 * - You can think of it as joining in on an on-going conference call
		 */
		socket = io();

		socket.on("countdown", (data) => {
			countdownText = data.time;
		});

		socket.on("CONN_ACK", (confirmation) => {
			console.log(confirmation);
			this.startRendering();
			this.registerListeners();
		});
	}

	registerListeners() {
		socket.on("init", (data) => {
			data.snakes.forEach((snake) => {
				new Snake(snake);
			});
		});

		socket.on("update", (snakepack) => {
			snakepack.snakes.forEach((server_snake) => {
				let client_snake = Snake.player_list[server_snake.socketid];
				if (client_snake) {
					if (server_snake.headLocation !== undefined) {
						// client_snake.updateBody(
						// 	server_snake.headLocation,
						// 	server_snake.tailLocation
						// )
						client_snake.body = server_snake.body; // naive implementation -- could just send head and tail
						client_snake.tailIndex = server_snake.tailIndex;
						// client_snake.socketid = server_snake.socketid
					}
				}
			});
		});

		socket.on("remove", (data) => {
			data.IDs.forEach((socketid) => {
				delete Snake.player_list[socketid];
			});
		});

		// naive implementation -- need to have state for food
		socket.on("food", (data) => {
			this.food = data.food; // acting as state for food
		});
	}

	startRendering() {
		const fps = 60;
		const delayBetweenFramesInMs = 1000 / fps;
		setInterval(() => {
			waitingText.innerText = countdownText;
			if (countdownText <= 1) {
				waitingText.style.display = "None";
				waitingBox.style.display = "None";
				gameMap.style.display = "grid";
			}
			drawScoreBoard(Snake.player_list);
			document.getElementById("game-map").innerHTML = "";
			drawEverySnake(Snake.player_list);
			foodDraw(this.food);
		}, delayBetweenFramesInMs);
	}

	keyDownHandler(e) {
		var key = e.key || e.keyCode;
		if (key === 68 || key == "d" || key == "ArrowRight") {
			//d
			if (this.direction != "left") {
				this.direction = "right";
				socket.emit("keyDown", { dir: this.direction });
			}
		} else if (key === 83 || key == "s" || key == "ArrowDown") {
			//s
			if (this.direction != "up") {
				this.direction = "down";
				socket.emit("keyDown", { dir: this.direction });
			}
		} else if (key === 65 || key == "a" || key == "ArrowLeft") {
			//a
			if (this.direction != "right") {
				this.direction = "left";
				socket.emit("keyDown", { dir: this.direction });
			}
		} else if (key === 87 || key == "w" || key == "ArrowUp") {
			// w
			if (this.direction != "down") {
				this.direction = "up";
				socket.emit("keyDown", { dir: this.direction });
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
