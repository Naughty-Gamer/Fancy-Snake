
import Snake from './snake.js'

const mySnake = new Snake(20,50);
mySnake.addToBody(19,50);
mySnake.addToBody(18,50);



export function update1(){
    mySnake.move('up')
}
export function update2(){
    mySnake.move('left')
}

export function draw(gameMap){
    const x = 0
    const y = 1
   
    mySnake.body.forEach(part => {
        const currentSnake = document.createElement('div'); // makes a div for our snake
        currentSnake.style.gridRowStart = part[y]; // creates snake at x = part[0]
        currentSnake.style.gridColumnStart = part[x]; // creates snake at y = part[1]
        currentSnake.classList.add('snake'); // this adds the stylings to our snake div
        gameMap.appendChild(currentSnake); // this adds a snake div as a child node
    })
}

