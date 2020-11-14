const Collision = require("../services/GameCollision.js")

class Snake {
	// takes argument X and Y for starting coordinates seperately
	constructor(id, x, y) {
		this.socketid = id
		this.body = [[x, y]] // creates array to represent snake, starting with 1 block at location [x,y] //,[x,y+1],[x,y+2],[x,y+3],[x,y+4],[x,y+5]
		this.headLocation = this.getHeadLocation() // location of head of snake
		this.tailIndex = 0 // position of snake's tail, starting at this.body[0] which is also it's head – also used for size (by adding 1)
		this.lastTailLocation = [-1, -1] // keeps track of the last position the tail of the snake was on, for purpose of growing.
		this.tailLocation = this.body[this.body.length - 1]
		this.directionHeading = null // current direction the snake is moving. (CURRENTLY NULL???)
		this.isDead = false
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

		// console.log(this.body)

		// for (var i = 0; i < this.body.length; i++) {
		// 	console.log(this.body[i])
		// }

		// console.log("update tail:")
		// console.log(n)
		// console.log(" UP PART")
		// console.log(this.tailIndex)
		// console.log(this.body[this.tailIndex][y])
		// console.log(this.body[this.tailIndex][x])
		this.setLastTailLocation(previousTailPosition[x], previousTailPosition[y])

		this.tailIndex += n

		// this.tailLocation = this.lastTailLocation
		// console.log("Tail extended by",n)
		// console.log("New tail location:",this.body[this.tailIndex])
	}
	setLastTailLocation(x, y) {
		// console.log("Last tail location was [",x,",",y,"]")
		this.lastTailLocation = [x, y]
	}
	setdirectionHeading(direction) {
		this.directionHeading = direction
	}
	addToBody(x, y) {
		this.body.push([x, y])
		this.updateTail(1)

		// console.log("Now the snake is",this.body.length,"parts long")
	}

	move() {
		const x = 0
		const y = 1
		// console.log("Now moving...")
		// console.log("Tail position:",this.tailIndex,"parts from head")
		// console.log(this.tailIndex)

		// this.setLastTailLocation(this.body[this.tailIndex-1][x], this.body[this.tailIndex-1][y]) // Doesn't do anything -- ask Luke

		for (var i = this.tailIndex - 1; i >= 0; i--) {
			// from tail, to 1 (not 0 or head)
			//console.log("Inside for loop");
			//console.log(i);
			this.body[i + 1] = { ...this.body[i] }
		}

		if (this.directionHeading == "right") this.body[0][x] += 1
		if (this.directionHeading == "left") this.body[0][x] -= 1
		if (this.directionHeading == "down") this.body[0][y] += 1
		if (this.directionHeading == "up") this.body[0][y] -= 1
		// this.setdirectionHeading(direction)
		// console.log("Snake's head is at",this.body[0])
		console.log(this.socketid + "'s tail is at", this.tailLocation)
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
		console.log(this.socketid, "ate food")
		// player at food, so increase length of snake by n. NOT YET IMPLEMENTED NEGATIVE VALUES FOR n
		this.increaseLength(n)
	}

	die() {
		this.isDead = true
		console.log(this.socketid, "is dead")
	}

	update() {
		this.move() // We will have to move it somewhere outside, because we dont have to put in a loop because its not checking anything. It only changes the values of x and y. (move it to onKeyPress)
		if (
			Collision.isCollidingWithBorder(this) ||
			Collision.isCollidingWithSnake(Snake.player_list)
		) {
			this.die()
		}
	}
}

module.exports = Snake
