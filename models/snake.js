const Collision = require("../services/GameCollision.js")

/**
 * Snake class
 * - Holds the state of a snake on the server
 * - Holds a snake's behaviour
 */
class Snake {
	// takes argument X and Y for starting coordinates seperately
	constructor(id, x, y, username, color) {
		this.socketid = id
		this.username = username //username of the player.
		this.body = [[x, y]] // creates array to represent snake, starting with 1 block at location [x,y]
		this.headLocation = this.getHeadLocation() // location of head of snake
		this.tailIndex = 0 // position of snake's tail, starting at this.body[0] which is also it's head – also used for size (by adding 1)
		this.lastTailLocation = [-1, -1] // keeps track of the last position the tail of the snake was on, for purpose of growing.
		this.tailLocation = this.body[this.body.length - 1]
		this.directionHeading = null // current direction the snake is moving.
		this.isDead = false // to update the status of the snake.
		this.snakeWon = false // to update the status of the snake.
		this.snakeColor = color // color of the snake.
		Snake.player_list[this.socketid] = this
	}
	// return x,y coordinates of the head of the snake
	getHeadLocation() {
		return this.body[0]
	}
	// returns index location in array for the tail of snake
	getTailIndex() {
		return this.tailIndex
	}
	// retuns the coordingates of the last position the tail of the snake was on
	getLastTailLocation() {
		return this.lastTailLocation
	}
	getDirectionHeading() {
		return this.directionHeading
	}
	// extends tail of snake by n
	updateTail(n) {
		const x = 0
		const y = 1
		const previousTailPosition = this.body[this.tailIndex]

		this.setLastTailLocation(previousTailPosition[x], previousTailPosition[y])
		this.tailIndex += n
	}
	setLastTailLocation(x, y) {
		this.lastTailLocation = [x, y]
	}
	setdirectionHeading(direction) {
		this.directionHeading = direction
	}
	addToBody(x, y) {
		this.body.push([x, y])
		this.updateTail(1)
	}

	move() {
		const x = 0
		const y = 1

		for (var i = this.tailIndex - 1; i >= 0; i--) {
			this.body[i + 1] = { ...this.body[i] }
		}

		if (this.directionHeading == "right") this.body[0][x] += 1
		if (this.directionHeading == "left") this.body[0][x] -= 1
		if (this.directionHeading == "down") this.body[0][y] += 1
		if (this.directionHeading == "up") this.body[0][y] -= 1
	}

	// increases length of snake by n by adding blocks to it's tail. NOT YET IMPLEMENTED NEGATIVE VALUES FOR n
	increaseLength(n) {
		for (var i = 0; i < n; i++) {
			// adds element to Snake making it longer by 1, by pushing the last position the tail of the snake was on
			this.updateTail(1)
			this.body.push(this.lastTailLocation)
		}
	}

	eat(n) {
		// player at food, so increase length of snake by n. NOT YET IMPLEMENTED NEGATIVE VALUES FOR n
		this.increaseLength(n)
	}

	die() {
		this.isDead = true
	}

	win() {
		this.snakeWon = true
	}

	/**
	 * This function is called on every tick of the game
	 * It does 2 things:
	 * - Moves the snake 1 block on every tick
	 * - Checks if it should die on every tick
	 */
	update() {
		this.move()
		if (Collision.isCollidingWithBorder(this) || Collision.isCollidingWithSnake(Snake.player_list)) {
			this.die()
		}
	}
}

module.exports = Snake
