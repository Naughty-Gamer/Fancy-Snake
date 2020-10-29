import Queue from '../shared/utils/queue.js'

let direction = ""
let canInteract = true
let q = new Queue()
const delay = 55

  
document.addEventListener("keydown", keyDownHandler);

function keyDownHandler(e) {
    if(canInteract){
        if(e.key == "d" || e.key == "ArrowRight") {
            //ONLY WHEN DIRECTION IS NOT LEFT
            if(direction != "left"){
                direction = "right"
                setInputDelay()
            }
        }
        else if(e.key == "a" || e.key == "ArrowLeft") {
            //ONLY WHEN DIRECTION IS NOT RIGHT
            if(direction != "right"){
                direction = "left"
                setInputDelay()
            }
        }
        else if(e.key == "w" || e.key == "ArrowUp") {
            //ONLY WHEN DIRECTION IS NOT DOWN
            if(direction != "down"){
                direction = "up"
                setInputDelay()
            } 
        }
        else if(e.key == "s" || e.key == "ArrowDown") {
            //ONLY WHEN DIRECTION IS NOT UP
            if(direction != "up"){
                direction = "down"
                setInputDelay()
            }
        }
    }
}
function setInputDelay(){
    canInteract = false
    setTimeout(()=>{
        canInteract = true
    },delay)
}

function getinputDirection(){
    console.log("Input direction:",direction)
    return direction
}

/**
 * This function is going to update the snake's position
 * @param snake The snake that will be updated
 */
export function snakeUpdate(snake){
    if (getinputDirection() != "") {
        snake.move(getinputDirection())
    }
}    
