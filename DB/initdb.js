const Creds = require("./credentials.js")

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
			"password varchar(15) NOT NULL," +
			"PRIMARY KEY (username)" +
			");"
		connection.query(createUserTableQuery, function (err, result) {
			if (err) {
				callback()
				console.error(err)
			}
			if (result.affectedRows !== 0) {
				console.log("Users has been created")
			} else {
				console.log("Users has been already created.")
			}
		})

		// making a "leaderboard" table
		const createLeaderboardQuery =
			`create table if not exists ${Creds.database}.leaderboard(` +
			"username varchar(20) NOT NULL," +
			"wins int(5)," +
			`FOREIGN KEY (username) REFERENCES ${Creds.database}.users(username)` +
			");"
		connection.query(createLeaderboardQuery, function (err, result) {
			if (err) {
				callback()
				console.error(err)
			}
			if (result.affectedRows !== 0) {
				console.log("Leaderboard has been created")
			} else {
				console.log("Leaderboard has been already created.")
			}
		})
	})
}

module.exports = createDb
