


export function collision_border(snake){
    if(snake.getHeadLocation()[0]>75 || snake.getHeadLocation()[0]<1){
        window.location.reload();
        return alert("You Die")
        
    } else if(snake.getHeadLocation()[1]>75 || snake.getHeadLocation()[1]<1){
        window.location.reload();   
        return alert("You Die")
    }
}



export function collision_food(snake,food){
    //let x = 0
    food.foodAll.forEach(foodLocation => {
        //console.log("For Loop if FOOD FOUND")
        //console.log(x)
        if(snake.getHeadLocation()[0] == foodLocation.getFoodLocation()[0]){
            if(snake.getHeadLocation()[1] == foodLocation.getFoodLocation()[1]){
                console.log("EAT")
                snake.ateFood(1)
                food.foodRespawn(foodLocation.getFoodLocation()[0], foodLocation.getFoodLocation()[1])
            }
        }
        //x++;
    });
}
