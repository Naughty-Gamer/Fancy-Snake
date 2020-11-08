let gameMap = document.getElementById("game-map")

const x = 0
const y = 1

/**
 * Draws a snake on the map
 * @param {[BigInteger[]]} snake_body The body of the snake that will be drawn
 */
function snakeDraw(snake_body) {
	snake_body.forEach((part) => {
		const currentSnake = document.createElement("div") // makes a div for our snake
		currentSnake.style.gridRowStart = part[y] // creates snake at part[1]
		currentSnake.style.gridColumnStart = part[x] // creates snake at part[0]
		currentSnake.classList.add("snake") // this adds the stylings to our snake div
		gameMap.appendChild(currentSnake) // this adds a snake div as a child node
	})
}

/**
 * Draws every snake on the map
 * @param {JSON[]} snakes List of snakes that will be drawn
 */
export function drawEverySnake(snakes) {
	snakes.forEach((snake) => {
		let snake_body = snake["snake"].body
		snakeDraw(snake_body)
	})
}

/**
 * This function is going to be used to draw the updated food on the map.
 * @param food The food that will be drawn
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
