import Game from "./game.js";

const loginbtn = document.getElementById("loginbtn");
const registerbtn = document.getElementById("registerbtn");
const signinModal = document.getElementById("signinmodal");
const menuModal = document.getElementById("menuModal");
const joinGameBtn = document.getElementById("joinGameBtn");
const leaderBoardBtn = document.getElementById("leaderBoardBtn");
const gameMap = document.getElementById("game-map");
const scoreBoard = document.getElementById("scoreboard");

loginbtn.addEventListener("click", mainMenu);
registerbtn.addEventListener("click", mainMenu);
joinGameBtn.addEventListener("click", startGame);

function mainMenu() {
	signinModal.style.display = "None";
	menuModal.style.display = "block";
}

function startGame() {
	menuModal.style.display = "none";
	gameMap.style.display = "grid";
	scoreBoard.style.display = "block";
	new Game();
}

//
// export default
