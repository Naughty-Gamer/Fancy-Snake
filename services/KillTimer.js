const MAX_SECONDS = 7; // Delay it 2 or 3 seconds because it starts immediatly after player >= max_players

let secondsUntilDeath = MAX_SECONDS;
let timeInSeconds = 0;

function startKillTimer(snakes) {
	let killTimerID = setInterval(() => {
		timeInSeconds++;
		secondsUntilDeath--;
		let snakeSizes = {};
		let snakeSizesArray = [];

		for (const socketid in snakes) {
			let snake = snakes[socketid];
			snakeSizes[socketid] = snake.tailIndex;
			snakeSizesArray.push({
				id: socketid,
				length: snake.tailIndex,
			});
		}
		let sortedSnakeSizesArray = snakeSizesArray.sort((a, b) => b.length - a.length);
		console.log(sortedSnakeSizesArray, "\n");
		let smallestPlayer = sortedSnakeSizesArray[sortedSnakeSizesArray.length - 1];

		if (secondsUntilDeath == 0) {
			if (Object.keys(snakes).length !== 1) {
				// kills the smallest snake
				// snakes[smallestPlayer.id].die();
				// console.log(snakes[smallestPlayer.id], "got killed by the timer");
			}
			secondsUntilDeath = 5;
		}
	}, 1000);

	return killTimerID;
}

module.exports.startKillTimer = startKillTimer;

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
