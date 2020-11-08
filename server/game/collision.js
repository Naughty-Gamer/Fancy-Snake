const x = 0;
const y = 1;

function isCollidingWithBorder(snake) {
	if (snake.getHeadLocation()[0] > 75 || snake.getHeadLocation()[0] < 1) {
		return true;
	} else if (snake.getHeadLocation()[1] > 75 || snake.getHeadLocation()[1] < 1) {
		return true;
	}
}

function collidedWithFood(snake, food, foodLocation) {
	const growth = 1;
	snake.eat(growth);
	food.respawn(foodLocation.getFoodLocation()[x], foodLocation.getFoodLocation()[y]);
}

function updateFood(snakes, food) {
	for (let socket_id in snakes) {
		let snake = snakes[socket_id];
		food.allFood.forEach((foodLocation) => {
			if (snake.getHeadLocation()[x] == foodLocation.getFoodLocation()[x]) {
				if (snake.getHeadLocation()[y] == foodLocation.getFoodLocation()[y]) {
					collidedWithFood(snake, food, foodLocation);
				}
			}
		});
	}
}

function isCollidingWithSelf(snake) {
	for (var bodyPartIndex = 1; bodyPartIndex < snake.getTailIndex(); bodyPartIndex++) {
		if (snake.getHeadLocation()[x] == snake.body[bodyPartIndex][x] && snake.getHeadLocation()[y] == snake.body[bodyPartIndex][y]) {
			return true;
		}
	}
	return false;
}

{
	function get_body(bodyPartIndex, snake) {
		return {
			x: snake.body[bodyPartIndex][x],
			y: snake.body[bodyPartIndex][y],
		};
	}

	//1,2,3,4,5
	//snake1.body[index][x]
	//snake2.body[index][x]
	function collision_with_enemies(snakes) {
		for (let socket_id in snakes) {
			let snake1 = snakes[socket_id];
			// let snake1_bodyPart = get_body(bodyPartIndex,snake1)
			for (let socket_id in snakes) {
				let snake2 = snakes[socket_id];
				for (let bodyPartIndex = 1; bodyPartIndex < snake2.tailIndex; bodyPartIndex++) {
					let snake2_bodyPart = get_body(bodyPartIndex, snake2);
					if (snake1.getHeadLocation()[x] == snake2_bodyPart.x && snake1.getHeadLocation()[y] == snake2_bodyPart.y) {
						//snake one should be deleted.
						console.log("Snake1 dead");
					}
				}
			}
		}
	}
}

module.exports.isCollidingWithSelf = isCollidingWithSelf;
module.exports.isCollidingWithBorder = isCollidingWithBorder;
module.exports.updateFood = updateFood;
module.exports.collision_with_enemies = collision_with_enemies;
