const Creds = require("./credentials.js")

/**
 * Initalizing the database
 * @param {Function} handleError the error handling middleware that will execute in the case of an error
 */
const createDb = function (handleError) {
	const mysql = require("mysql")

	// creating a connection with the database server
	const connection = mysql.createConnection({
		host: Creds.host,
		user: Creds.user,
		password: Creds.password,
	})

	// connecting to the database server
	connection.connect(function (err) {
		if (err) {
			handleError()
			console.error(err)
		}

		// creating the database if it doesn't exist
		const createDBQuery = `CREATE DATABASE IF NOT EXISTS ${Creds.database};`
		connection.query(createDBQuery, function (err, result) {
			if (err) {
				handleError()
				console.error(err)
			}
			if (result.affectedRows !== 0) {
				console.log("\nDatabase has been created")
			} else {
				console.log("\nDatabase has been already created.")
			}
		})

		// using the snake_game database
		connection.changeUser({ database: `${Creds.database}` }, function (err) {
			if (err) {
				handleError()
				console.log("Database change error:\n", err)
				return
			}
		})

		// making a "users" table
		const createUserTableQuery =
			`create table if not exists ${Creds.database}.users(` +
			"username varchar(20) NOT NULL," +
			"password varchar(100) NOT NULL," +
			"PRIMARY KEY (username)" +
			");"
		connection.query(createUserTableQuery, function (err, result) {
			if (err) {
				handleError()
				console.error(err)
			}
		})

		// making a "leaderboard" table
		const createLeaderboardQuery =
			`create table if not exists ${Creds.database}.leaderboard(` +
			"username varchar(20) NOT NULL," +
			"wins int(5)," +
			`PRIMARY KEY (username)` +
			");"
		connection.query(createLeaderboardQuery, function (err, result) {
			if (err) {
				handleError()
				console.error(err)
			}
		})
	})

	// reconnecting to the database server every time it closes the conenction due to inactivity
	connection.on("error", function (err) {
		console.error(err)
		if (err.code === "PROTOCOL_CONNECTION_LOST") {
			createDb(handleError)
		} else {
			handleError()
		}
	})
}

module.exports = createDb
