const SQL = require("../DB/queries.js")

/** setTimeouts allows time for database querying */

let getLeaderboardData = function (cb) {
	setTimeout(function () {
		SQL.getOrderedLeaderboard(cb)
	}, 100)
}

let updateLeaderboardData = function (user, wins, cb) {
	setTimeout(function () {
		SQL.updateLeaderboard(user, wins, cb)
	}, 100)
}

let getWinsbyPlayer = function (username, cb) {
	setTimeout(function () {
		SQL.getWinsbyPlayer(username, cb)
	}, 100)
}

module.exports.getLeaderboardData = getLeaderboardData
module.exports.updateLeaderboardData = updateLeaderboardData
module.exports.getWinsbyPlayer = getWinsbyPlayer
