
/**
 * This function is going to be used to take the updated objects and then draw them on the map.
 * @param snake The snake that will be drawn
 * @param gameMap The map element that the snake will be drawn in
 */
export function snakeDraw(snake,gameMap){
    const x = 0
    const y = 1

    gameMap.innerHTML = ''
    snake.body.forEach(part => {
        const currentSnake = document.createElement('div'); // makes a div for our snake
        currentSnake.style.gridRowStart = part[y]; // creates snake at x = part[0]
        currentSnake.style.gridColumnStart = part[x]; // creates snake at y = part[1]
        currentSnake.classList.add('snake'); // this adds the stylings to our snake div
        gameMap.appendChild(currentSnake); // this adds a snake div as a child node
    })
}

