import Game from "./game.js"

/**
 * Joins the websocket connection that the HTTP server has established.
 * More precisely, it connects the client to the default namespace `'/'`
 * - You can think of it as joining in on an on-going conference call
 */
let socket = io()

//menu
const signinModal = document.getElementById("signin-modal")
const menuModal = document.getElementById("menuModal")
const joinGameBtn = document.getElementById("joinGameBtn")
const leaderBoardBtn = document.getElementById("leaderBoardBtn")
joinGameBtn.addEventListener("click", tryJoiningGame)

//Login-Form
const loginbtn = document.getElementById("loginbtn")
const loginUsernameInput = document.getElementById("login-username")
const loginPasswordInput = document.getElementById("login-password")
loginbtn.addEventListener("click", login)

//Register-Form
const registerbtn = document.getElementById("registerbtn")
const registerUsernameInput = document.getElementById("register-username")
const registerPasswordInput = document.getElementById("register-password")
registerbtn.addEventListener("click", register)

//game
const scoreBoard = document.getElementById("scoreboard")
const waitingBox = document.getElementById("waiting-box")
const container = document.getElementById("container")
const back2menuBtn = document.getElementById("back2menuBtn")
back2menuBtn.addEventListener("click", goBackToMenu)

function login() {
	socket.emit("login", { username: loginUsernameInput.value, password: loginPasswordInput.value })
	socket.on("loginResponse", function (data) {
		if (data.success) {
			/** If success, then log them in */
			signinModal.style.display = "none"
			menuModal.style.display = "block"
		} else {
			/** If not success, give them feedback */
			alert("Log-in unsuccessul.")
		}
	})
}
function register() {
	socket.emit("register", { username: registerUsernameInput.value, password: registerPasswordInput.value })
	socket.on("registerResponse", function (data) {
		if (data.success) {
			/** If success, then log them in */
			signinModal.style.display = "none"
			menuModal.style.display = "block"
		} else {
			/** If not success, give them feedback */
			alert("Registration unsuccessul.")
		}
	})
}

// function mainMenu() {
// 	signinModal.style.display = "None"
// 	menuModal.style.display = "block"
// }

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
	location.reload()
}

// function resetGame() {
// 	/** Resets the scoreboard */
// 	scoreBoard.style.display = "block"
// 	let scoreboardTable = document.createElement("table")
// 	scoreBoard.append(scoreboardTable)

// 	/** Resets the menu button */
// 	let newBack2menuBtn = document.createElement("button")
// 	newBack2menuBtn.id = "back2menuBtn"
// 	newBack2menuBtn.innerText = "Main Menu"
// 	waitingBox.append(newBack2menuBtn)

// 	/** Resets the waiting text */
// 	let newWaitingText = document.createElement("h1")
// 	newWaitingText.id = "waiting-text"
// 	waitingBox.append(waitingText)

// 	gameMap.style.display = "grid"
// }

function tryJoiningGame() {
	container.style.display = "flex"
	menuModal.style.display = "none"
	waitingBox.style.display = "flex"
	// gameMap.style.display = "grid";
	scoreBoard.style.display = "block"
	socket.emit("joinGameRequest")
	socket.on("request_ack", () => {
		new Game(socket)
	})
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
