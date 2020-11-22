var SQL = require("sql-template-strings")
const mysql = require("mysql")
const Creds = require("./credentials.js")

var pool = mysql.createPool({
	host: Creds.host,
	user: Creds.user,
	password: Creds.password,
	database: Creds.database,
	debug: true,
})

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

// function executeQuery(query, callback) {
// 	pool.getConnection(function (err, connection) {
// 		if (err) {
// 			return callback(err, null)
// 		} else if (connection) {
// 			connection.query(query, function (err, rows, fields) {
// 				connection.release()
// 				if (err) {
// 					return callback(err, null)
// 				}
// 				return callback(null, rows)
// 			})
// 		} else {
// 			return callback(true, "No Connection")
// 		}
// 	})
// }

// function Result(query, callback) {
// 	executeQuery(query, function (err, rows) {
// 		console.log("error:", err)
// 		if (!err) {
// 			console.log("It should work", rows, rows == [{}])
// 			callback(null, rows)
// 		} else {
// 			callback(true, err)
// 		}
// 	})
// }

function findUser(user, callback) {
	const selectUser = SQL`SELECT * FROM snake_game.users WHERE username = ${user};`
	executeQuery(selectUser, callback)

	// Result(selectUser, function (err, rows) {
	// 	if (!err) {
	// 		console.log(rows)
	// 		callback(null, rows)
	// 	} else {
	// 		console.log(err)
	// 	}
	// })
}

function getPassword(user, pwd, callback) {
	const selectPwd = SQL`SELECT * FROM snake_game.users WHERE username = ${user} and password = ${pwd};`
	executeQuery(selectPwd, callback)
	// Result(selectPwd, function (err, result) {

	// console.log(result)
	// 	if (!err) {
	// 		callback(result)
	// 	} else {
	// 		console.log(err)
	// 	}
	// })
}

function userCreation(user, pwd, callback) {
	const insert = SQL`INSERT INTO snake_game.users VALUES (${user}, ${pwd});`
	executeQuery(insert, callback)
	// Result(insert, function (err, result) {
	// 	if (!err) {
	// 		callback(null, result)
	// 	} else {
	// 		console.log(err)
	// 	}
	// })
}

function ordering(wins, callback) {
	const order = SQL`SELECT @a:=@a+1 rank, username, wins FROM snake_game.leaderboard, (select @a:=0) as a order by ${wins} DESC;`
	executeQuery(order, callback)
	// Result(order, function (err, rows) {
	// 	if (!err) {
	// 		callback(null, rows)
	// 	} else {
	// 		console.log(err)
	// 	}
	// })
}

function LInsert(user,wins,callback){
	const Lsert = SQL `INSERT INTO snake_game.leaderboard VALUES(${user},${wins});`
	executeQuery(Lsert,callback)
}

function updateLeader(user,wins,callback){
	const updateL = SQL `UPDATE leaderboard SET wins = ${wins} WHERE username LIKE ${user}`
	executeQuery(updateL,callback)
}

module.exports = {
	findUser,
	getPassword,
	userCreation,
	ordering,
	LInsert,
	updateLeader
}

//mysql.exe -u root --password To Run XAMMP TO TEST THE DATABASE.
