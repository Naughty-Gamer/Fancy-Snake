import {snakeUpdate} from './input.js'
import {snakeDraw,foodDraw} from './drawer.js'

let timeSincelastRender = 0 // variable to keep track of the time since the last render, initially 0

// rename to fps?
const snake_speed = 30 // How many times the snake moves per second; it's just the FPS cuz the snake moves once per frame

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
	
	const secondsSinceLastRender = Math.round(timeSinceOrigin - timeSincelastRender)/1000 // To get how many seconds its taking between each render.
	const minimumTimeToRender = 1/snake_speed

	console.log("")
	console.log("Time since last render:",timeSinceOrigin - timeSincelastRender,"ms")
	console.log("That time in seconds:",secondsSinceLastRender,"sec")
	console.log("FPS:",Math.round(1000/(timeSinceOrigin - timeSincelastRender)))
	
	if(secondsSinceLastRender < minimumTimeToRender){
		/**
		 * Returning inside the game loop without updating or drawing means a frame that is 1/60th of a second long
		 * is spent doing nothing (approx. 16.66667 ms)
		 * 
		 * `timeSinceLastRender` is also never updated, so the new `secondsSinceLastRender` is 1/60th of a second longer
		 */
		return 
	}
	
	console.log("Time since last render when we are updating and drawing:",timeSinceOrigin - timeSincelastRender,"ms")
	console.log("FPS:",Math.round(1000/(timeSinceOrigin - timeSincelastRender)))
	console.log("")
	
	/**
	 * `timeSincelastRender` gets the new `timeSinceOrigin` to calculate the time between each render
	 * Only gets updated if the time between each render is >= the minimum time to render
	 */
	timeSincelastRender = timeSinceOrigin
	
	update()
	draw()
	// call the function to draw the snake
}

function update(){
	snakeUpdate(mySnake)
	// hasFoodBeenFound()
}

function draw(){
	snakeDraw(mySnake,gameMap)
	foodDraw(myFood,gameMap)

}