class Game {
	constructor(socket_list) {
		setInterval(function () {
			let snakes = []
			for (let socket_id in socket_list) {
				let socket = socket_list[socket_id]
				let snake = socket.snake
				snake.body[0][1] -= 1 //testing
				snakes.push({
					snake: snake,
				})
			}

			for (let socket_id in socket_list) {
				let socket = socket_list[socket_id]
				socket.emit("new_pos", snakes)
			}
		}, 1000)
	}
}

module.exports = Game
