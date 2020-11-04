class Game {
	constructor(player_list, socket_list) {
		setInterval(function () {
			let snakes = []
			for (let socket_id in player_list) {
				let snake = player_list[socket_id]
				// let snake = socket.snake
				// let direction = 'up'
				snake.move(direction)
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
