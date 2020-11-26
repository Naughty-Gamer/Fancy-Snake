const Creds = require("./credentials.js")

//Initalizing the database and adding important SQL Quries.

const createDb = function (callback) {
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
			callback()
			console.error(err)
		}

		// creating the database if it doesn't exist
		const createDBQuery = `CREATE DATABASE IF NOT EXISTS ${Creds.database};`
		connection.query(createDBQuery, function (err, result) {
			if (err) {
				callback()
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
				callback()
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
				callback()
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
				callback()
				console.error(err)
			}
		})
	})

	connection.on("error", function (err) {
		console.error(err)
		if (err.code === "PROTOCOL_CONNECTION_LOST") {
			createDb(callback)
		} else {
			callback()
		}
	})
}

module.exports = createDb
