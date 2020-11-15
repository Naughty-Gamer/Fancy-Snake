import Game from "./game.js";

const loginbtn = document.getElementById("loginbtn");
const registerbtn = document.getElementById("registerbtn");
const signinModal = document.getElementById("signinmodal");
const menuModal = document.getElementById("menuModal");
const joinGameBtn = document.getElementById("joinGameBtn");
const leaderBoardBtn = document.getElementById("leaderBoardBtn");
const gameMap = document.getElementById("game-map");
const scoreBoard = document.getElementById("scoreboard");
const waitingBox = document.getElementById("waiting-box");
const waitingText = document.getElementById("waiting-text");

loginbtn.addEventListener("click", mainMenu);
registerbtn.addEventListener("click", mainMenu);
joinGameBtn.addEventListener("click", tryJoiningGame);

function mainMenu() {
	signinModal.style.display = "None";
	menuModal.style.display = "block";
}

function tryJoiningGame() {
	menuModal.style.display = "none";
	waitingBox.style.display = "flex";
	// gameMap.style.display = "grid";
	scoreBoard.style.display = "block";
	new Game(); // this is the thing that makes them join the socket_list (shows 37eb8237e3AAAA connected)
}

/**
 * on server: when numPlayers == MAX_PLAYERS, emit("countdown")
 * on client: on("countdown",() => startCountdown())
 *
 * function startCountdown(){
 * 		- does a countdown using js and css
 * 		- waitingBox.style.display = "None";
 * 		- emit("startgame")
 * }
 *
 * on server: on("startgame",() => )
 */

//
// export default
