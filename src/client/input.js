
        
let direction = ""     
  
document.addEventListener("keydown", keyDownHandler);

function keyDownHandler(e) {
    if(e.key == "d" || e.key == "ArrowRight") {
        if(direction == "left"){
            direction = direction
        }else{
            direction = "right";
        }
       
    }
    else if(e.key == "a" || e.key == "ArrowLeft") {
        if(direction == "right"){
            direction = direction
        }else{
            direction = "left";
        }
    }
    else if(e.key == "w" || e.key == "ArrowUp") {
        if(direction == "down"){
            direction  = direction
        }else{
            direction = "up";
        }  
    }
    else if(e.key == "s" || e.key == "ArrowDown") {
        if(direction == "up"){
            direction = direction
        }else{
            direction = "down";
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
    snake.move(getinputDirection())
}    
