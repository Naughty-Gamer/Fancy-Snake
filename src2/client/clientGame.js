import {drawEverySnake} from './drawer.js'

export default class Game {

    constructor(){

        /**
         * Joins the websocket connection that the HTTP server has established.
         * More precisely, it connects the client to the "default namespace" connection.
         * - You can think of it as joining in on an on-going conference call
         */
        var socket = io()

        socket.on('CONN_ACK', msg => {
            console.log(msg)
            this.onConnect(socket)
        })
    }
    
    /**
     * Tasks to complete when the player succesfully joins the websocket connection
     * - Only runs after receiving confirmation from the server
     * @param {Socket} socket used for doing things with the connection
     */
    onConnect(socket){

        socket.on('new_pos', snakes =>{

            // Clears the map before drawing every frame
            document.getElementById("game-map").innerHTML = ''
            drawEverySnake(snakes)
        })
    }
}
