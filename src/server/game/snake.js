/* class SnakeLinkedList {

    // body part is the Node, the snake is a linked list made of many bodyparts (nodes)
    class BodyPart {
        fields:
            X,Y location // the current block location of this bodypart
            BodyPart nextPart // the next bodypart in the snake

        constructor: Argument = X,Y location
            location = X,Y
            nextPart = null
        
        methods:
            getLocation returns location
            setLocation returns void, takes X,Y
            getNextPart returns BodyPart
            setNextPart returns void, takes BodyPart
    }

    fields:
        int size
        BodyPart head
    
    constructor: Argument = X,Y location
        size = 1 // snake starts with 1 block
        head = new BodyPart(X,Y) // the head block will be a new bodypart at a given location


    methods:
        getSize returns int
        incrementSize returns void, takes int // addition of the size by given Int value
        addBodyPart returns void // Goes through each body part starting at head until nextPart = null, then creates new part here, and updates nextPart
        die returns void // kill snake, sets location of all body parts to -1,-1 and head to null


} */

/* class BodyPart {
    constructor(x, y) {
        this.location = [x,y];
        this.nextPart = null;
    }

    getLocation () {
        return this.location;
    }
    setLocation (x, y) {
        this.location = [x,y];
    }
    getNextPart() {
        return this.nextPart;
    }
    setNextPart(n) {
        this.nextPart = n;
    }
}

class Snake {
    constructor(x, y) {
        this.size = 1;
        this.headPart = null;
        this.tailPart = null;
    }

    addBodyPart(x, y) {
        var part = new BodyPart(x, y); // make a new part to add to the snake
        if (this.headPart === null) {

        }

        var currentPart = this.headPart; // keep track of the current part we are looking at, starting at headPart
        while (currentPart.nextPart !== null) { // while the next part in the snake is not null (while we're not at the tail)
            currnetPart = currentPart.nextPart; // move current to the next part
        }
        
    }
} */

// ABOVE IS LINKED LIST VERSION, NOW NOT IN USE ANYMORE, BOTTOM IS DYNAMIC ARRAY VERSION

export default class Snake {
    constructor(x, y) { // takes argument X and Y for starting coordinates seperately
        this.body = [[x,y]]; // creates array to represent snake, starting with 1 block at location [x,y] //,[x,y+1],[x,y+2],[x,y+3],[x,y+4],[x,y+5]
        this.headLocation = this.getHeadLocation; // location of head of snake
        this.tailIndex = 0; // index for tail of snake, also used for size (by adding 1)
        this.lastTailLocation = [-1,-1]; // keeps track of the last position the tail of the snake was on, for purpose of growing.
        this.directionHeading = null; // current direction the snake is moving. (CURRENTLY NULL???)
    }
    getHeadLocation() { // return x,y coordinates of the head of the snake
        return this.body[0];
    }
    getTailIndex() { // returns index location in array for the tail of snake
        return this.tailIndex;
    }
    getLastTailLocation() { // retuns the coordingates of the last position the tail of the snake was on
        return this.lastTailLocation;
    }
    getDirectionHeading() {
        return this.directionHeading;
    }
    updateTail(n) { // extends tail of snake by n
        const x = 0
        const y = 1
        for (var i = 0; i < this.body.length; i++) {
            console.log(this.body[i])
        }
        console.log("update tail:")
        console.log(n)
        console.log(" ")
        this.setLastTailLocation(this.body[this.tailIndex][x], this.body[this.tailIndex][y]);
        this.tailIndex += n;
    }
    setLastTailLocation(x, y) {
        console.log("update last location")
        console.log(" ")
        this.lastTailLocation = [x,y];
    }
    setdirectionHeading(direction) {
        this.directionHeading = direction;
    }
    addToBody(x, y) {
        console.log("Add to body");
        console.log(" ");
        this.body.push([x,y]);
        this.updateTail(1);
    }

    move(direction) {
        const x = 0
        const y = 1
        console.log("Move")
        console.log(this.tailIndex)
        this.setLastTailLocation(this.body[this.tailIndex][x], this.body[this.tailIndex][y])

        for (var i = this.tailIndex - 1; i >= 0; i--) { // from tail, to 1 (not 0 or head)
            //console.log("Inside for loop");
            //console.log(i);
            this.body[i+1] = {...this.body[i]};
        }
        if (direction == "up" && this.directionHeading == "down") {
            console.log("OPPOSITE DIRECTIONS")
        } // WHY DOES THIS NEVER PASS???????????????????

        switch (direction) {
            case "up" || 'w':
                this.body[0][y] -= 1
                console.log("Moving UP")
                break;
            case "down" || 's':
                this.body[0][y] += 1
                console.log("Moving DOWN")
                break;
            case "left" || 'a':
                this.body[0][x] -= 1
                console.log("Moving LEFT")
                break;
            case "right" || 'd':
                this.body[0][x] += 1
                console.log("Moving RIGHT")
                break;
        }
        this.setdirectionHeading(direction);
        console.log(this.body[0])
        console.log(this.directionHeading)
    }

    increaseLength(n) { // increases length of snake by n by adding blocks to it's tail. NOT YET IMPLEMENTED NEGATIVE VALUES FOR n
        for (var i = 0; i < n; i++) {
            // adds element to Snake making it longer by 1, by pushing the last position the tail of the snake was on
            this.body.push(this.body.lastTailLocation);
            this.updateTail(1);
        }
    }
    ateFood(n) { // player at food, so increase length of snake by n. NOT YET IMPLEMENTED NEGATIVE VALUES FOR n
        this.increaseLength(n);
    }
}






































