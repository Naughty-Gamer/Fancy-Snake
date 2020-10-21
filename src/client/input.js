

let direction = ""
let val = true
  
document.addEventListener("keydown", keyDownHandler);

function keyDownHandler(e) {
    const delay = 60
    if(val){
        if(e.key == "d" || e.key == "ArrowRight") {
            //ONLY WHEN DIRECTION IS NOT LEFT
            if(direction != "left"){
                direction = "right"
                val = false
                setTimeout(()=>{
                    val = true
                },delay)
            }
        }
        else if(e.key == "a" || e.key == "ArrowLeft") {
            //ONLY WHEN DIRECTION IS NOT RIGHT
            if(direction != "right"){
                direction = "left"
                val = false
                setTimeout(()=>{
                    val = true
                },delay)
            }
        }
        else if(e.key == "w" || e.key == "ArrowUp") {
            //ONLY WHEN DIRECTION IS NOT DOWN
            if(direction != "down"){
                direction = "up"
                val = false
                setTimeout(()=>{
                    val = true
                },delay)
            } 
        }
        else if(e.key == "s" || e.key == "ArrowDown") {
            //ONLY WHEN DIRECTION IS NOT UP
            if(direction != "up"){
                direction = "down"
                val = false
                setTimeout(()=>{
                    val = true
                },delay)
            }
        }
    }
}

function getinputDirection(){
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
