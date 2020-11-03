const Path = require("path") // Module containing utilities for working with filepaths
const Http = require("http") // Module for building/creating HTTP servers
const Express = require("express") // Module for spinning up a powerful HTTP server

const port = process.env.PORT || 3000 // Will use the host's PORT environment variable or 3000 for development purposes
const express_app = Express() // Creating an Express application
const express_server = Http.createServer(express_app) // Spinning up the Express server

express_server.listen(port, function () {
	console.log(`\nListening on port ${port}\n`)
})

express_app.use("/src", Express.static("src"))

express_app.get("/", function (req, res) {
	res.sendFile(Path.resolve("src/index.html"))
})
