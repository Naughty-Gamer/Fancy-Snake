import {mySnake} from '../server/game/game.js'

let direction = ""

let keyDownHandler = function(e) {

    const updatePromise = new Promise(listen => {
        snakeUpdate(mySnake)
        listen()
    })
    
    window.removeEventListener('keydown', keyDownHandler, false)
    
    changeDirection(e)
    
    updatePromise.then(_ => {
        window.addEventListener("keydown", keyDownHandler, false)
    })
}

window.addEventListener("keydown", keyDownHandler, false)

function changeDirection(e){

    if(e.key == "d" || e.key == "ArrowRight") {
        //ONLY WHEN DIRECTION IS NOT LEFT
        if(direction != "left"){
            direction = "right"
        }
    }
    else if(e.key == "a" || e.key == "ArrowLeft") {
        //ONLY WHEN DIRECTION IS NOT RIGHT
        if(direction != "right"){
            direction = "left"
        }
    }
    else if(e.key == "w" || e.key == "ArrowUp") {
        //ONLY WHEN DIRECTION IS NOT DOWN
        if(direction != "down"){
            direction = "up"
        } 
    }
    else if(e.key == "s" || e.key == "ArrowDown") {
        //ONLY WHEN DIRECTION IS NOT UP
        if(direction != "up"){
            direction = "down"
        }
    }
}

/**
 * This function is going to update the snake's position
 * @param snake The snake that will be updated
 */
export function snakeUpdate(snake){
    if (direction != "") {
        snake.move(direction)
    }
}    
