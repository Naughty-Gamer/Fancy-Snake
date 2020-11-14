const x = 0
const y = 1

function isCollidingWithBorder(snake) {
	if (snake.getHeadLocation()[0] > 75 || snake.getHeadLocation()[0] < 1) {
		return true
	} else if (snake.getHeadLocation()[1] > 75 || snake.getHeadLocation()[1] < 1) {
		return true
	}
}

function collidedWithFood(snake, food, foodLocation) {
	const growth = 1
	snake.eat(growth)
	food.respawn(
		foodLocation.getFoodLocation()[x],
		foodLocation.getFoodLocation()[y]
	)
}

function updateFood(snakes, food) {
	for (let socket_id in snakes) {
		let snake = snakes[socket_id]
		food.allFood.forEach((foodLocation) => {
			if (snake.getHeadLocation()[x] == foodLocation.getFoodLocation()[x]) {
				if (
					snake.getHeadLocation()[y] == foodLocation.getFoodLocation()[y]
				) {
					collidedWithFood(snake, food, foodLocation)
				}
			}
		})
	}
}

// function isCollidingWithSelf(snake) {
// 	for (
// 		var enemy_bodyPartIndex = 1;
// 		enemy_bodyPartIndex < snake.getTailIndex();
// 		enemy_bodyPartIndex++
// 	) {
// 		if (
// 			snake.getHeadLocation()[x] == snake.body[enemy_bodyPartIndex][x] &&
// 			snake.getHeadLocation()[y] == snake.body[enemy_bodyPartIndex][y]
// 		) {
// 			return true
// 		}
// 	}
// 	return false
// }

function get_body(bodyPartIndex, snake) {
	return {
		x: snake.body[bodyPartIndex][x],
		y: snake.body[bodyPartIndex][y],
	}
}

function isCollidingWithSnake(snakes) {
	for (let socket_id in snakes) {
		let snake = snakes[socket_id]
		// let snake_bodyPart = get_body(enemy_bodyPartIndex,snake)
		for (let socket_id in snakes) {
			let enemy = snakes[socket_id]
			for (
				let enemy_bodyPartIndex = 1;
				enemy_bodyPartIndex < enemy.tailIndex;
				enemy_bodyPartIndex++
			) {
				let enemy_bodyPart = get_body(enemy_bodyPartIndex, enemy)
				if (
					snake.getHeadLocation()[x] == enemy_bodyPart.x &&
					snake.getHeadLocation()[y] == enemy_bodyPart.y
				) {
					return true
					// snake.die()
				}
			}
		}
	}
}

// module.exports.isCollidingWithSelf = isCollidingWithSelf
module.exports.isCollidingWithBorder = isCollidingWithBorder
module.exports.updateFood = updateFood
module.exports.isCollidingWithSnake = isCollidingWithSnake
