// This directory will handle game rendering, player input and state management with the server

let lastRender = 0 // to keep track of the lastRender.
const snake_speed = 5 // The speed of the snake. (How many times the snake is going to move per sec.)


// The fucntion that is going to use to make the loop of the game. Passes the time of render
function main(Time){
    window.requestAnimationFrame(main) // call the function main so it keeps running.
    const sencondsSinceLastRender = (Time - lastRender)/1000 // To get how many seconds its taking between each render.
    //This is used to check if we need to move.
    if(sencondsSinceLastRender<1/snake_speed){ // if the seconds since our last render is less than the time between our renders we dont need to move the snake.
        return 
    }

    lastRender = Time // last render will be the time of the non-updated time, which makes it the last render.
    //console.log("Hello") // Testing
}

window.requestAnimationFrame(main) //To start the function main. For the first time.

// 16.667 mil 

// This function is going to be used to update the snakes, position, update if the snake ate the food and the collision, but it wont draw them.
function update(){

    // call the functions for update the snake.
}

//This function is going to be used to take the updated objects and then draw them on the map.
function draw(){
    // call the function to draw the sanke.
}