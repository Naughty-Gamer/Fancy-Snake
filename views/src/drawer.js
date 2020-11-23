let gameMap = document.getElementById("game-map")

const x = 0
const y = 1

/**
 * Draws a snake on the map
 * @param {[number[]]} snake_body The body of the snake that will be drawn
 */
function snakeDraw(snake_body) {
	// console.log(snake_body);
	snake_body.forEach((part) => {
		const currentSnake = document.createElement("div") // makes a div for our snake
		currentSnake.style.gridRowStart = part[y] // creates snake at part[1]
		currentSnake.style.gridColumnStart = part[x] // creates snake at part[0]
		currentSnake.classList.add("snake") // this adds the stylings to our snake div
		gameMap.appendChild(currentSnake) // this adds a snake div as a child node
	})
}

export function drawEverySnake(snakes) {
	for (const socketid in snakes) {
		let snake_body = snakes[socketid].body
		snakeDraw(snake_body)
	}
}

/**
 * This function is going to be used to draw the updated food on the map.
 * @param foodList list of the food that will be drawn
 */
export function foodDraw(foodList) {
	foodList.forEach((food) => {
		const currentFood = document.createElement("div") // makes a div for our food
		currentFood.style.gridRowStart = food.foodLocation[y] // creates food at getFoodLocation()[1]
		currentFood.style.gridColumnStart = food.foodLocation[x] // creates food at getFoodLocation()[0]
		currentFood.classList.add("food") // this adds the stylings to our food div
		gameMap.appendChild(currentFood) // this adds a food div as a child node
	})
}

export function drawLeaderboard(data) {
	let rank = 1
	const leaderBoard = document.getElementById("Leaderboard").querySelector("table")
	for (var row = 0; row < data.length; row++) {
		// create a new row
		var newRow = leaderBoard.insertRow(leaderBoard.length)
		for (var column = 0; column < 3; column++) {
			// create a new cell
			var cell = newRow.insertCell(column)
			if (column == 0) {
				cell.innerHTML = rank++
			} else if (column == 1) {
				cell.innerHTML = data[row].username
			} else if (column == 2) {
				cell.innerHTML = data[row].wins
			}
		}
	}
}

export function drawScoreBoard(snakes) {
	let rows = []
	let scoreboard = document.getElementById("scoreboard").querySelector("table")
	// Add each row to the array
	scoreboard.innerHTML = ""
	let header = scoreboard.insertRow()
	let hRank = header.insertCell(0)
	hRank.innerHTML = "Rank"
	let hUser = header.insertCell(1)
	hUser.innerHTML = "Username"
	let hLength = header.insertCell(2)
	hLength.innerHTML = "Length"
	for (const socketid in snakes) {
		let snake = snakes[socketid]
		rows.push({
			username: snake.username,
			score: snake.tailIndex,
		})
	}

	let sortedPlayers = rows.sort((a, b) => b.score - a.score)
	sortedPlayers.forEach((player) => {
		let row = scoreboard.insertRow()
		let rank = row.insertCell(0)
		let username = row.insertCell(1)
		username.innerHTML = player.username
		let length = row.insertCell(2)
		length.innerHTML = player.score
		getScore(sortedPlayers, player.score, rank)
	})
}

function getScore(playerlist, score, rank) {
	for (let index = 0; index < playerlist.length; index++) {
		if (score == playerlist[index].score) {
			rank.innerHTML = index + 1
			return
		}
	}
}
