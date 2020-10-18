const path = require('path')
const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 8080

server.listen(port,() => {
    console.log(`Listening on port ${port}`)
})

app.get('/', (req, res) => {
	res.sendFile(path.resolve("index.html"))
})