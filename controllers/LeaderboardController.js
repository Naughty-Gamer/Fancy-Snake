const SQL = require("../DB/queries.js")

/** setTimeouts allows time for database querying */

/**
 * Executes the SQL query to get information about the leaderboard.
 * @param {Function} callback will execute on a succesful query
 */
let getLeaderboardData = function (cb) {
	setTimeout(function () {
		SQL.getOrderedLeaderboard(cb)
	}, 100)
}

/**
 * Sends updated player win count to the database.
 * @param {String} user the username of the player.
 * @param {number} wins the wins of the player.
 * @param {Function} callback will execute on a succesful query
 */
let updateLeaderboardData = function (user, wins, cb) {
	setTimeout(function () {
		SQL.updateLeaderboard(user, wins, cb)
	}, 100)
}

/**
 * Executes the SQL query to get the wins of the player needed.
 * @param {String} username the username of the player.
 * @param {Function} callback will execute on a succesful query
 */
let getWinsbyPlayer = function (username, cb) {
	setTimeout(function () {
		SQL.getWinsbyPlayer(username, cb)
	}, 100)
}

module.exports.getLeaderboardData = getLeaderboardData
module.exports.updateLeaderboardData = updateLeaderboardData
module.exports.getWinsbyPlayer = getWinsbyPlayer
