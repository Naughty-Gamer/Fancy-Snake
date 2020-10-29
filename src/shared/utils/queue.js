export default class Queue {

    constructor(){
        this.front = 0
        this.rear = 0
        this.Q = []
    }

    size(){
        return this.Q.length - this.front + this.rear
    }
    
    isEmpty(){
        return this.front == this.rear
    }

    front(){
        return this.Q[this.front]
    }

    dequeue(){
        let tmp = this.Q[this.front]
        this.Q[this.front] = null
        this.front = this.front+1
        return tmp
    }
    
    enqueue(e) {
        this.Q[this.rear] = e
        this.rear = this.rear+1
    }
}
