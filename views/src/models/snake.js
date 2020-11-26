//This class holds the information sent about the snake from the server side.
export default class Snake {
	constructor(initpack) {
		this.username = initpack.username
		this.socketid = initpack.socketid
		this.body = initpack.body // creates array to represent snake, starting with 1 block at location [x,y] //,[x,y+1],[x,y+2],[x,y+3],[x,y+4],[x,y+5]
		this.headLocation = initpack.headLocation // location of head of snake
		this.tailIndex = initpack.tailIndex // position of snake's tail, starting at this.body[0] which is also it's head – also used for size (by adding 1)
		this.snakeColor = initpack.snakeColor
		Snake.player_list[this.socketid] = this
	}

	updateBody(headLocation, tailLocation) {
		this.body[0] = headLocation
		this.body[this.body.length - 1] = tailLocation
	}
}
