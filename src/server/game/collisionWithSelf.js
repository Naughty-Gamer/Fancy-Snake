
export function collidedWithSelf(snake){
    const x = 0
    const y = 1
    for (var bodyPartIndex = 1; bodyPartIndex < snake.getTailIndex(); bodyPartIndex++) {
        if (snake.getHeadLocation()[x] == snake.body[bodyPartIndex][x] && snake.getHeadLocation()[y] == snake.body[bodyPartIndex][y]) {
            return true
        }  
    }
    return false
}