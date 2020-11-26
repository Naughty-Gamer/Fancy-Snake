const x = 0
const y = 1

/**
 * Calcualtes the position of the snakes head with the border of the game.
 * @param {Object} snake GEt the needed information from snake.
 */
function isCollidingWithBorder(snake) {
	if (snake.getHeadLocation()[0] > 75 || snake.getHeadLocation()[0] < 1) {
		return true
	} else if (snake.getHeadLocation()[1] > 75 || snake.getHeadLocation()[1] < 1) {
		return true
	}
}

/**
 * Used to check if the player collided with the food, so he could increase in length.
 * @param {Object} snake position of the snakes head.
 * @param {Array} food The array that hold all of the food.
 *  * @param {Object} foodLocation The x-axis and y-axis of the food.
 */
function collidedWithFood(snake, food, foodLocation) {
	const growth = 1
	snake.eat(growth)
	food.respawn(foodLocation.getFoodLocation()[x], foodLocation.getFoodLocation()[y])
}

/**
 * Respawn the food position after getting eaten by a player.
 * @param {Object} snakes position of the snake's head.
 * @param {Array} food The array that hold all of the food.
 */
function updateFood(snakes, food) {
	for (let socket_id in snakes) {
		let snake = snakes[socket_id]
		food.allFood.forEach((foodLocation) => {
			if (snake.getHeadLocation()[x] == foodLocation.getFoodLocation()[x]) {
				if (snake.getHeadLocation()[y] == foodLocation.getFoodLocation()[y]) {
					collidedWithFood(snake, food, foodLocation)
				}
			}
		})
	}
}

/**
 * Used to get the body of the snake.
 * @param {int} bodyPartIndex number to go through the snake
 * @param {Object} snake snake in the game.
 */
function get_body(bodyPartIndex, snake) {
	return {
		x: snake.body[bodyPartIndex][x],
		y: snake.body[bodyPartIndex][y],
	}
}

/**
 * Checks if players collided with each other or not.
 * @param {Object} snakes position of the snakes in the game.
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
