let timeWithDelay = 93
let secondsUntilDeath = timeWithDelay

/**
 * Checks the length of all of the players and when the timer ends kills the smallest one.
 * @param {not sure} sockets used to emit the timer to the client side.
 * @param {Object} snakes gets the length of all of the snakes in the game.
 */
function startKillTimer(sockets, snakes) {
	secondsUntilDeath = 93
	let killTimerID = setInterval(() => {
		secondsUntilDeath--
		for (const socketid in sockets) {
			let socket = sockets[socketid]
			socket.emit("timetilldead", { seconds: secondsUntilDeath })
		}
		let snakeSizes = {}
		let snakeSizesArray = []

		for (const socketid in snakes) {
			let snake = snakes[socketid]
			snakeSizes[socketid] = snake.tailIndex
			snakeSizesArray.push({
				id: socketid,
				length: snake.tailIndex,
			})
		}
		let sortedSnakeSizesArray = snakeSizesArray.sort((a, b) => b.length - a.length)
		console.log(sortedSnakeSizesArray, "\n")
		let smallestPlayer = sortedSnakeSizesArray[sortedSnakeSizesArray.length - 1]

		if (secondsUntilDeath == 0) {
			if (Object.keys(snakes).length > 1) {
				// kills the smallest snake
				snakes[smallestPlayer.id].die()
			}
			secondsUntilDeath = timeWithDelay - 3
		}
	}, 1000)

	return killTimerID
}

module.exports.startKillTimer = startKillTimer
