// This directory will contain the meat of the game...  get it, snakes are made of meat
import Snake from './snake.js'


export default class Game {
    constructor(){
        const mySnake = new Snake(20,50);

    }

    update(){

    }

	tick() {
		var now = Date.now();
		var dt = now - this.d0;
		this.d0 = now;
		return dt;
	}
}
// EXPORT



// idk what this does tbh
// i just copied from that export function draw picture you sent
