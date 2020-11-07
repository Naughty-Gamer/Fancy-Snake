

function collidedWithBorder(snake){
    if(snake.getHeadLocation()[0]>75 || snake.getHeadLocation()[0]<1){
        return true
        
    } else if(snake.getHeadLocation()[1]>75 || snake.getHeadLocation()[1]<1){ 
        return true
    }
}


function updateFood(snakes,food){
    for (let socket_id in snakes) {
		let snake = snakes[socket_id]
        if(snake != null){
            food.foodAll.forEach(foodLocation => {
                //console.log("For Loop if FOOD FOUND")
                //console.log(x)
                if(snake.getHeadLocation()[0] == foodLocation.getFoodLocation()[0]){
                    if(snake.getHeadLocation()[1] == foodLocation.getFoodLocation()[1]){
                        // console.log("EAT")
                        snake.ateFood(1)
                        food.foodRespawn(foodLocation.getFoodLocation()[0], foodLocation.getFoodLocation()[1])
                    }
                }   
            });
        }
    }
}

function collidedWithSelf(snake){
    const x = 0
    const y = 1
    for (var bodyPartIndex = 1; bodyPartIndex < snake.getTailIndex(); bodyPartIndex++) {
        if (snake.getHeadLocation()[x] == snake.body[bodyPartIndex][x] && snake.getHeadLocation()[y] == snake.body[bodyPartIndex][y]) {
            return true
        }  
    }
    return false
}

module.exports.collidedWithSelf = collidedWithSelf
module.exports.collidedWithBorder = collidedWithBorder
module.exports.updateFood = updateFood