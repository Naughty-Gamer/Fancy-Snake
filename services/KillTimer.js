let timeWithDelay = 33
let secondsUntilDeath = timeWithDelay // Delay it 3 seconds because it starts immediatly after player >= max_players (Change it after finishing testing)
// let timeInSeconds = 7

function startKillTimer(sockets, snakes) {
	secondsUntilDeath = 33
	let killTimerID = setInterval(() => {
		// timeInSeconds--
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
				// console.log(snakes[smallestPlayer.id], "got killed by the timer");
			}
			secondsUntilDeath = timeWithDelay - 3 //change it to 60 after finishing testing.
		}
	}, 1000)

	return killTimerID
}

module.exports.startKillTimer = startKillTimer

//Client side: when the countdown == 0, we will start drawing a clock or a timer.
//Server side: when the countdown == 0, start the timerKill function.
/**
 * server: 29,30
 * client:27,28
 *
 * {
 * v32dv328d873d32d: snake
 *
 *
 *
 *
 * }
 */
