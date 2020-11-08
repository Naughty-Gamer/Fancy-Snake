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

function isCollidingWithSelf(snake) {
	for (
		var bodyPartIndex = 1;
		bodyPartIndex < snake.getTailIndex();
		bodyPartIndex++
	) {
		if (
			snake.getHeadLocation()[x] == snake.body[bodyPartIndex][x] &&
			snake.getHeadLocation()[y] == snake.body[bodyPartIndex][y]
		) {
			return true
		}
	}
	return false
}

module.exports.isCollidingWithSelf = isCollidingWithSelf
module.exports.isCollidingWithBorder = isCollidingWithBorder
module.exports.updateFood = updateFood
