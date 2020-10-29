const path = require('path')
const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
var reload = require('reload')
const port = process.env.PORT || 3000 // Will use the host's PORT environment variable


server.listen(port,() => {
    console.log(`Listening on port ${port}`)
})

app.use('/src',express.static('src'))

app.get('/', (req,res) => {
	res.sendFile(path.resolve("index.html"))
})

// reload(app)