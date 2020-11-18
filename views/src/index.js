import Game from "./game.js"

const loginbtn = document.getElementById("loginbtn")
const registerbtn = document.getElementById("registerbtn")
const signinModal = document.getElementById("signin-modal")
const menuModal = document.getElementById("menuModal")
const joinGameBtn = document.getElementById("joinGameBtn")
const leaderBoardBtn = document.getElementById("leaderBoardBtn")
const gameMap = document.getElementById("game-map")
const scoreBoard = document.getElementById("scoreboard")
const waitingBox = document.getElementById("waiting-box")
const container = document.getElementById("container")
const back2menuBtn = document.getElementById("back2menuBtn")
const waitingText = document.getElementById("waiting-text")

loginbtn.addEventListener("click", mainMenu)
registerbtn.addEventListener("click", mainMenu)
joinGameBtn.addEventListener("click", tryJoiningGame)
back2menuBtn.addEventListener("click", goBackToMenu)

function mainMenu() {
	signinModal.style.display = "None"
	menuModal.style.display = "block"
}

function goBackToMenu() {
	/** Removes CSS for:
	 * - Game map
	 * - Waiting box
	 * - The container holding game map and waiting box
	 * - The scoreboard
	 */
	// gameMap.style.display = "None"
	// waitingBox.style.display = "None"
	// container.style.display = "None"
	// scoreBoard.style.display = "None"
	// /** Removes the inner HTML of:
	//  * - Game map
	//  * - Waiting box (holding menubtn and waitingText)
	//  * - Scoreboard
	//  */
	// gameMap.innerHTML = ""
	// scoreBoard.innerHTML = ""
	// waitingBox.innerHTML = ""
	// waitingText.innerHTML = ""
	// /** Unhides the menu modal */
	// menuModal.style.display = "block"
	location.reload(true)
}

/** TODO: Make waitingText go away and then come back */

function resetGame() {
	/** Resets the scoreboard */
	scoreBoard.style.display = "block"
	let scoreboardTable = document.createElement("table")
	scoreBoard.append(scoreboardTable)

	/** Resets the menu button */
	let newBack2menuBtn = document.createElement("button")
	newBack2menuBtn.id = "back2menuBtn"
	newBack2menuBtn.innerText = "Main Menu"
	waitingBox.append(newBack2menuBtn)

	/** Resets the waiting text */
	let newWaitingText = document.createElement("h1")
	newWaitingText.id = "waiting-text"
	waitingBox.append(waitingText)

	gameMap.style.display = "grid"
}

function tryJoiningGame() {
	// resetGame()
	container.style.display = "flex"
	menuModal.style.display = "none"
	waitingBox.style.display = "flex"
	// gameMap.style.display = "grid";
	scoreBoard.style.display = "block"
	new Game() // this is the thing that makes them join the socket_list (shows 37eb8237e3AAAA connected)
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
