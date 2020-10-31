/**
 * This file should send the server updates regarding it's state, eg:
 * - The player's snake position
 * - Whether it has collided
 * - Whether it has eaten
 * - If it's alive
 * etc...
 */
import {drawEverySnake} from './drawer.js'

export default class Game {

    constructor(){

        /**
         * Joins the websocket connection that the HTTP server has established.
         * More precisely, it connects the client to the "default namespace" connection.
         * - You can think of it as joining in on an on-going conference call
         * - Returned `Socket` object assigned to `socket` so that we may do things with/to the connection
         */
        var socket = io()

        socket.on('CONN_ACK', msg => {
            console.log(msg)
            this.onConnect(socket)
        })
        
    }
    
    onConnect(socket){

        socket.on('new_pos', snakes =>{
            document.getElementById("game-map").innerHTML = ''
            drawEverySnake(snakes)
        })
    }
}
