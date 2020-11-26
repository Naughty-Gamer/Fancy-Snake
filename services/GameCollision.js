const x = 0
const y = 1

/**
 * Checks the location of the snakes head against the location of the walls of the game.
 * @param {Snake} snake the snake whose head is being checked
 * @returns {boolean} returns `true` if the snake is colliding with the border
 */
function isCollidingWithBorder(snake) {
	if (snake.getHeadLocation()[0] > 75 || snake.getHeadLocation()[0] < 1) {
		return true
	} else if (snake.getHeadLocation()[1] > 75 || snake.getHeadLocation()[1] < 1) {
		return true
	}
}

/**
 * Checks if any of the snake's head locations overlaps with any of the
 * food locations. If true, grows the snake by 1 block and respawns the
 * eaten food in a random location.
 * @param {Object Literal} snakes all the snakes in the game
 * @param {Array} food The array that hold all of the food.
 */
function updateFood(snakes, food) {
	for (let socket_id in snakes) {
		let snake = snakes[socket_id]
		food.allFood.forEach((foodLocation) => {
			if (snake.getHeadLocation()[x] == foodLocation.getFoodLocation()[x]) {
				if (snake.getHeadLocation()[y] == foodLocation.getFoodLocation()[y]) {
					const growth = 1
					snake.eat(growth)
					food.respawn(foodLocation.getFoodLocation()[x], foodLocation.getFoodLocation()[y])
				}
			}
		})
	}
}

/**
 * Used to get the body of the snake.
 * @param {number} bodyPartIndex the index of the snake's body array
 * @param {Object} snake a snake in the game
 * @returns {Object Literal} the location of a snake's body part
 */
function get_body(bodyPartIndex, snake) {
	return {
		x: snake.body[bodyPartIndex][x],
		y: snake.body[bodyPartIndex][y],
	}
}

/**
 * Checks if any snake has collided with any snake in the game.
 * @param {Object Literal} snakes all the snakes in the game
 */
function isCollidingWithSnake(snakes) {
	for (let socket_id in snakes) {
		let snake = snakes[socket_id]
		for (let socket_id in snakes) {
			let enemy = snakes[socket_id]
			for (let enemy_bodyPartIndex = 1; enemy_bodyPartIndex < enemy.tailIndex; enemy_bodyPartIndex++) {
				let enemy_bodyPart = get_body(enemy_bodyPartIndex, enemy)
				if (snake.getHeadLocation()[x] == enemy_bodyPart.x && snake.getHeadLocation()[y] == enemy_bodyPart.y) {
					return true
				}
			}
		}
	}
}

module.exports.isCollidingWithBorder = isCollidingWithBorder
module.exports.updateFood = updateFood
module.exports.isCollidingWithSnake = isCollidingWithSnake
