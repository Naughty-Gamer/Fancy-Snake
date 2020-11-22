const SQL = require("../DB/queries.js")

/** setTimeouts allows time for database querying */

let isValidLoginAttempt = function (data, cb) {
	setTimeout(function () {
		SQL.getUserWithPassword(data.username, data.password, cb)
	}, 100)
}

let isUsernameTaken = function (data, cb) {
	setTimeout(function () {
		SQL.getUser(data.username, cb)
	}, 100)
}

let addUser = function (data, cb) {
	setTimeout(function () {
		SQL.createUser(data.username, data.password, cb)
	}, 100)
}

module.exports.isValidLoginAttempt = isValidLoginAttempt
module.exports.isUsernameTaken = isUsernameTaken
module.exports.addUser = addUser
