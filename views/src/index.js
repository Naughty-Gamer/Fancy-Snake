import Game from "./game.js"
import { drawLeaderboard } from "./drawer.js"

/**
 * Joins the websocket connection that the HTTP server has established.
 * More precisely, it connects the client to the default namespace `'/'`
 * - You can think of it as joining in on an on-going conference call
 */
let socket = io()
let username = ""

//menu screen
const signinModal = document.getElementById("signin-modal")
const menuModal = document.getElementById("menuModal")
const joinGameBtn = document.getElementById("joinGameBtn")
const leaderBoardBtn = document.getElementById("leaderBoardBtn")

//Login-Form screen
const loginbtn = document.getElementById("loginbtn")
const loginUsernameInput = document.getElementById("login-username")
const loginPasswordInput = document.getElementById("login-password")

//Register-Form screen
const registerbtn = document.getElementById("registerbtn")
const registerUsernameInput = document.getElementById("register-username")
const registerPasswordInput = document.getElementById("register-password")

//LeaderBoard screen
const leaderBoard = document.getElementById("Leaderboard")
const back2menuBtn = document.getElementById("back2menuBtn")
const signoutbtn = document.getElementById("sign-out-btn")

//game screen
const gameMap = document.getElementById("game-map")
const scoreBoard = document.getElementById("scoreboard")
const waitingBox = document.getElementById("waiting-box")
const container = document.getElementById("container")
const back2leaderBoardBtn = document.getElementById("back2leaderBoardBtn")

//Event Listeners

//menu screen
joinGameBtn.addEventListener("click", tryJoiningGame)
leaderBoardBtn.addEventListener("click", getleaderboard)

//Login-Form screen
loginbtn.addEventListener("click", login)

//Register Form
registerbtn.addEventListener("click", register)

//Game Screen
back2leaderBoardBtn.addEventListener("click", back2leaderBoard)

//LeaderBoard Screen
back2menuBtn.addEventListener("click", goToMenu)
signoutbtn.addEventListener("click", signOut)

function login() {
	socket.emit("login", { username: loginUsernameInput.value, password: loginPasswordInput.value })
	socket.on("loginResponse", function (data) {
		if (data.success) {
			username = loginUsernameInput.value
			/** If success, then log them in */
			signinModal.style.display = "none"
			menuModal.style.display = "inline-block"
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
			username = registerUsernameInput.value
			/** If success, then log them in */
			signinModal.style.display = "none"
			menuModal.style.display = "inline-block"
		} else {
			/** If not success, give them feedback */
			alert("Registration unsuccessul.")
		}
	})
}

function goToMenu() {
	leaderBoard.style.display = "none"
	menuModal.style.display = "block"
	back2menuBtn.style.display = "none"
}

function getleaderboard() {
	requestLeaderboardData()
	menuModal.style.display = "none"
	leaderBoard.style.display = "block"
	back2menuBtn.style.display = "inline-block"
}

function requestLeaderboardData() {
	socket.emit("req_lb_data")
	socket.on("lb_data_req_ack", (data) => {
		if (data != null) {
			// populate the leaderboard with data.response
			drawLeaderboard(data)
		} else {
			// leaderboard currently unavailable
			console.log(data)
		}
	})
}

// function mainMenu() {
// 	signinModal.style.display = "None"
// 	menuModal.style.display = "block"
// }

function back2leaderBoard() {
	requestLeaderboardData()
	/** Removes CSS for:
	 * - Game map
	 * - Waiting box
	 * - The container holding game map and waiting box
	 * - The scoreboard
	 */
	gameMap.style.display = "None"
	waitingBox.style.display = "None"
	container.style.display = "None"
	scoreBoard.style.display = "None"
	back2menuBtn.style.display = "none"
	leaderBoard.style.display = "block"
	signoutbtn.style.display = "inline-block"

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
	//
}

function signOut() {
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
	back2menuBtn.style.display = "none"
	container.style.display = "flex"
	menuModal.style.display = "none"
	waitingBox.style.display = "flex"
	// gameMap.style.display = "grid";
	scoreBoard.style.display = "block"
	socket.emit("joinGameRequest", { user: username })
	socket.on("request_ack", () => {
		new Game(socket)
	})
	socket.on("win", () => {
		console.log("you won lol")
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
