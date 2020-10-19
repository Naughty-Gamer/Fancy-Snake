import { SnakePass/*snake class*/ ,growSnake/*snake class*/ } from './snake.js'
import { GridPosition()/* grid position method */ } from './grid.js'

let food = FoodRespawn()
const Respawn_Rate = 18

export function update() {
  if (SnakePass/*snake class*/(food)) {
    growSnake/*snake class*/(Respawn_RATE)
    food = FoodRespawn()
  }
}

export function draw(gameBoard) {
  const foodType = document.createElement('div')
  foodType.style.gridRowStart = food.y
  foodType.style.gridColumnStart = food.x
  foodType.classList.add('food')
  gameBoard.appendChild(foodType)
}

function FoodRespawn() {
  let newFoodLocation
  while (newFoodLocation == null || onSnake(newFoodLocation)) {
    newFoodLocation = GridPosition()/* grid position method */
  }
  return newFoodLocation
}


