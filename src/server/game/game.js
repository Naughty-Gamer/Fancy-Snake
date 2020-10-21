/**
 * We want this file to never be on the client's system, cuz it will basically be the master game simulator, only sending
 * updates to every client in the match. This file HAS to run on the server and only the server, because each client will
 * use sockets to talk to ONE dedicated server, not multiple clients (unless we're doing peer2peer, but even then theres
 * only one server)
 * */

import Snake from './snake.js'
import MakeAllFood from './food.js'
import {snakeUpdate} from '../../client/input.js'
import {snakeDraw,foodDraw} from '../../client/drawer.js'
import {collision_border} from '../game/collision.js'
import {collision_food} from '../game/collision.js'

let mySnake = null
let gameMap = null
let myFood = null
export default class Game {
	
	constructor(){
		//players = [], declare new snake for each player but thats for multiplayer, do it later
		mySnake = new Snake(20,50)
		mySnake.addToBody(19,50);
		mySnake.addToBody(18,50);
		mySnake.addToBody(17,50);
		mySnake.addToBody(16,50);
		mySnake.addToBody(15,50);
		mySnake.addToBody(14,50);
		mySnake.addToBody(13,50);
		mySnake.addToBody(12,50);
		mySnake.addToBody(11,50);
		mySnake.addToBody(10,50);
		// mySnake.addToBody(9,50);
		// mySnake.addToBody(8,50);
		// mySnake.addToBody(7,50);
		// mySnake.addToBody(6,50);
		// mySnake.addToBody(5,50);
		// mySnake.addToBody(4,50);
		// mySnake.addToBody(3,50);
		// mySnake.addToBody(2,50);
		// mySnake.addToBody(1,50);
		// mySnake.addToBody(0,50);
		myFood = new MakeAllFood(75,75,0.5)
		gameMap = document.getElementById("game-map")
    
		/**
		 * Tells the browser that we want to animate something on the screen before
		 * the next repaint (normally 60 repaints per second), so the browser stalls
		 * the next repaint and calls `clientGameLoop` before it repaints the screen again
		 * 
		 * Passes a DOMHighResTimeStamp into `clientGameLoop`
		 */
		window.requestAnimationFrame(clientGameLoop)
	}
}

let timeSincelastRender = 0 // variable to keep track of the time since the last render, initially 0

// rename to fps?
const snake_speed = 15 // How many times the snake moves per second; it's just the FPS cuz the snake moves once per frame

 /**
  * Updates the game and animates it before every repaint of the screen
  * @param {DOMHighResTimeStamp} timeSinceOrigin the current time in ms since "time origin", which is the beginning of the current page's lifetime
  */
function clientGameLoop(timeSinceOrigin) {

	/**
	 * Calling requestAnimationFrame() again so we can animate another frame before the next repaint
	 * 
	 * Since this function is asynchronous, I THINK when it is called, it doesn't execute until the previous
	 * clientGameLoop() is done executing, after which, it does execute, calling requestAnimationFrame() asynchronously
	 * again etc
	 * 
	 * Each loop (or game loop) happens before every repaint of the screen...so usually 60 times a second
	 */
	window.requestAnimationFrame(clientGameLoop)
	
	const secondsSinceLastRender = (Math.round(timeSinceOrigin - timeSincelastRender))/1000 // To get how many seconds its taking between each render.
	const minimumTimeToRender = Math.round(( 1/snake_speed )*1000)/1000

	console.log("")
	console.log("Time since last render:",timeSinceOrigin - timeSincelastRender,"ms")
	console.log("That time in seconds:",secondsSinceLastRender,"sec")
	console.log("Minimum time allowed to render:",minimumTimeToRender,"sec")
	console.log("FPS:",Math.round(1000/(timeSinceOrigin - timeSincelastRender)))

	if(secondsSinceLastRender < minimumTimeToRender){ // Returns out of the function if the time between each render is too short
		/**
		 * Returning inside the game loop without updating or drawing means a frame that is 1/60th of a second long
		 * is spent doing nothing (approx. 16.66667 ms)
		 * 
		 * `timeSinceLastRender` is also never updated, so the new `secondsSinceLastRender` is 1/60th of a second longer
		 */
		return 
	}
	
	console.log("Time since last render when we are updating and drawing:",timeSinceOrigin - timeSincelastRender,"ms")
	console.log("Game FPS:",Math.round(1000/(timeSinceOrigin - timeSincelastRender)))
	console.log("")
	
	/**
	 * `timeSincelastRender` gets the new `timeSinceOrigin` to calculate the time between each render.
	 * Only gets updated if the time between each render is >= the minimum time allowed to render
	 */
	timeSincelastRender = timeSinceOrigin
	
	update()
	draw()
	// call the function to draw the snake
}

function update(){
	snakeUpdate(mySnake)
	mySnake.die()
  collision_border(mySnake)
	collision_food(mySnake,myFood)
}

function draw(){
	gameMap.innerHTML = ''
	snakeDraw(mySnake,gameMap)
	foodDraw(myFood,gameMap)

}
