import Queue from '../shared/utils/queue.js'

let direction = ""
let canInteract = true
let q = new Queue()
const delay = 65

  
document.addEventListener("keydown", keyDownHandler);

function keyDownHandler(e) {
    if(canInteract){
        if(e.key == "d" || e.key == "ArrowRight") {
            //ONLY WHEN DIRECTION IS NOT LEFT
            if(direction != "left"){
                direction = "right"
                setDelay()
            }
        }
        else if(e.key == "a" || e.key == "ArrowLeft") {
            //ONLY WHEN DIRECTION IS NOT RIGHT
            if(direction != "right"){
                direction = "left"
                setDelay()
            }
        }
        else if(e.key == "w" || e.key == "ArrowUp") {
            //ONLY WHEN DIRECTION IS NOT DOWN
            if(direction != "down"){
                direction = "up"
                setDelay()
            } 
        }
        else if(e.key == "s" || e.key == "ArrowDown") {
            //ONLY WHEN DIRECTION IS NOT UP
            if(direction != "up"){
                direction = "down"
                setDelay()
            }
        }
    }
}
function setDelay(){
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
        // setTimeout(()=>{
        //     if (!q.isEmpty()) {
        //         q.dequeue()
        //     }
        // },1000)
        // q.enqueue(snake.move(getinputDirection()))
    }
}    
