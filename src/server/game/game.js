import Snake from './snake.js'
import {snakeUpdate} from '../../client/clientState.js'
import {snakeDraw} from '../../client/drawer.js'

let lastRender = 0 // to keep track of the lastRender.
const snake_speed = 5 // The speed of the snake. (How many times the snake is going to move per sec.)
let mySnake = null
let gameMap = null

export default class Game {
	
	constructor(){
		//players = [], declare new snake for each player but thats for multiplayer, do it later
		mySnake = new Snake(20,50)
		gameMap = document.getElementById("game-map")
		window.requestAnimationFrame(render) // to start rendering for the first time.
	}
}

	/**
	 * The function that is going to use to make the loop of the game
	 * @param Time requestAnimationFrame() passes in the time that render() is called
	 */
	function render(Time){
		window.requestAnimationFrame(render) // call the function main so it keeps running.
		const secondsSinceLastRender = (Time - lastRender)/1000 // To get how many seconds its taking between each render.
		//This is used to check if we need to move.
		if(secondsSinceLastRender<1/snake_speed){ // if the seconds since our last render is less than the time between our renders we dont need to move the snake.
			return 
		}

		lastRender = Time // last render will be the time of the non-updated time, which makes it the last render.

		update()
		draw()
		// call the function to draw the snake.
	}

	function update(){
		snakeUpdate(mySnake)
	}

	function draw(){
		snakeDraw(mySnake,gameMap)
	}