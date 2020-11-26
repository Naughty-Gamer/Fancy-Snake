var SQL = require("sql-template-strings")
const mysql = require("mysql")
const Creds = require("./credentials.js")

//This page contains all of the queries that are required to carry out CRUD activities

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

/**
 * Gets the user information that was requested
 * @param {String} user the username being searched.
 * @param {Function} callback will execute on a succesful query
 */
function getUser(user, callback) {
	const query = SQL`SELECT * FROM users WHERE username = ${user};`
	executeQuery(query, callback)
}

/**
 * Uses the username to get the hashed password.
 * @param {String} user the username being searched.
 * @param {Function} callback will execute on a succesful query
 */
function getHashedPasswordByUser(user, callback) {
	const query = SQL`SELECT password FROM users WHERE username = ${user};`
	executeQuery(query, callback)
}

/**
 * Gets the user information that was requested
 * @param {String} user the username that the user inputs.
 * @param {String} pwd the password that the user inputs.
 * @param {Function} callback will execute on a succesful query
 */
function getUserWithPassword(user, pwd, callback) {
	const query = SQL`SELECT * FROM users WHERE username = ${user} and password = ${pwd};`
	executeQuery(query, callback)
}

/**
 * Inserts the username and password of the user.
 * @param {String} user the username that the user inputs.
 * @param {String} pwd the password that the user inputs.
 * @param {Function} callback will execute on a succesful query
 */
function createUser(user, pwd, callback) {
	const query = SQL`INSERT INTO users VALUES (${user}, ${pwd});`
	executeQuery(query, callback)
}

/**
 * Sends back a sorted list of leaderboard information
 * @param {Function} callback will execute on a succesful query
 */
function getOrderedLeaderboard(callback) {
	const query = SQL`SELECT username, wins FROM leaderboard, (select @a:=0) as a ORDER BY wins DESC;`
	executeQuery(query, callback)
}

/**
 * Sends back the number of wins a player has
 * @param {String} username the username of the player.
 * @param {Function} callback will execute on a succesful query
 */
function getWinsbyPlayer(username, callback) {
	const query = SQL`SELECT wins from leaderboard where username = ${username};`
	executeQuery(query, callback)
}

/**
 * Updates a user's win count
 * @param {String} user the name of the user.
 * @param {number} wins updated amount of wins the user has.
 * @param {Function} callback will execute on a succesful query.
 */
function updateLeaderboard(user, wins, callback) {
	const query = SQL`INSERT INTO leaderboard VALUES(${user},${wins}) on duplicate key update wins = ${wins}`
	executeQuery(query, callback)
}

module.exports = {
	getUser,
	getUserWithPassword,
	createUser,
	getOrderedLeaderboard,
	updateLeaderboard,
	getWinsbyPlayer,
	getHashedPasswordByUser,
}
