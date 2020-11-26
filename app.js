const Path = require("path") // Module containing utilities for working with filepaths
const Http = require("http") // Module for building/creating HTTP servers
const Express = require("express") // Module for creating and working with an Express application
const WebSocketServer = require("socket.io") // Module for spinning up a websocket server
const GameStateManager = require("./services/GameStateManager") // class that handles the state of the game
const CREDS = require("./DB/credentials.js")
// const csp = require('express-csp-header')

const port = process.env.PORT || 3000 // Will use the host's PORT environment variable or 3000 for development purposes
const express_app = Express() // Creating an Express application
const express_server = Http.createServer(express_app) // Building the Express server

let env_not_set = false

function send503() {
	/** Executes a handler for GET requests to the `/` path */
	express_app.get("/", function (_, res) {
		res.status(503).send(
			"<body style='background:black;'><h1 style='color:#8a2be2;font-family:Arial;'>503 Service Temporarily Unavailable</h1></body>"
		)
	})
}

if (CREDS.host == undefined) {
	console.error("\nDB_HOST not set")
	env_not_set = true
} else if (CREDS.user == undefined) {
	console.error("\nDB_USER not set")
	env_not_set = true
} else if (CREDS.password == undefined) {
	console.error("\nDB_PASS not set")
	env_not_set = true
} else if (CREDS.password == undefined) {
	console.error("\nDB not set")
	env_not_set = true
}

if (env_not_set) {
	send503()
} else {
	//create the database if it doesn't exist
	const createDB = require("./DB/initdb.js")
	createDB(send503)

	/** Executes a handler with no mount path for any type of HTTP request */
	express_app.use(
		// csp.expressCspHeader({
		// 	directives: {
		// 		'default-src': [
		// 			'http://localhost:3000',
		// 			'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js',
		// 			'https://code.jquery.com/jquery-3.3.1.min.js',
		// 		],
		// 		'style-src': ['http://localhost:3000/styles/game.css'],
		// 		'connect-src': [
		// 			'http://localhost:3000',
		// 			'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js',
		// 			'https://code.jquery.com/jquery-3.3.1.min.js',
		// 		],
		// 		// 'script-src': [
		// 		// 	'http://localhost:3000',
		// 		// 	'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js',
		// 		// 	'https://code.jquery.com/jquery-3.3.1.min.js',
		// 		// ],
		// 		'img-src': ['http://localhost:3000'],
		// 	},
		// }),
		// function (_, res, next) {
		// 	// res.setHeader(
		// 	// 	"Content-Security-Policy",
		// 	// 	"default-src http://localhost:3000",
		// 	// 	"Content-Security-Policy",
		// 	// 	"default-src http://localhost:3000",
		// 	// 	"Content-Security-Policy",
		// 	// 	"default-src https://code.jquery.com/jquery-3.3.1.min.js"
		// 	// "default-src http://localhost:3000",
		// 	// "default-src https://code.jquery.com/jquery-3.3.1.min.js"
		// 	// )
		// 	next()
		// },
		/** Built in middleware function that serves static files */
		Express.static("views")
	)

	express_app.get("/", function (_, res) {
		res.sendFile(Path.resolve("views/index.html"))
	})
}

express_server.listen(port, function () {
	console.log(`\nExpress server listening on port ${port}`)
})

express_server.on("error", (err) => {
	console.error(err)
	send503()
})

if (!env_not_set) {
	const serverStartedPromise = new Promise((startManagingState) => {
		/**
		 * Spins up a websocket server that works with the Express server
		 * - You can think of it as starting a conference call alone
		 * - Listens to the default namespace `'/'` and connects to it by default
		 * - `'/'` has nothing to do with the URL—it is just a name
		 * - `io` handles the namespace connection which allows us to communicate with the client
		 */
		var io = WebSocketServer(express_server)
		startManagingState(io)
	})

	serverStartedPromise.then((io) => {
		console.log("\nWebsocket server started")
		new GameStateManager(io)
	})
}
