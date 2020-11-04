// import { game } from "./index.js";

let canInteract = true
let direction = ""
const delay = 55
document.addEventListener("keydown", keyDownHandler);

function keyDownHandler(e) {
    var key = e.key || e.keyCode || e.key
    if(canInteract){
        if(key === 68 || e.key == "d" || e.key == "ArrowRight"){ //d
            if(direction != "left"){
                direction = "right";
                socket.emit("keyDown",{dir:direction})
                setInputDelay()  
            } 
        }else if(key === 83 || e.key == "s" || e.key == "ArrowDown"){ //s
            if(direction != "up"){
                direction = "down";
                game.socket.emit("keyDown",{dir:direction})
                setInputDelay()
            }	
        }else if(key === 65 || e.key == "a" || e.key == "ArrowLeft") { //a
            if(direction != "right"){
                direction = "left";
                game.socket.emit("keyDown",{dir:direction})
                setInputDelay()
            }	
        } else if(key === 87 || e.key == "w" || e.key == "ArrowUp"){ // w
            if(direction != "down"){
                direction = "up";
                game.socket.emit("keyDown",{dir:direction})
                setInputDelay()
            }
        }
    }
}

function setInputDelay(){
    canInteract = false
    setTimeout(()=>{
        canInteract = true
    },delay)
}
