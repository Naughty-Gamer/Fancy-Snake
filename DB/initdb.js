const Creds = require("./credentials.js")

const createDb = function () {
	const mysql = require("mysql")
	const connection = mysql.createConnection({
		host: Creds.host,
		user: Creds.user,
		password: Creds.password,
	})

	connection.connect(function (err) {
		if (err) throw err

		const mysqlDB = "CREATE DATABASE IF NOT EXISTS snake_game;"
		connection.query(mysqlDB, function (err, result) {
			if (err) throw err
			if (result.affectedRows !== 0) {
				console.log("\nDatabase has been created")
			} else {
				console.log("\nDatabase has been already created.")
			}
		})
		//to change database to snake_game
		connection.changeUser({ database: "snake_game" }, function (err) {
			if (err) {
				console.log("Database change error", err)
				return
			}
		})
		const mysqlUser =
			"create table if not exists snake_game.users(" +
			"username varchar(20) NOT NULL," +
			"password varchar(15) NOT NULL," +
			"PRIMARY KEY (username)" +
			");"
		connection.query(mysqlUser, function (err, result) {
			if (err) throw err
			if (result.affectedRows !== 0) {
				console.log("Users has been created")
			} else {
				console.log("Users has been already created.")
			}
		})

		const mysqlLeaderboard =
			"create table if not exists snake_game.leaderboard(" +
			"Standing int(5) NOT NULL," +
			"username varchar(20) NOT NULL," +
			"wins int(5)," +
			"FOREIGN KEY (username) REFERENCES snake_game.users(username)" +
			");"
		connection.query(mysqlLeaderboard, function (err, result) {
			if (err) throw err
			if (result.affectedRows !== 0) {
				console.log("Leaderboard has been created")
			} else {
				console.log("Leaderboard has been already created.")
			}
		})
	})
}

module.exports = createDb
