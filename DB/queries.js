var SQL = require("sql-template-strings")
const mysql = require("mysql")
const Creds = require("./credentials.js")

// creating a connection pool with the database server
var pool = mysql.createPool({
	host: Creds.host,
	user: Creds.user,
	password: Creds.password,
	database: Creds.database,
	connectionLimit: 100,
	debug: false,
})

/**
 * Queries the database and executes a callback
 * @param {string} query the SQL statement to be sent to the database server
 * @param {Function} callback will execute on a succesful query
 */
function executeQuery(query, callback) {
	pool.getConnection(function (err, connection) {
		if (err) {
			console.log(err)
		} else if (connection) {
			connection.query(query, function (err, res) {
				connection.release()
				if (err) {
					console.log(err)
				} else {
					callback(res)
				}
			})
		} else {
			console.log("No Connection")
		}
	})
}

function getUser(user, callback) {
	const query = SQL`SELECT * FROM users WHERE username = ${user};`
	executeQuery(query, callback)
}

function getUserWithPassword(user, pwd, callback) {
	const query = SQL`SELECT * FROM users WHERE username = ${user} and password = ${pwd};`
	executeQuery(query, callback)
}

function createUser(user, pwd, callback) {
	const query = SQL`INSERT INTO users VALUES (${user}, ${pwd});`
	executeQuery(query, callback)
}

function getOrderedLeaderboard(callback) {
	const query = SQL`SELECT @a:=@a+1 rank, username, wins FROM leaderboard, (select @a:=0) as a order by wins DESC;`
	executeQuery(query, callback)
}

function insertToLeaderboard(user, wins, callback) {
	const query = SQL`INSERT INTO leaderboard VALUES(${user},${wins});`
	executeQuery(query, callback)
}

function updateLeaderboard(user, wins, callback) {
	const query = SQL`UPDATE leaderboard SET wins = ${wins} WHERE username LIKE ${user}`
	executeQuery(query, callback)
}

function updateLeaderboard2(user, wins, callback){
	const query = SQL `INSERT INTO leaderboard VALUES(${user},${wins}) on duplicate key update wins = ${wins}`
	executeQuery(query, callback)
}

module.exports = {
	getUser,
	getUserWithPassword,
	createUser,
	getOrderedLeaderboard,
	insertToLeaderboard,
	updateLeaderboard,
	updateLeaderboard2
}
